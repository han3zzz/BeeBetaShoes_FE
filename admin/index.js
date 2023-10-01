var app = angular.module("myApp", ["ngRoute"]);
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

        .otherwise({
            redirectTo: "/products/view",
        });

});