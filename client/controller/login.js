window.LoginController = function ($http, $scope, $routeParams, $rootScope,AuthenticationService) {
 

    $rootScope.isLoggedIn = false;
    $scope.login = function(){
        $http.post('http://localhost:8080/api/auth/login', {
            username : $scope.username,
            password : $scope.password
        })
        .then(function (response) {
            if(response.status === 200){
                var token = response.data.token;
            // Lưu token vào local storage hoặc session storage
        //    console.log(response.data.user.fullname);
        AuthenticationService.setAuthentication(true, response.data.user);
            
           
            // Redirect đến trang bảo mật hoặc thực hiện các hành động khác sau khi đăng nhập thành công
            Swal.fire("Đăng nhập thành công !","","success");
            location.href= '#/home'
            
            }
        })
        .catch(function (err){
            if (err.status === 400){
                $scope.validationErrors = err.data;
            }
            else{
                Swal.fire("Tài khoản hoặc mật khẩu không đúng !","","error");   
        }
           

        })
    }
   

}