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

    // var endpoints = {

    //     // Map the location of a request to an API to a the identifier of the associated resource
    //     "https://api.powerbi.com": "https://analysis.windows.net/powerbi/api",
    // };

    adalProvider.init(
        paramJSON,
        $httpProvider
        );
   // console.log(adalProvider.config.endpoints);
}]);


function testGetUsingXMLHttp($token, $getUrl) {
    var request = new XMLHttpRequest();

    request.open('GET', $getUrl);//'https://api.powerbi.com/v1.0/myorg/datasets');
    request.setRequestHeader('Authorization', 'Bearer ' + $token);

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };

    request.send();
}

function testGetUsingHttp($token, $http, $apiURL) {
    $http({
        method: 'GET',
        url: '$apiURL',
        headers: {
            'Authorization': "Bearer " + token
        }}).then(function(response) {
            console.log("GET Response:", response);

        });
}

function postActionLoadTitle ($iFrame, $token) {
    var messageStructure = {
        action: "loadTile",
        tokenType: "Bearer",
        accessToken: $token,
        height: 500,
        width: 500
    };
    var message = JSON.stringify(messageStructure);

    // Push the message
    $iFrame.contentWindow.postMessage(message, "*");
}

function testDelUsingXMLHttp($token) {
    

    var request = new XMLHttpRequest();

    request.open('DELETE', 'https://api.powerbi.com/v1.0/myorg/datasets/0f36d0f7-cc05-4cad-b37c-6ee0b5eeb473');

    request.setRequestHeader('Authorization', 'Bearer ' + $token);

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };

    request.send();

}


function postDataXMLHttp($token,$body,$url) {
    var request = new XMLHttpRequest();

    request.open('POST', $url);

    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + $token);

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };

    var body = $body;
    // {"rows":[
    //                     {
    //                     "LikeDislike" :"Like",
    //                     "Report" :selectedReportId,
    //                     "TimeStamp" :dateTimeNow,
    //                     "ReportedBy" :userName,
    //                     "value": 1
    //                     }
    //                  ]};

    request.send(JSON.stringify(body));
}

function createLikeDislikeDatasetHttp($token, $http) {

    var body = {
                        "name" : "APILikeDislike",
                        "tables" : [{
                                        "name" : "RawLikeDislike",
                                        "columns" : [
                                            {
                                                "name": "LikeDislike", 
                                                "dataType" : "string"
                                            },
                                            {
                                                "name": "Report",
                                                "dataType" : "string"
                                            },
                                            {
                                                "name": "TimeStamp",
                                                "dataType" : "DateTime"                                                
                                            },
                                            {
                                                "name": "ReportedBy",
                                                "dataType" : "string"                                                
                                            },
                                            {
                                                "name": "value",
                                                "dataType" : "Int64"                                                
                                            }
                                        ]

                                        
                        }]

        };
    // request.setRequestHeader('Authorization', 'Bearer ' + $token);
        var postUrl = 'https://api.powerbi.com/v1.0/myorg/datasets';
        var req = {
            method: 'POST',
            url: postUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $token
            },
            data: body //JSON.stringify(dataToPost)
        };
    $http(req).then(function(response) {
        console.log('response' , response);
    });

}

function createLikeDislikeDataset($token) {
    // console.log("Create DS Token:",$token);
    var request = new XMLHttpRequest();
    // request.setRequestHeader('Authorization', 'Bearer ' + $token);
    request.open('POST', 'https://api.powerbi.com/v1.0/myorg/datasets',true);


    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + $token);

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
        console.log('this:', this);

      }
    };

    // var powerBIDatasetsApiUrl = "https://api.powerbi.com/v1.0/myorg/datasets";
    // var dataSetJSON;

        // selectedReportId = $scope.selectedReportId;
        // dateTimeNow = $filter('date')(Date.now(),"yyyy-MM-ddTHH:mm:sss") + 'Z';
    var body = {
                        "name" : "APILikeDislike",
                        "tables" : [{
                                        "name" : "RawLikeDislike",
                                        "columns" : [
                                            {
                                                "name": "LikeDislike", 
                                                "dataType" : "string"
                                            },
                                            {
                                                "name": "Report",
                                                "dataType" : "string"
                                            },
                                            {
                                                "name": "TimeStamp",
                                                "dataType" : "DateTime"                                                
                                            },
                                            {
                                                "name": "ReportedBy",
                                                "dataType" : "string"                                                
                                            },
                                            {
                                                "name": "value",
                                                "dataType" : "Int64"                                                
                                            }
                                        ]

                                        
                        }]

        };
    // request.setRequestHeader('Authorization', 'Bearer ' + $token);
    console.log("body:",body);
    request.send(JSON.stringify(body)); 


}


// generates the GET URI including query string for the call to the server side REST API. Query string created
// using the Power BI API - namely the report.on('dataSelected'... call.

function generateQryString(data) {
    var i, j, qryString, text, iLen, jLen, item, nDate, nMonth;
    var comparisonSymbol;
    for (i=0, iLen = data.dataPoints.length, qryString = ""; i < iLen; i++) {
        item = data.dataPoints[i].identity;
        for (j=0, jLen = item.length, text = ""; j < jLen; j++) {
            // if (item[j].equals != "") {
                console.log(item[j]);
                if (item[j].target.column === 'month') {
                    // console.log('typeOf Date:', item[j].equals.getDate() + "-" + item[j].equals.getMonth() + "-" + item[j].equals.getFullYear());
                    nDate = item[j].equals.getDate();
                    nMonth = item[j].equals.getMonth();
                    text = item[j].target.column + "=" + nDate.toString().pad('00',true) + "-" + nMonth.toString().pad('00',true) + "-" + item[j].equals.getFullYear();
                } else {
                    text = item[j].target.column + "=" + encodeURIComponent(item[j].equals);
                }
                if (qryString === "") {
                    qryString = "https://localhost:3000/api/crime_stats?" + text;//encodeURIComponent(text); // text.replace(/ /g,"%20");
                } else {
                qryString += "&" + text;//encodeURIComponent(text); //text.replace(/ /g,"%20");
                }
            // }
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
                // console.log("xhr response:", xhr.response);
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

function getQueryString(data, $getApiUrl, $scope) {
  // report.on('dataSelected', event => {
  //   console.log('dataSelected: ', event);
    var qryString = '';
    // var data = event.detail;
    if (typeof data != "undefined") {
        qryString = generateQryString(data); //JSON.stringify(data.dataPoints[0].identity[0], null, '   ');
    } else {
        qryString = ""
    }
    // $scope.dataSelected = data; //JSON.stringify(data, null, '  ');
    console.log('qryString: ' + qryString);
    // $dataSelectedContainer.text(JSON.stringify(data, null, '  '));
    $scope.pdApiGetUrl = qryString;
    $getApiUrl.text(qryString);
    return qryString;
}

function populateTable($apiResults, $scope) {
  
    // var qryString = getQueryString(event.detail,$getApiUrl,$scope);


    // console.log("Refreshed on?",$scope.pdRefreshAuto);


        makeCORSRequest('GET', $scope.pdApiGetUrl)
        .then(function(response) {
            // return makeRequest('GET', datums.url);
            // console.log(response);
            // console.log("Success!",response);
            // $scope.pdItems = response.data;//.records;
            // $apiResponse.text(JSON.stringify(response.data));//$scope.pdItems));
            // var table = document.getElementById("apiResults");


            var i, len, item, htmlText;
            var itemList = [];

            $apiResults.innerHTML = "";

            for (i=0, len = response.data.length, htmlText=''; i < len; i++){
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
            // htmlText += "</tbody>"
            $apiResults.append(htmlText);

    
      // $scope.pdItems = itemList;
      // console.log('htmlText:',htmlText);
      // console.log("$scope.pdItems",$scope.pdItems);


            }, function(error) {
                console.error("Failed!", error);
                // console.log("An error occured");
        });
     // console.log('pd_items:',$scope.pdItems);

}




function initializeDataSelection(report, $getApiUrl, $apiResponse, $apiResults, $scope, $http) {
  report.on('dataSelected', event => {

    var i, item, iLen;
    // if () {

    // }
    for (i=0, iLen = event.detail.dataPoints.length; i< iLen; i++){
        $scope.reportDataSet.push(event.detail.dataPoints[i]);
    }
        // tempArray.push({"identity":[{"test":1},{"value":3}]});
    console.log('dataSelected: ', event);
    console.log('dataSelected: ', JSON.stringify(event.detail.dataPoints));
    console.log('dataSelected: ', JSON.stringify($scope.reportDataSet));
    // var qryString = getQueryString($scope.reportDataSet,$getApiUrl,$scope);
    var qryString = getQueryString(event.detail,$getApiUrl,$scope);
    // var qryString = '';
    // var data = event.detail;
    // if (typeof data != "undefined") {
    //     qryString = generateQryString(data); //JSON.stringify(data.dataPoints[0].identity[0], null, '   ');
    // } else {
    //     qryString = ""
    // }
    // $scope.dataSelected = data; //JSON.stringify(data, null, '  ');
    // console.log('qryString: ' + qryString);
    // // $dataSelectedContainer.text(JSON.stringify(data, null, '  '));
    // $scope.pdApiGetUrl = qryString;
    // // $scope.getItems();
    // // console.log($scope);
    // $getApiUrl.text(qryString);
    $('#resultsIframe').attr('src',qryString);

    console.log("Refreshed on?",$scope.pdRefreshAuto);
    console.log($('#pdRefreshOn').checked);

    if ($scope.pdRefreshAuto) {
        document.getElementById("apiResults").innerHTML = "";
        populateTable($apiResults, $scope);
      //   makeCORSRequest('GET', $scope.pdApiGetUrl)
      //   .then(function(response) {
      //       // return makeRequest('GET', datums.url);
      //       // console.log(response);
      //       // console.log("Success!",response);
      //       // $scope.pdItems = response.data;//.records;
      //       $apiResponse.text(JSON.stringify(response.data));//$scope.pdItems));
      //       // var table = document.getElementById("apiResults");


      //       var i, len, item, htmlText;
      //       var itemList = [];

      //       $apiResults.innerHTML = "";

      //       for (i=0, len = response.data.length, htmlText=''; i < len; i++){
      //       item = response.data[i];

      //       htmlText += "<tr><td>" + item['Place Name'] + "</td>" +
      //                   "<td>" + item.category + "</td>" +
      //                   "<td>" + item.context + "</td>" +
      //                   "<td>" + item.id + "</td>" +
      //                   "<td>" + item.latitude + "</td>" +
      //                   "<td>" + item.location_subtype + "</td>" +
      //                   "<td>" + item.location_type + "</td>" +
      //                   "<td>" + item.longitude + "</td>" +
      //                   "<td>" + item.month + "</td>" +
      //                   "<td>" + item['outcome-category'] + "</td>" +
      //                   "<td>" + item['outcome-date'] + "</td>" +
      //                   "<td>" + item.persistent_id + "</td>" +
      //                   "<td>" + item['street-id'] + "</td>" +
      //                   "<td>" + item['street-name'] + "</td></tr>"
      //       }
      //       // htmlText += "</tbody>"
      //       $apiResults.append(htmlText);

    
      // // $scope.pdItems = itemList;
      // // console.log('htmlText:',htmlText);
      // // console.log("$scope.pdItems",$scope.pdItems);


      //       }, function(error) {
      //           console.error("Failed!", error);
      //           // console.log("An error occured");
      //   });
     // console.log('pd_items:',$scope.pdItems);
    } else {
        document.getElementById("tableOfResults").innerHTML = 'To view "Personal Data" drill down results click "Refresh PD List"';
    }
  });
}


function applyFilters(report, $scope) {
    report.on('filtersApplied', event => {
        console.log('filtersApplied: ', event);
        const filters = event.details.filters;
        this.appliedFilters = filters;
    });
}



String.prototype.toDate = function(format)
{
  var normalized      = this.replace(/[^a-zA-Z0-9]/g, '-');
  var normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  var formatItems     = normalizedFormat.split('-');
  var dateItems       = normalized.split('-');

  var monthIndex  = formatItems.indexOf("mm");
  var dayIndex    = formatItems.indexOf("dd");
  var yearIndex   = formatItems.indexOf("yyyy");
  var hourIndex     = formatItems.indexOf("hh");
  var minutesIndex  = formatItems.indexOf("ii");
  var secondsIndex  = formatItems.indexOf("ss");

  var today = new Date();

  var year  = yearIndex>-1  ? dateItems[yearIndex]    : today.getFullYear();
  var month = monthIndex>-1 ? dateItems[monthIndex]-1 : today.getMonth()-1;
  var day   = dayIndex>-1   ? dateItems[dayIndex]     : today.getDate();

  var hour    = hourIndex>-1      ? dateItems[hourIndex]    : today.getHours();
  var minute  = minutesIndex>-1   ? dateItems[minutesIndex] : today.getMinutes();
  var second  = secondsIndex>-1   ? dateItems[secondsIndex] : today.getSeconds();

  return new Date(year,month,day,hour,minute,second);
}

String.prototype.pad = function(pad, padLeft) {
  if (typeof this === 'undefined') 
    return pad;
  if (padLeft) {
    return (pad + this).slice(-pad.length);
  } else {
    return (this + pad).substring(0, pad.length);
  }
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

