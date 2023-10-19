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
        .when("/categorys/view", {
            templateUrl: "danhmuc/index.html",
            controller : DanhMucController
        })
        .when("/categorys/add", {
            templateUrl: "danhmuc/add.html",
            controller : DanhMucController
        })
        .when("/categorys/update/:id", {
            templateUrl: "danhmuc/update.html",
            controller : DanhMucController
        })
        .when("/brands/view", {
            templateUrl: "thuonghieu/index.html",
            controller : ThuongHieuController
        })
        .when("/brands/add", {
            templateUrl: "thuonghieu/add.html",
            controller : ThuongHieuController
        })
        .when("/brands/update/:id", {
            templateUrl: "thuonghieu/update.html",
            controller : ThuongHieuController
        })
        .when("/toes/view", {
            templateUrl: "muigiay/index.html",
            controller : MuiGiayController
        })
        .when("/toes/add", {
            templateUrl: "muigiay/add.html",
            controller : MuiGiayController
        })
        .when("/toes/update/:id", {
            templateUrl: "muigiay/update.html",
            controller : MuiGiayController
        })
        .when("/soles/view", {
            templateUrl: "degiay/index.html",
            controller : DeGiayController
        })
        .when("/soles/add", {
            templateUrl: "degiay/add.html",
            controller : DeGiayController
        })
        .when("/soles/update/:id", {
            templateUrl: "degiay/update.html",
            controller : DeGiayController
        })
        .when("/designs/view", {
            templateUrl: "thietke/index.html",
            controller : ThietKeController
        })
        .when("/designs/add", {
            templateUrl: "thietke/add.html",
            controller : ThietKeController
        })
        .when("/designs/update/:id", {
            templateUrl: "thietke/update.html",
            controller : ThietKeController
        })
        .when("/shoelaces/view", {
            templateUrl: "daygiay/index.html",
            controller : DayGiayController
        })
        .when("/shoelaces/add", {
            templateUrl: "daygiay/add.html",
            controller : DayGiayController
        })
        .when("/shoelaces/update/:id", {
            templateUrl: "daygiay/update.html",
            controller : DayGiayController
        })
        .when("/heelcushions/view", {
            templateUrl: "lotgiay/index.html",
            controller : LotGiayController
        })
        .when("/heelcushions/add", {
            templateUrl: "lotgiay/add.html",
            controller : LotGiayController
        })
        .when("/heelcushions/update/:id", {
            templateUrl: "lotgiay/update.html",
            controller : LotGiayController
        })
        .when("/materials/view", {
            templateUrl: "chatlieu/index.html",
            controller : ChatLieuController
        })
        .when("/materials/add", {
            templateUrl: "chatlieu/add.html",
            controller : ChatLieuController
        })
        .when("/materials/update/:id", {
            templateUrl: "chatlieu/update.html",
            controller : ChatLieuController
        })
        .when("/colors/view", {
            templateUrl: "mausac/index.html",
            controller : MauSacController
        })
        .when("/colors/add", {
            templateUrl: "mausac/add.html",
            controller : MauSacController
        })
        .when("/colors/update/:id", {
            templateUrl: "mausac/update.html",
            controller : MauSacController
        })
        .when("/sizes/view", {
            templateUrl: "kichthuoc/index.html",
            controller : KichThuocController
        })
        .when("/sizes/add", {
            templateUrl: "kichthuoc/add.html",
            controller : KichThuocController
        })
        .when("/sizes/update/:id", {
            templateUrl: "kichthuoc/update.html",
            controller : KichThuocController
        })
        .when("/customer/view", {
            templateUrl: "khachhang/index.html",
            controller : KhachHangController
        })
        .when("/customer/add", {
            templateUrl: "khachhang/add.html",
            controller : KhachHangController
        })
        .when("/customer/update/:id", {
            templateUrl: "khachhang/update.html",
            controller : KhachHangController
        })
        .when("/employee/view", {
            templateUrl: "nhanvien/index.html",
            controller : NhanVienController
           
        })
        .when("/employee/add", {
            templateUrl: "nhanvien/add.html",
            controller : NhanVienController
            
        })
        .when("/employee/update/:id", {
            templateUrl: "nhanvien/update.html",
            controller : NhanVienController
        })
        .when("/role/view", {
            templateUrl: "vaitro/index.html",
            controller : VaiTroController
           
        })
        .when("/role/add", {
            templateUrl: "vaitro/add.html",
            controller : VaiTroController
            
        })
        .when("/role/update/:id", {
            templateUrl: "vaitro/update.html",
            controller : VaiTroController
        })

        .when("/voucher/view", {
            templateUrl: "khuyenmai/index.html",
            controller : KhuyenMaiController
           
        })
        .when("/voucher/add", {
            templateUrl: "khuyenmai/add.html",
            controller : KhuyenMaiController
            
        })
        .when("/voucher/update/:id", {
            templateUrl: "khuyenmai/update.html",
            controller : KhuyenMaiController
        })
        .when("/bill/view", {
            templateUrl: "hoadon/index.html",
            controller : HoaDonController
        })
        .when("/bill/view/:code", {
            templateUrl: "hoadon/detail.html",
            controller : HoaDonController
        })
        .when("/sell/view", {
            templateUrl: "banhang/index.html",
           controller : BanHangController
        })


        

        .otherwise({
            redirectTo: "/products/view",
        });

});