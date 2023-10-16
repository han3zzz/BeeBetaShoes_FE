window.KhuyenMaiController = function ($scope, $http, $location, $routeParams) {
    let url = "http://localhost:8080/api/voucher";
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
        name: '',
        typevoucher:'',
        isvoucher:'',
        discount:'',
        cash:'',
        startdate:'',
        enddate:'',
    }

    //add
    $scope.add = function(){
        $http.post(url,{
            code : $scope.form.code,
            name : $scope.form.name,
            typeVoucher : $scope.form.typevoucher ,
            isVoucher : $scope.form.isvoucher ,
            discount : $scope.form.discount, 
            cash : $scope.form.cash,
            startDate : $scope.form.startdate,
            endDate : $scope.form.enddate,
            
        }).then(function(resp){
            if(resp.status === 200){
                Swal.fire('Thêm thành công !', '', 'success')
                setTimeout(() => {
                    location.href = "#/voucher/view";
                }, 2000);
            }
        }).catch(function (err){
            if (err.status === 400){
                $scope.validationErrors = err.data;
            }
            
        })
    }

    //update 
    $scope.update = function(){
        let id = $routeParams.id ;
        $http.put("http://localhost:8080/api/voucher/update/"+id,{
            code : $scope.form.code,
            name : $scope.form.name,
            typevoucher : $scope.form.typevoucher,
            isvoucher : $scope.form.isvoucher,
            discount : $scope.form.discount,
            cash : $scope.form.cash,
            startdate : $scope.form.startdate,
            enddate : $scope.form.enddate,
        }).then(function(resp){
            if(resp.status === 200){
                Swal.fire('Sửa thành công !', '', 'success')
                setTimeout(() => {
                    location.href = "#/voucher/view";
                }, 2000);
            }
        }).catch(function (err){
            if (err.status === 400){
                $scope.validationErrors = err.data;
            }

        })
    }

    $scope.delete = function (id) {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa ?',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                $http.put("http://localhost:8080/api/voucher/delete/" + id).then(function (response) {
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

     // detail khach hang
     $scope.detail = function () {
        let id = $routeParams.id;
        $http.get("http://localhost:8080/api/voucher/" + id).then(function (resp) {
            $scope.form = resp.data;
            alert($scope.form.gender)
        })

    }

}