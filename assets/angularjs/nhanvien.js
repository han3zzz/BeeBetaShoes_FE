
window.NhanVienController = function ($scope, $http, $location, $routeParams) {
    let url = "http://localhost:8080/api/employee";
    $scope.loadAll = function () {

        // load material
        $scope.list = [];
        $http.get(url).then(function (response) {
            $scope.list = response.data;
        })

    }
    $scope.loadAll();

    // pagation
    $scope.pager = {
        page: 0,
        size: 5,
        get items() {
            var start = this.page * this.size;
            return $scope.list.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.list.length / this.size);
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
        }
    }
    $scope.form = {
        code: '',
        fullname: '',
        username: '',
        password: '',
        image: '',
        gender: '',
        phone: '',
        email: '',
    }
    //add
    $scope.add = function () {
        var MainImage = document.getElementById("fileUpload").files;
        var img = new FormData();
        img.append("files",MainImage[0]);
        $http.post("http://localhost:8080/api/upload",img,{
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function (upImage){
            $http.post(url, {
                code: $scope.form.code,
                fullname: $scope.form.fullname,
                username: $scope.form.username,
                password: $scope.form.password,
                image: upImage.data[0],
                gender: $scope.form.gender,
                phone: $scope.form.phone,
                email: $scope.form.email,
    
            }).then(function (resp) {
                if (resp.status === 200) {
                    Swal.fire('Thêm thành công !', '', 'success')
                    setTimeout(() => {
                        location.href = "#/employee/view";
                    }, 2000);
                }
            }).catch(function (err) {
                if (err.status === 400) {
                    $scope.validationErrors = err.data;
                }
    
            })
    })
    }
    //update 
    $scope.update = function () {
        var MainImage = document.getElementById("fileUpload").files;
        if(MainImage.length > 0){
            var img = new FormData();
            img.append("files",MainImage[0]);
            $http.post("http://localhost:8080/api/upload",img,{
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function (upImage){
                let id = $routeParams.id;
                $http.put("http://localhost:8080/api/employee/update/" + id, {
                    code: $scope.form.code,
                    fullname: $scope.form.fullname,
                    username: $scope.form.username,
                    password: $scope.form.password,
                    image: upImage.data[0],
                    gender: $scope.form.gender,
                    phone: $scope.form.phone,
                    email: $scope.form.email,
                }).then(function (resp) {
                    if (resp.status === 200) {
                        Swal.fire('Sửa thành công !', '', 'success')
                        setTimeout(() => {
                            location.href = "#/employee/view";
                        }, 2000);
                    }
                }).catch(function (err) {
                    if (err.status === 400) {
                        $scope.validationErrors = err.data;
                    }
        
                })
            })
        }else{
            let id = $routeParams.id;
            $http.get("http://localhost:8080/api/employee/" + id).then(function (resp) {
                $http.put("http://localhost:8080/api/employee/update/" + id, {
                    code: $scope.form.code,
                    fullname: $scope.form.fullname,
                    username: $scope.form.username,
                    password: $scope.form.password,
                    image : resp.data.image,
                    gender: $scope.form.gender,
                    phone: $scope.form.phone,
                    email: $scope.form.email,
                }).then(function (resp) {
                    if (resp.status === 200) {
                        Swal.fire('Sửa thành công !', '', 'success')
                        setTimeout(() => {
                            location.href = "#/employee/view";
                        }, 2000);
                    }
                }).catch(function (err) {
                    if (err.status === 400) {
                        $scope.validationErrors = err.data;
                    }
        
                })
            })
          
           
        }
      
   
    }
    // delete
    $scope.delete = function (id) {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa ?',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                $http.put("http://localhost:8080/api/employee/delete/" + id).then(function (response) {
                    if (response.status === 200) {
                        Swal.fire('Xóa thành công !', '', 'success')
                        $scope.loadAll();
                    }
                    else {
                        Swal.fire('Xóa thất bại !', '', 'error')
                    }
                })

            }
        })
    }

    // detail
    $scope.detail = function () {
        let id = $routeParams.id;
        $http.get("http://localhost:8080/api/employee/" + id).then(function (resp) {
            $scope.form = resp.data;
        })
    }

    // search by name
    $scope.search = function () {
        var name = document.getElementById("name").value;
        if (name.trim().length === 0) {
            Swal.fire("Nhập tên trước khi tìm kiếm...", "", "error");
        }
        else {
            $http.get("http://localhost:8080/api/employee/search/" + name).then(function (search) {
                $scope.list = search.data;
                $scope.pager.first();
            })
        }

    }
}