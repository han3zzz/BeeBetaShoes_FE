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

// app.run(function ($rootScope, $http) {
//     // Kiểm tra xem có JWT token đã lưu trong localStorage hay không
//     $rootScope.isLoggedIn = false;
//     var token = localStorage.getItem('token');
//     var name = localStorage.getItem('fullname');
//     if (token) {
//         // Thiết lập token trong header cho mọi yêu cầu
//         $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
//         $rootScope.isLoggedIn = true;
//         $rootScope.fullname = name;
//     }
//     $rootScope.logout = function(){
        
//         localStorage.removeItem('token');
//         $rootScope.isLoggedIn = false;
//     }
// });
app.service('AuthenticationService', function () {
    var isAuthenticated = false;
    var userInfo = {};

    return {
        setAuthentication: function (status, user) {
            isAuthenticated = status;
            userInfo = user;
        },
        isAuthenticated: function () {
            return isAuthenticated;
        },
        getUserInfo: function () {
            return userInfo;
        }
    };
});
