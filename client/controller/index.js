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
            controller : ProductController
           
        })
        .when("/detail/:id", {
            templateUrl: "detail.html",
            controller : DetailController
           
        })
        .when("/cart", {
            templateUrl: "cart.html",
            controller : CartController
          
           
        })
        .when("/checkout", {
            templateUrl: "checkout.html",
            controller : CheckOutController
          
           
        })
      

        .otherwise({
            redirectTo: "/404",
        });

});
