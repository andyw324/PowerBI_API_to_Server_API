'use strict';
angular.module('todoApp', ['ngRoute','AdalAngular'])
.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

    $routeProvider.when("/Home", {
        controller: "homeCtrl",
        templateUrl: "/App/Views/Home.html",
    }).when("/TodoList", {
        controller: "todoListCtrl",
        templateUrl: "/App/Views/TodoList.html",
        requireADLogin: true,
    }).when("/ToGoList", {
        controller: "toGoListCtrl",
        templateUrl: "/App/Views/ToGoList.html",
        requireADLogin: true,
    }).when("/UserData", {
        controller: "userDataCtrl",
        templateUrl: "/App/Views/UserData.html",
        requireADLogin: true,
    }).when("/Report", {
        controller: "reportCtrl",
        templateUrl: "/App/Views/Report.html",
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


// Function initialises the Data Selection API call from Power BI. This function is triggered by any interaction
// with the report and will call the generateQryString function to generate the personal data API GET URL based
// on the Power BI API returned JSON.

function initializeDataSelection(report, $dataSelectedContainer, $scope) {
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
    $dataSelectedContainer.text(qryString);

  });
}

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
                    qryString = "http://localhost:3000/api/crime_stats?" + text;//encodeURIComponent(text); // text.replace(/ /g,"%20");
                } else {
                qryString += "&" + text;//encodeURIComponent(text); //text.replace(/ /g,"%20");
                }
            }
        }
    }
    return qryString;
}


