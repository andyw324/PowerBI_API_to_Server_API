'use strict';
angular.module('powerBI_API', ['ngRoute','AdalAngular'])
.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

    $routeProvider.when("/Home", {
        controller: "homeCtrl",
        templateUrl: "PowerBI_API/App/Views/Home.html",
    }).when("/UserData", {
        controller: "userDataCtrl",
        templateUrl: "PowerBI_API/App/Views/UserData.html",
        requireADLogin: true,
    }).when("/Report", {
        controller: "reportCtrl",
        templateUrl: "PowerBI_API/App/Views/Report.html",
        requireADLogin: true,
    }).otherwise({ redirectTo: "/Home" });

    var endpoints = {

        // Map the location of a request to an API to a the identifier of the associated resource
        "https://api.powerbi.com": "https://analysis.windows.net/powerbi/api",
    };

    adalProvider.init(
        {
            instance: 'https://login.microsoftonline.com/',
            tenant: 'homeofficegsigovuk.onmicrosoft.com',
            clientId: '2ad5dba7-b359-483c-89e2-3da5878eb8e5',
            extraQueryParameter: 'nux=1',
            endpoints: endpoints,
            //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.  
            // Also, token acquisition for the To Go API will fail in IE when running on localhost, due to IE security restrictions.
        },
        $httpProvider
        );
   // console.log(adalProvider.config.endpoints);
}]);




// generates the GET URI including query string for the call to the server side REST API. Query string created
// using the Power BI API - namely the report.on('dataSelected'... call.

function generateQryString(data) {
    var i, j, qryString, text, iLen, jLen, item;
    var comparisonSymbol;
    for (i=0, iLen = data.dataPoints.length, qryString = ""; i < iLen; i++) {
        item = data.dataPoints[i].identity;
        for (j=0, jLen = item.length, text = ""; j < jLen; j++) {
            if (item[j].equals != "") {
                console.log(item[j]);
                text = item[j].target.column + "=" + encodeURIComponent(item[j].equals);
                if (qryString === "") {
                    qryString = "https://localhost:3000/api/crime_stats?" + text;//encodeURIComponent(text); // text.replace(/ /g,"%20");
                } else {
                qryString += "&" + text;//encodeURIComponent(text); //text.replace(/ /g,"%20");
                }
            }
        }
    }
    return qryString;
}


// Create the XHR object.
function makeCORSRequest(method, url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        // if ("withCredentials" in xhr) {
        // // XHR for Chrome/Firefox/Opera/Safari.
        // xhr.open(method, url, true);
        // } else if (typeof XDomainRequest != "undefined") {
        // // XDomainRequest for IE.
        // xhr = new XDomainRequest();
        // xhr.open(method, url);
        // } else {
        // // CORS not supported.
        // xhr = null;
        // }
        // return xhr;
        xhr.open(method, url);
        // xhr.responseType = 'json';
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                //console.log("xhr response:", xhr.response);
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject({
                    status: this.status,
                    tatusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                tatusText: xhr.statusText
            }); 
        };
        xhr.send();
    });
}

// Function initialises the Data Selection API call from Power BI. This function is triggered by any interaction
// with the report and will call the generateQryString function to generate the personal data API GET URL based
// on the Power BI API returned JSON.

function initializeDataSelection(report, $getApiUrl, $apiResponse, $apiResults, $scope, $http) {
  report.on('dataSelected', event => {
    console.log('dataSelected: ', event);
    var qryString = '';
    var data = event.detail;
    if (typeof data != "undefined") {
        qryString = generateQryString(data); //JSON.stringify(data.dataPoints[0].identity[0], null, '   ');
    } else {
        qryString = ""
    }
    $scope.dataSelected = JSON.stringify(data, null, '  ');
    console.log('qryString: ' + qryString);
    // $dataSelectedContainer.text(JSON.stringify(data, null, '  '));
    $scope.pdApiGetUrl = qryString;
    // $scope.getItems();
    // console.log($scope);
    $getApiUrl.text(qryString);
    $('#resultsIframe').attr('src',qryString);

    if ($('#pdRefreshOn').checked) {
        makeCORSRequest('GET', $scope.pdApiGetUrl)
        .then(function(response) {
          // return makeRequest('GET', datums.url);
          // console.log(response);
          // console.log("Success!",response);
          $scope.pdItems = response.data;//.records;
          $apiResponse.text(JSON.stringify(response.data));//$scope.pdItems));
          // var table = document.getElementById("apiResults");
          

          var i, len, item, htmlText;
          var itemList = [];

          for (i=0, len = response.data.length, htmlText='<tbody>'; i < len; i++){
            item = response.data[i];
            
            htmlText += "<tr><td>" + item['Place Name'] + "</td>" +
                        "<td>" + item.category + "</td>" +
                        "<td>" + item.context + "</td>" +
                        "<td>" + item.id + "</td>" +
                        "<td>" + item.latitude + "</td>" +
                        "<td>" + item.location_subtype + "</td>" +
                        "<td>" + item.location_type + "</td>" +
                        "<td>" + item.longitude + "</td>" +
                        "<td>" + item.month + "</td>" +
                        "<td>" + item['outcome-category'] + "</td>" +
                        "<td>" + item['outcome-date'] + "</td>" +
                        "<td>" + item.persistent_id + "</td>" +
                        "<td>" + item['street-id'] + "</td>" +
                        "<td>" + item['street-name'] + "</td></tr>"
          }
          htmlText += "</tbody>"
          $apiResults.append(htmlText);
      }

      // $scope.pdItems = itemList;
      // console.log('htmlText:',htmlText);
      // console.log("$scope.pdItems",$scope.pdItems);


    }, function(error) {
        console.error("Failed!", error);
        // console.log("An error occured");
    });
     // console.log('pd_items:',$scope.pdItems);

  });
}

// Helper method to parse the title tag from the response.
// function getTitle(text) {
//   return text.match('<title>(.*)?</title>')[1];
// }

// Make the actual CORS request.
// function makeCorsRequest(url) {
//   // This is a sample server that supports CORS.
//   //var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';

//   var xhr = createCORSRequest('GET', url);
//   if (!xhr) {
//     alert('CORS not supported');
//     return;
//   }

//   // Response handlers.
//   xhr.onload = function() {
//     var text = xhr.responseText;
//     var title = getTitle(text);
//     alert('Response from CORS request to ' + url + ': ' + title);
//   };

//   xhr.onerror = function() {
//     alert('Woops, there was an error making the request.');
//   };

//   xhr.send();
// }

//function getAPIData()

