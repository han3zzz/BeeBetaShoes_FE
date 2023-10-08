var app = angular.module("client", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider,$httpProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/home", {
            templateUrl: "home.html",
            controller : HomeController
           
        })
        .when("/login", {
            templateUrl: "login.html",
            controller : LoginController
           
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
        .when("/myorder", {
            templateUrl: "myorder.html",
            controller : MyOrderController
           
          
           
        })
      

        .otherwise({
            redirectTo: "/404",
        });

});

app.factory('AuthService', ['$http', '$window', function($http, $window) {
    var authService = {};

    authService.getToken = function() {
        return $window.localStorage.getItem('token');
    };

    authService.setToken = function(token) {
        $window.localStorage.setItem('token', token);
    };

    authService.clearToken = function() {
        $window.localStorage.removeItem('token');
    };


    authService.logout = function() {
        authService.clearToken();
    };

    authService.isAuthenticated = function() {
        var token = authService.getToken();
        return token !== null && token !== undefined;
    };

    return authService;
}]);