'use strict';
angular.module('todoApp')
.controller('reportCtrl', ['$scope', 'adalAuthenticationService', '$http',function ($scope, adalService, $http) {
    // Add new "load report id" function to add a user defined report id into session memory
    console.log('Scope is as follows:');
    console.log($scope);
    console.log('idtoken: ' + window.sessionStorage.getItem('adal.idtoken'));
	console.log('DataSelected is:');
    console.log($scope.dataSelected);
	adalService.acquireToken("https://analysis.windows.net/powerbi/api");// {
    var token = window.sessionStorage.getItem('adal.access.token.keyhttps://analysis.windows.net/powerbi/api'); 

	      	$scope.reportIDSelection = null;
	      	$scope.testAccounts = [];
      $http({
      method: 'GET',
      url: 'https://api.powerbi.com/beta/myorg/reports',
      headers: {
        'Authorization': "Bearer " + token //'Bearer ' + token
      }}).then(function apiResponse(response) {

	      if (response != "undefined") {
	      	var reportIdList = [];
	      	var item = '';
	      	response.data.value.forEach(function(item){
	      		// console.log(item);
	      		reportIdList.push({"id":item.id,"name":item.name});
	      	})
      		console.log(reportIdList);
	      	$scope.testAccounts = reportIdList;
	      	// console.log(response);
		      // console.log('tokenString: ' + token);
		      // console.log('Status:', response.statusCode);
		      // console.log('Headers:', JSON.stringify(response.headers));
		      // console.log('Response:', JSON.stringify(response.data));
			}
    	});
      
    $scope.showSelectedValue = function (mySelect){
    	console.log(mySelect);
    	$scope.selectedReportId = mySelect;
    }
    $scope.loadReport = function () {

		// Read embed application token from textbox
		var txtAccessToken = window.sessionStorage.getItem('adal.access.token.keyhttps://analysis.windows.net/powerbi/api');

		var reportId = $scope.selectedReportId;
		console.log(reportId);


		var txtEmbedUrl = 'https://app.powerbi.com/reportEmbed?reportId=' + reportId;//$('#pbirptid').val();//$('#txtReportEmbed').val();

		// Read report Id from textbox
		var txtEmbedReportId = reportId;//$('#pbirptid').val();

		// Embed configuration used to describe the what and how to embed.
		// This object is used when calling powerbi.embed.
		// This also includes settings and options such as filters.
		// You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
		powerbi.accessToken = txtAccessToken;
		var config= {
		    type: 'report',
		    tokenType: 'Bearer',
		    accessToken: txtAccessToken,
		    embedUrl: txtEmbedUrl,
		    id: txtEmbedReportId,
		    settings: {
		        filterPaneEnabled: true,
		        navContentPaneEnabled: true
		    }
		};

		console.log(config);


		// Grab the reference to the div HTML element that will host the report.
		var reportContainer = $('#reportContainer')[0];

		// Embed the report and display it within the div container.
		var report = powerbi.embed(reportContainer, config);
		initializeDataSelection(report,$('#dataSelectedContainer'),$scope);
		console.log($scope.dataSelected);
		// var qryString = getDataSelection(report);//,qryString);
		// console.log(qryString);

		// Report.off removes a given event handler if it exists.
		report.off("loaded");

		// Report.on will add an event handler which prints to Log window.
		report.on("loaded", function() {
		    console.log("Loaded");
		});


    };
}]);

