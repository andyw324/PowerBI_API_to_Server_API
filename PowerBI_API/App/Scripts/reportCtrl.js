'use strict';
angular.module('powerBI_API')
.controller('reportCtrl', ['$scope', 'adalAuthenticationService', '$http', '$filter', function ($scope, adalService, $http, $filter) {
    // Add new "load report id" function to add a user defined report id into session memory
    console.log('Scope is as follows:');
    console.log($scope);
    console.log('idtoken: ' + window.sessionStorage.getItem('adal.idtoken'));
	console.log('DataSelected is:');
    console.log($scope.dataSelected);
	adalService.acquireToken("https://analysis.windows.net/powerbi/api");// {
    var token = window.sessionStorage.getItem('adal.access.token.keyhttps://analysis.windows.net/powerbi/api'); 
    // var dateTimeNow = $filter('date')(Date.now(),"yyyy-MM-dd HH:mm:ss Z");

    $scope.displayTable = false;
    $scope.pdRefreshAuto = false;
  	$scope.reportIDSelection = null;
  	$scope.testAccounts = [];
	$http({
	method: 'GET',
	url: 'https://api.powerbi.com/beta/myorg/reports',
	headers: {
	'Authorization': "Bearer " + token //'Bearer ' + token
	}}).then(function(response) {

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
    
	$http({
		method: 'GET',
		url: 'https://api.powerbi.com/v1.0/myorg/datasets',
		headers: {
			'Authorization': "Bearer " + token
		}}).then(function(response) {
			console.log("DataSets:", response);

		});

	var userName = adalService.userInfo.userName;
	var selectedReportId, dateTimeNow, dataToPost;
	var postUrl = "https://api.powerbi.com/v1.0/myorg/datasets/9e6792e9-bba0-4289-afce-85dec1ee482b/tables/ReportLikes/rows";
	//"https://api.powerbi.com/beta/e16346ae-eec1-4260-ab51-ac102fa054be/datasets/9e6792e9-bba0-4289-afce-85dec1ee482b/rows?key=%2BgyfC4JwCV%2FE%2Fv6kHr1%2FcegLHyfZdDI7nD%2Bmh8iab12dvqpMiOP9RaG6ROd0Mdyqs5%2Bxia8G91Lq038vYkT7dw%3D%3D";

    // $scope.pdApiGetUrl = 'https://localhost:3000/api/crime_stats?category=bicycle-theft&outcome-category=Investigation%20complete%3B%20no%20suspect%20identified';//&Place%20Name=E05000128';
    //'https://localhost:3000/api/crime_stats?category=bicycle-theft&outcome-category=Investigation%20complete%3B%20no%20suspect%20identified';
    // $scope.pdItems = [{"Place Name":"E05001769","category":"possession-of-weapons","location_type":"Force","longitude":-1.44135,"latitude":52.8962,"street-name":"On or near Chalkley Close","street-id":608703,"location_subtype":null,"outcome-category":"Offender given a caution","outcome-date":"2015-11-01T00:00:00.000Z","persistent_id":"7725d932ee3c664eb0df9dfcdef66b6dab4e0ca07ed49eb8d3eb0a9857f1fad0","month":"2015-08-31T23:00:00.000Z","context":null,"id":43517452},{"Place Name":"E05001769","category":"possession-of-weapons","location_type":"Force","longitude":-1.43906,"latitude":52.8957,"street-name":"On or near Radford Street","street-id":608690,"location_subtype":null,"outcome-category":"Offender given a caution","outcome-date":"2016-03-31T23:00:00.000Z","persistent_id":"4b38f7a014cdcbfbd0634a04feb704b614fff85c44ea76af47a3737d651d115b","month":"2016-03-31T23:00:00.000Z","context":null,"id":48358367},{"Place Name":"E05001770","category":"possession-of-weapons","location_type":"Force","longitude":-1.48128,"latitude":52.9239,"street-name":"On or near Parking Area","street-id":610598,"location_subtype":null,"outcome-category":"Offender given a caution","outcome-date":"2015-05-31T23:00:00.000Z","persistent_id":"67a612737ccd440b6def097fb6123b0bbbb9504cf36a245de2a2fa7fee2fb651","month":"2015-04-30T23:00:00.000Z","context":null,"id":40899168}];//{array: []};
    

    // makeCORSRequest('GET',$scope.pdApiGetUrl)
    // 	.then(function (datums) {
    // 		console.log(datums);
    // 	})
    // 	.catch(function (err) {
    // 		console.error('Augh, there was an error!', err.statusText);
    // 	});

// Working get - testing only so  commented out

	// makeCORSRequest('GET', $scope.pdApiGetUrl)
	// .then(function(response) {
	//   // return makeRequest('GET', datums.url);
	//   // console.log(response);
	//   console.log("Success!",response);
	//   $scope.pdItems = response.data;
	//   console.log("pdItems:", $scope.pdItems);

	// }, function(error) {
	// 	console.error("Failed!", error);
	// 	// console.log("An error occured");
	// });


// working get - end


	// .then(function (moreDatums) {
	//   console.log(moreDatums);
	// })
	// .catch(function (err) {
	//   console.error('Augh, there was an error!', err.statusText);
	// });
   //  $scope.getItems = function(url) {
   //  	if (typeof url != "undefined") {
			// // $http.get($scope.pdApiGetUrl)
	  // //           .success(function(data, status) {
	  // //               $scope.pdItems = data;
	  // //           })
	  // //           .error(function(data, status) {
	  // //               alert("Error");
	  // //           });
			// var xhr = createCORSRequest("GET",url);
			// $.when(xhr).done
			// console.log('xhr:');
			// console.log(xhr);
   //  	}
        
   //  };
	
	$scope.selectedReportId = "f3b712c4-e2ad-452c-93e6-76464a13177f";

    $scope.showSelectedValue = function (mySelect){
    	console.log("Report selected:",mySelect);
    	// $scope.selectedReportId = "f3b712c4-e2ad-452c-93e6-76464a13177f";
    	$scope.selectedReportId = mySelect;
    }

	$scope.refreshButtonStatus = function () {
		document.getElementById('pdRefreshButton').disabled = document.getElementById("pdRefreshOn").checked;
		$scope.pdRefreshAuto = document.getElementById("pdRefreshOn").checked;
	}

	$scope.showTable = function () {
		// console.log("showTable: ", $scope.showTable);
		return $scope.displayTable || document.getElementById("pdRefreshOn").checked;
	}

	$scope.likeReport = function () {
		selectedReportId = $scope.selectedReportId;
		dateTimeNow = $filter('date')(Date.now(),"yyyy-MM-ddTHH:mm:sss") + 'Z';
		dataToPost = [
						{
						"LikeDislike" :"Like",
						"Report" :selectedReportId,
						"TimeStamp" :dateTimeNow,
						"ReportedBy" :userName,
						"value": 1
						}
					 ];
		// var xhr = new XMLHttpRequest();
		// xhr.open("POST", postUrl);
		// xhr.setRequestHeader("Content-Type", "application/json");
		// xhr.setRequestHeader('Authorization', "Bearer " + token);
		// xhr.send(JSON.stringify(dataToPost));

		var req = {
			method: 'POST',
			url: postUrl,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			data: dataToPost
		};

		$http(req).then(function(response) {
			console.log('response' , response);
		});

		// console.log("post data succesful:", dataToPost);
		// alert('Like');
	}

	$scope.dislikeReport = function () {
		selectedReportId = $scope.selectedReportId;
		dateTimeNow = $filter('date')(Date.now(),"yyyy-MM-ddTHH:mm:sss") + 'Z';
		dataToPost = [
						{
						"LikeDislike" :"Dislike",
						"Report" :selectedReportId,
						"TimeStamp" :dateTimeNow,
						"ReportedBy" :userName,
						"value": 1
						}
					 ];
		var xhr = new XMLHttpRequest();
		xhr.open("POST", postUrl);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify(dataToPost));

		console.log("post data succesful:", dataToPost);
	}

	// var scope.showThumb = false;

	$scope.initThumbs = function () {
		$scope.showThumb = true;
		// console.log("showThumb");
	}

	$scope.hideThumbs = function () {
		$scope.showThumb = !$scope.showThumb;
		$scope.clearTable();
		populateTable($('#apiResults'), $scope);
		$scope.displayTable = true;
	 	// console.log($scope.showThumb);
	}

	$scope.displayThumb = function () {
		console.log("displayThumb", $scope.selectedReportId);
		if (typeof $scope.selectedReportId != 'undefined') {
			return true;
		} else {
			return false;
		}
		// return $scope.showThumb;
	}

	$scope.clearTable = function () {
		document.getElementById("apiResults").innerHTML = "";
	}

	console.log("User Info:",adalService.userInfo);
	console.log("date now:",dateTimeNow);

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
		
		initializeDataSelection(report,$('#getApiUrl'),$('#apiResponse'), $('#apiResults'),$scope,$http);
		applyFilters(report,$scope);
		// console.log($scope.dataSelected);
		// var qryString = getDataSelection(report);//,qryString);
		// console.log(qryString);

		// Report.off removes a given event handler if it exists.
		report.off("loaded");

		// Report.on will add an event handler which prints to Log window.
		report.on("loaded", function() {
		    console.log("Loaded");
		});


    }

    $scope.loadReport();
    console.log("$pdRefreshOn:",$scope.pdRefreshAuto);
}]);


// [
// {
// "LikeDislike" :"AAAAA555555",
// "Report" :"AAAAA555555",
// "TimeStamp" :"2017-03-15T22:10:42.574Z",
// "ReportedBy" :"AAAAA555555"
// }
// ]

// curl --include \
// --request POST \
// --header "Content-Type: application/json" \
// --data-binary "[
// {
// \"Like\" :98.6,
// \"Dislike\" :98.6,
// \"Report\" :\"AAAAA555555\",
// \"TimeStamp\" :\"2017-03-15T12:44:03.727Z\"
// }
// ]" \
// "https://api.powerbi.com/beta/e16346ae-eec1-4260-ab51-ac102fa054be/datasets/9e6792e9-bba0-4289-afce-85dec1ee482b/rows?key=%2BgyfC4JwCV%2FE%2Fv6kHr1%2FcegLHyfZdDI7nD%2Bmh8iab12dvqpMiOP9RaG6ROd0Mdyqs5%2Bxia8G91Lq038vYkT7dw%3D%3D"
