var app = angular.module("client", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/home", {
            templateUrl: "home.html",
            controller : HomeController
           
        })
        .when("/login", {
            templateUrl: "login.html",
            // controller : HomeController
           
        })
        .when("/register", {
            templateUrl: "register.html",
           
        })
        .when("/404", {
            templateUrl: "404.html",
           
        })
        .when("/products", {
            templateUrl: "products.html",
            controller : HomeController
           
        })
        .when("/detail/:id", {
            templateUrl: "detail.html",
            controller : HomeController
           
        })
        .when("/cart", {
            templateUrl: "cart.html",
            controller : HomeController
          
           
        })
        .when("/checkout", {
            templateUrl: "checkout.html",
            controller : HomeController
          
           
        })
      

        .otherwise({
            redirectTo: "/404",
        });

});
