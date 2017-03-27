angular.module('powerBI_API')
  .directive('loading', ['$http', function ($http) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.isLoading = function () {
          return $http.pendingRequests.length > 0;
        };
        scope.$watch(scope.isLoading, function (value) {
          if (value) {
            element.removeClass('ng-hide');
          } else {
            element.addClass('ng-hide');
          }
        });
      }
    };
}]);


// https://login.microsoftonline.com/homeofficegsigovuk.onmicrosoft.com/oauth2/authorize?response_type=id_token&client_id=2ad5dba7-b359-483c-89e2-3da5878eb8e5&redirect_uri=https%3A%2F%2Flocalhost%3A8080%2F&state=318b2f33-e220-4dc8-9987-3bc81f08503d&nux=1&scope=Dataset.ReadWrite.All&x-client-SKU=Js&x-client-Ver=1.0.0
// https://login.microsoftonline.com/homeofficegsigovuk.onmicrosoft.com/oauth2/authorize?response_type=id_token&client_id=2ad5dba7-b359-483c-89e2-3da5878eb8e5&redirect_uri=https%3A%2F%2Flocalhost%3A8080%2F&state=318b2f33-e220-4dc8-9987-3bc81f08503d&nux=1&scope=Dataset.ReadWrite.All&x-client-SKU=Js&x-client-Ver=1.0.0&nonce=ddb86f08-8994-4407-bd62-23ce7167c21d