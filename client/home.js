
window.HomePageController = function($scope, $http, $location,$routeParams){
    let url = "http://localhost:8080/api/product";
       //load product
       $scope.list = [];
       $http.get(url).then(function (response){
           $scope.list = response.data;
       })



}
