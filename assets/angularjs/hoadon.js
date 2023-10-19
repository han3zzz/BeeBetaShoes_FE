window.HoaDonController = function($scope, $http, $location,$routeParams){
    $scope.list = [];
    $http.get("http://localhost:8080/api/bill/billAll").then(function(rest){
        $scope.list = rest.data;
    })
    let urlcolor = "http://localhost:8080/api/color";
    let urlsize = "http://localhost:8080/api/size";
    let url = "http://localhost:8080/api/product";
     // load color
$scope.listColor = [];
$http.get(urlcolor).then(function (response) {
  $scope.listColor = response.data;
});
// load size
$scope.listSize = [];
$http.get(urlsize).then(function (response) {
  $scope.listSize = response.data;
});
 //load product
 $scope.listPro = [];
 $http.get(url).then(function (response) {
   $scope.listPro = response.data;
 });


                  // pagation
                  $scope.pager = {
                    page: 0,
                    size: 10,
                    get items() {
                      var start = this.page * this.size;
                      return $scope.list.slice(start, start + this.size);
                    },
                    get count() {
                      return Math.ceil((1.0 * $scope.list.length) / this.size);
                    },
              
                    first() {
                      this.page = 0;
                    },
                    prev() {
                      this.page--;
                      if (this.page < 0) {
                        this.last();
                      }
                    },
                    next() {
                      this.page++;
                      if (this.page >= this.count) {
                        this.first();
                      }
                    },
                    last() {
                      this.page = this.count - 1;
                    },
                  };

                  $scope.redirect = function(code){
                    location.href = "#/bill/view/" +code;
                  }
                  $scope.listItem = [];
                  $scope.bill = {};
                  let code = $routeParams.code ;
                  $http.get("http://localhost:8080/api/bill/getbycode/"+code).then(function(resp){
                    $scope.bill = resp.data;
                     })
                     $scope.address = {};
                     $http.get("http://localhost:8080/api/address/getBill/"+code).then(function(resp){
                       $scope.address = resp.data;
                     })
                     $http.get("http://localhost:8080/api/bill/getallbybill/"+code).then(function(resp){
                       $scope.listItem = resp.data;
                     })
                


}