
let urlcategory = "/api/category";
var app = angular.module("myApp",[]);
app.controller("ctrl", function ($scope, $http, $window){
    $scope.loadAll = function (){

        // load category
        $scope.list = [];
        $http.get(urlcategory).then(function (response){
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

    //export exel
    $scope.exportToExcel = function () {
        Swal.fire({
            title: 'Bạn có chắc muốn xuất Exel ?',
            showCancelButton: true,
            confirmButtonText: 'Xuất',
        }).then((result) => {
            if (result.isConfirmed){
                // Chuyển dữ liệu thành một mảng các đối tượng JSON
                var dataArray = $scope.list.map(function (item) {
                    var Materials = item.productDetail_materials.map(function (detail){
                        return detail.material.name;
                    }).join(', ');
                    var Images = item.product.productImages.map(function (image){
                        return image.url ;
                    }).join(', ');
                    var Color_Size = item.productDetail_size_colors.map(function (size){
                        return 'Color : ' + size.color.name + ' { Size ' + size.size.name + ' | Quantity : ' + size.quantity + '}';
                    }).join(', ');
                    return {
                        Code: item.product.code,
                        Name: item.product.name,
                        Images : Images,
                        Price : item.price,
                        Weight : item.weight,
                        Description : item.description,
                        Discount : item.discount,
                        Category : item.category.name,
                        Brand : item.brand.name,
                        Toe : item.toe.name,
                        Sole : item.sole.name,
                        Shoelcae : item.shoelace.name,
                        Heelcushion : item.heelcushion.name,
                        Materials :  Materials,
                        QuantityByColor_Sizes : Color_Size
                    };
                });

                // Tạo một workbook mới
                var workbook = XLSX.utils.book_new();

                // Tạo một worksheet từ dữ liệu
                var worksheet = XLSX.utils.json_to_sheet(dataArray);

                // Thêm worksheet vào workbook
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Sheet');

                // Xuất tệp Excel
                XLSX.writeFile(workbook, 'data'+ new Date()+'.xlsx');
                Swal.fire("Xuất file exel thành công !","","success");
            }
        })

    }

    // search by name
    $scope.search = function (){
        var name = document.getElementById("name").value;
        if (name.trim().length === 0){
            Swal.fire("Nhập tên trước khi tìm kiếm...","","error");
        }
        else{
            $http.get("/api/product/search/"+name).then(function (search){
                $scope.list = search.data;
                $scope.pager.first();
            })
        }

    }


    //import exel
    $scope.importExel = function (){
        // Swal.fire("Đang phát triển...","","warning"); return;
        // document.getElementById('fileInput').click();
        let file = document.getElementById("fileInput").files;

        if (file.length === 0){
            Swal.fire("Vui lòng tải lên file Exel trước khi thêm !","","error");
        }else{
            let form = new FormData();
            form.append("file",file[0]);
            $http.post("/api/product/importExel",form,{
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined // Để để Angular tự động thiết lập Content-Type
                }
            }).catch(function (err){
                if (err.status === 500){
                    Swal.fire('Có lỗi xảy ra vui lòng xem lại !', '', 'error')
                }
            }).then(function (ok){
                Swal.fire('Thêm data từ Exel thành công !', '', 'success')
                setTimeout(() => {
                    location.href = "/admin/products/view";
                }, 2000);

            })



        }


    }


})
