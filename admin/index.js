var app = angular.module("myApp", ["ngRoute","angularUtils.directives.dirPagination"]);
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/products/view", {
            templateUrl: "sanpham/index.html",
            controller : SanPhamController
           
        })
        .when("/products/add", {
            templateUrl: "sanpham/add.html",
            controller : SanPhamController
           
        })
        .when("/products/update/:id", {
            templateUrl: "sanpham/update.html",
            controller : SanPhamController
           
        })
        .when("/return-ex", {
            templateUrl: "return-ex/index.html",
            controller : ReturnEXControler
           
        })
        .when("/return-ex-refuse", {
            templateUrl: "return-ex/index-refuse.html",
            controller : ReturnRefuseChangeControler
           
        })
        .when("/return-ex-watting", {
            templateUrl: "return-ex/index-watting.html",
            controller : ReturnWattingChangeControler
           
        })

        .otherwise({
            redirectTo: "/products/view",
        });

});