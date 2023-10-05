window.HomeController = function ($http, $scope, $routeParams, $location) {
  $scope.loadProductNew = function () {
    let url = "http://localhost:8080/api/product";
    let urlcategory = "http://localhost:8080/api/category";
    let urlbrand = "http://localhost:8080/api/brand";
    let urltoe = "http://localhost:8080/api/toe";
    let urlsole = "http://localhost:8080/api/sole";
    let urlshoelace = "http://localhost:8080/api/shoelace";
    let urlheelcushion = "http://localhost:8080/api/heelcushion";
    let urlmaterial = "http://localhost:8080/api/material";
    let urlcolor = "http://localhost:8080/api/color";
    let urlsize = "http://localhost:8080/api/size";
    let urldesign = "http://localhost:8080/api/design";
    //load product
    $scope.list = [];
    $http.get(url).then(function (response) {
      $scope.list = response.data;
    });
    // load category
    $scope.listCategory = [];
    $http.get(urlcategory).then(function (response) {
      $scope.listCategory = response.data;
    });
    // load brand
    $scope.listBrand = [];
    $http.get(urlbrand).then(function (response) {
      $scope.listBrand = response.data;
    });
    // load toe
    $scope.listToe = [];
    $http.get(urltoe).then(function (response) {
      $scope.listToe = response.data;
    });
    // load sole
    $scope.listSole = [];
    $http.get(urlsole).then(function (response) {
      $scope.listSole = response.data;
    });
    // load shoelace
    $scope.listShoelace = [];
    $http.get(urlshoelace).then(function (response) {
      $scope.listShoelace = response.data;
    });
    // load heelcushion
    $scope.listHeelcushion = [];
    $http.get(urlheelcushion).then(function (response) {
      $scope.listHeelcushion = response.data;
    });
    // load material
    $scope.listMaterial = [];
    $http.get(urlmaterial).then(function (response) {
      $scope.listMaterial = response.data;
    });
    // load color
    $scope.listColor = [];
    $http.get(urlcolor).then(function (response) {
      $scope.listColor = response.data;
    });
    // load size
    $scope.listSize = [];
    $http.get(urlsize).then(function (response) {
      $scope.listSize = response.data;
    });
    // load design
    $scope.listDesign = [];
    $http.get(urldesign).then(function (response) {
      $scope.listDesign = response.data;
    });

    $scope.sort = function () {
      let idsort = document.getElementById("SortBy").value;
      if (idsort === "sort") {
        $http.get(url).then(function (response) {
          $scope.list = response.data;
        });
      } else if (idsort === "sort1") {
        $scope.list = $scope.list.sort(function (a, b) {
          return a.product.name.localeCompare(b.product.name);
        });
      } else if (idsort === "sort2") {
        $scope.list = $scope.list.sort(function (a, b) {
          return b.product.name.localeCompare(a.product.name);
        });
      } else if (idsort === "sort3") {
        $scope.list = $scope.list.sort(function (a, b) {
          return a.price - b.price;
        });
      } else if (idsort === "sort4") {
        $scope.list = $scope.list.sort(function (a, b) {
          return b.price - a.price;
        });
      }
    };

    // pagation
    $scope.pager = {
      page: 0,
      size: 16,
      get items() {
        var start = this.page * this.size;
        return $scope.list.slice(start, start + this.size);
      },
      get count() {
        return Math.ceil((1.0 * $scope.list.length) / this.size);
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
      },
    };

    let min = 0;
    let max = 9999999;

    const calcLeftPosition = (value) => (100 / (9999999 - 0)) * (value - 0);

    $("#rangeMin").on("input", function (e) {
      const newValue = parseInt(e.target.value);
      if (newValue > max) return;
      min = newValue;
      $("#thumbMin").css("left", calcLeftPosition(newValue) + "%");
      $("#min").html(newValue);
      $("#line").css({
        left: calcLeftPosition(newValue) + "%",
        right: 100 - calcLeftPosition(max) + "%",
      });
    });

    $("#rangeMax").on("input", function (e) {
      const newValue = parseInt(e.target.value);
      if (newValue < min) return;
      max = newValue;
      $("#thumbMax").css("left", calcLeftPosition(newValue) + "%");
      $("#max").html(newValue);
      $("#line").css({
        left: calcLeftPosition(min) + "%",
        right: 100 - calcLeftPosition(newValue) + "%",
      });
    });

    //trong luong
    //trong luong
    let minTL = 0;
    let maxTL = 3000;

    const calcLeftPosition1 = (value) => (100 / (3000 - 0)) * (value - 0);

    $("#rangeMinTL").on("input", function (e) {
      const newValue = parseInt(e.target.value);
      if (newValue > maxTL) return;
      minTL = newValue;
      $("#thumbMinTL").css("left", calcLeftPosition1(newValue) + "%");
      $("#minTL").html(newValue);
      $("#lineTL").css({
        left: calcLeftPosition1(newValue) + "%",
        right: 100 - calcLeftPosition1(maxTL) + "%",
      });
    });

    $("#rangeMaxTL").on("input", function (e) {
      const newValue = parseInt(e.target.value);
      if (newValue < minTL) return;
      maxTL = newValue;
      $("#thumbMaxTL").css("left", calcLeftPosition1(newValue) + "%");
      $("#maxTL").html(newValue);
      $("#lineTL").css({
        left: calcLeftPosition1(minTL) + "%",
        right: 100 - calcLeftPosition1(newValue) + "%",
      });
    });

    $scope.filter = function () {
      let idCategory = document.getElementById("danhmuc").value;
      let idMaterial = document.getElementById("chatlieu").value;
      let idColor = document.getElementById("mausac").value;
      let idSize = document.getElementById("kichthuoc").value;
      let idBrand = document.getElementById("thuonghieu").value;
      let idToe = document.getElementById("muigiay").value;
      let idSole = document.getElementById("degiay").value;
      let idShoelace = document.getElementById("daygiay").value;
      let idHeelcushion = document.getElementById("lotgiay").value;
      let idDesign = document.getElementById("thietke").value;
      let min = document.getElementById("rangeMin").value;
      let max = document.getElementById("rangeMax").value;
      let minTL = document.getElementById("rangeMinTL").value;
      let maxTL = document.getElementById("rangeMaxTL").value;
      let idcate = idCategory != "" ? idCategory : null;
      let idbrad = idBrand != "" ? idBrand : null;
      let idmate = idMaterial != "" ? idMaterial : null;
      let idtoe = idToe != "" ? idToe : null;
      let idsole = idSole != "" ? idSole : null;
      let idcolor = idColor != "" ? idColor : null;
      let idsize = idSize != "" ? idSize : null;
      let idshoe = idShoelace != "" ? idShoelace : null;
      let idheel = idHeelcushion != "" ? idHeelcushion : null;
      let iddesign = idDesign != "" ? idDesign : null;

      var params = {
        idcategory: idcate,
        idmaterial: idmate,
        idcolor: idcolor,
        idsize: idsize,
        idbrand: idbrad,
        idtoe: idtoe,
        idsole: idsole,
        idshoelace: idshoe,
        idheelcushion: idheel,
        iddesign: iddesign,
        min: min,
        max: max,
        minTL: minTL,
        maxTL: maxTL,
      };
      $http({
        method: "GET",
        url: "http://localhost:8080/api/product/filter",
        params: params,
      }).then(function (resp) {
        $scope.list = resp.data;
        $scope.pager.first();
      });
    };
  };

  $scope.loadProductNew();
  $scope.colorid = [];
  //load product new
  $scope.listProductNew = [];
  $http.get("http://localhost:8080/api/product").then(function (response) {
    $scope.listProductNew = response.data;
  });
  // pagation
  $scope.pagerProductNew = {
    page: 0,
    size: 8,
    get items() {
      var start = this.page * this.size;
      return $scope.listProductNew.slice(start, start + this.size);
    },
    get count() {
      return Math.ceil((1.0 * $scope.list.length) / this.size);
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
    },
  };

  $scope.detail = function () {
    let id = $routeParams.id;
    $scope.sp = {};
    $scope.listCungLoai = [];
    $http
      .get("http://localhost:8080/api/product/" + id)
      .then(function (response) {
        $scope.sp = response.data;
        $http
          .get(
            "http://localhost:8080/api/product/category/" +
              response.data.category.id
          )
          .then(function (e) {
            $scope.listCungLoai = e.data;
            // pagation
            $scope.pagerCungLoai = {
              page: 0,
              size: 4,
              get items() {
                var start = this.page * this.size;
                return $scope.listCungLoai.slice(start, start + this.size);
              },
            };
          });
      });
    var params = {
      IdProduct: id,
    };
    $http({
      method: "GET",
      url: "http://localhost:8080/api/productdetail_color_size/getQuantityProduct",
      params: params,
    }).then(function (resp) {
      $scope.quantity = resp.data;
    });

    $http
      .get("http://localhost:8080/api/color/get/" + id)
      .then(function (color) {
        $scope.colorid = color.data;
      });
    // $('input:radio[name="ColorRadioGroup"]').filter('[value="1"]').attr('checked', true);

    //check color
    var selectedVal = "";
    var selectedVal1 = "";

    $scope.check = function () {
      var selected = $("input[type='radio'][name='ColorRadioGroup']:checked");
      if (selected.length > 0) {
        selectedVal = selected.val();
        $scope.selectedVal = selected.val();
      }
      $scope.listKT = [];
      var params = {
        IdProduct: id,
        IdColor: selectedVal,
      };
      $http({
        method: "GET",
        url: "http://localhost:8080/api/productdetail_color_size/getbycolor",
        params: params,
      }).then(function (resp) {
        $scope.listKT = resp.data;
      });

      $http({
        method: "GET",
        url: "http://localhost:8080/api/productdetail_color_size/getQuantityProductAndColor",
        params: params,
      }).then(function (resp) {
        $scope.quantity = resp.data;
      });

      $scope.checkSize = function () {
        var selected1 = $("input[type='radio'][name='SizeRadioGroup']:checked");
        if (selected1.length > 0) {
          selectedVal1 = selected1.val();
          $scope.selectedVal1 = selected1.val();
        }
        var params = {
          IdProduct: id,
          IdColor: selectedVal,
          IdSize: selectedVal1,
        };
        $http({
          method: "GET",
          url: "http://localhost:8080/api/productdetail_color_size/getQuantityProductAndColorAndSize",
          params: params,
        }).then(function (resp) {
          $scope.quantity = resp.data;
        });
      };
    };

    //thêm sản phẩm vào giỏ hàng
    $scope.addToCart = function () {
      if (selectedVal === "") {
        Swal.fire("Vui lòng chọn màu sắc !!", "", "error");
        return;
      }
      if (selectedVal1 === "") {
        Swal.fire("Vui lòng chọn kích thước !!", "", "error");
        return;
      }
      let soLuong = document.getElementById("Quantity").value;
      if (soLuong.length === 0) {
        Swal.fire("Số lượng không được bỏ trống !!", "", "error");
        document.getElementById("Quantity").value = 1;
        return;
      }

      if (soLuong <= 0) {
        Swal.fire("Số lượng phải lớn hơn 0 !!", "", "error");
        document.getElementById("Quantity").value = 1;
        return;
      }

      if ($scope.quantity < soLuong) {
        Swal.fire(
          "Số lượng bạn thêm đang vượt quá số lượng còn hàng !!",
          "",
          "error"
        );
        return;
      }

      var numberRegex = /^[0-9]+$/;
      if (!numberRegex.test(soLuong)) {
        Swal.fire("Số lượng phải là số !!", "", "error");
        document.getElementById("Quantity").value = 1;
        return;
      }

      $http
        .get("http://localhost:8080/api/product/" + id)
        .then(function (response) {
          var unitPrice = 0;
          if (response.data.discount > 0) {
            unitPrice =
              response.data.price -
              response.data.price * (response.data.discount * 0.01);
            $scope.unitPrice = unitPrice;
          } else {
            unitPrice = response.data.price;
            $scope.unitPrice = unitPrice;
          }
          //get cart by user
          $scope.listCart = [];
          $http.get("http://localhost:8080/api/cart/1").then(function (cart) {
            $scope.listCart = cart.data;
            // add to cart
            if ($scope.listCart.length === 0) {
              $http
                .post("http://localhost:8080/api/cart", {
                  idCart: 1,
                  idProductDetail: id,
                  idColor: selectedVal,
                  idSize: selectedVal1,
                  quantity: soLuong,
                  unitPrice: unitPrice,
                })
                .then(function (cart) {
                  if (cart.status === 200) {
                    Swal.fire("Đã thêm vào giỏ !!", "", "success");
                  }
                });
            }
            //check list cart by user
            if ($scope.listCart.length > 0) {
              for (let i = 0; i < $scope.listCart.length; i++) {
                // if product in cart
                if (
                  $scope.listCart[i].productDetail.id == id &&
                  $scope.listCart[i].idColor == selectedVal &&
                  $scope.listCart[i].idSize == selectedVal1
                ) {
                  if ($scope.listCart[i].quantity >= $scope.quantity) {
                    Swal.fire(
                      "Bạn đã thêm số lượng tối đa hiện có của sản phẩm vào giỏ hàng !!",
                      "",
                      "error"
                    );
                    return;
                  }

                  $http
                    .put(
                      "http://localhost:8080/api/cart/updateCart/" +
                        $scope.listCart[i].id,
                      {
                        idCart: 1,
                        idProductDetail: id,
                        idColor: selectedVal,
                        idSize: selectedVal1,
                        quantity:
                          parseInt(soLuong) +
                          parseInt($scope.listCart[i].quantity),
                        unitPrice: unitPrice,
                      }
                    )
                    .then(function (cart) {
                      if (cart.status === 200) {
                        Swal.fire("Đã thêm vào giỏ !!", "", "success");
                      }
                    });
                  return;
                }
              }
              // add to cart
              $http
                .post("http://localhost:8080/api/cart", {
                  idCart: 1,
                  idProductDetail: id,
                  idColor: selectedVal,
                  idSize: selectedVal1,
                  quantity: soLuong,
                  unitPrice: unitPrice,
                })
                .then(function (cart) {
                  if (cart.status === 200) {
                    Swal.fire("Đã thêm vào giỏ !!", "", "success");
                  }
                });
            }
          });
        });
    };
  };
  $scope.detail();
  $scope.loadCart = function () {
    //load cart by user
    $scope.listCart = [];
    $http.get("http://localhost:8080/api/cart/1").then(function (cart) {
      $scope.listCart = cart.data;
      $scope.tongTien = 0;
      for (let i = 0; i < $scope.listCart.length; i++) {
        $scope.tongTien +=
          $scope.listCart[i].unitPrice * $scope.listCart[i].quantity;
      }
    });

    //delete product from cart
    $scope.deleteByCart = function (id) {
      Swal.fire({
        title: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng ?",
        showCancelButton: true,
        confirmButtonText: "Xóa",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          $http.delete("http://localhost:8080/api/cart/" + id);
          Swal.fire("Đã xóa khỏi giỏ hàng !", "", "success");
          setTimeout(() => {
            location.href = "#cart";
          }, 100);
        }
      });
    };

    //giảm số lượng trong cart
    $scope.giam = function (idCartDetail, idProductDetail, idColor, idSize) {
      var getQuanity = parseInt(
        document.getElementById("qty" + idCartDetail).value
      );
      getQuanity = getQuanity - 1;
      //nếu product về số lượng là 0 thì check có thể xóa
      if (getQuanity <= 0) {
        $scope.deleteByCart(idCartDetail);
        getQuanity = 1;
        return;
      }
      //get đơn giá ở thời điểm hiện tại
      $http
        .get("http://localhost:8080/api/product/" + idProductDetail)
        .then(function (response) {
          var unitPrice = 0;
          if (response.data.discount > 0) {
            unitPrice =
              response.data.price -
              response.data.price * (response.data.discount * 0.01);
          } else {
            unitPrice = response.data.price;
          }

          // nếu thỏa mãn thì giảm số lượng trong giỏ hàng
          $http
            .put("http://localhost:8080/api/cart/updateCart/" + idCartDetail, {
              idCart: 1,
              idProductDetail: idProductDetail,
              idColor: idColor,
              idSize: idSize,
              quantity: getQuanity,
              unitPrice: unitPrice,
            })
            .then(function (cart) {
              if (cart.status === 200) {
                //load lại sau khi giảm thành công !
                $scope.loadCart();
              }
            });
        });
    };
    // tăng số lượng trong giỏ
    $scope.tang = function (idCartDetail, idProductDetail, idColor, idSize) {
      // check số lượng của sản phẩm đang còn
      var params = {
        IdProduct: idProductDetail,
        IdColor: idColor,
        IdSize: idSize,
      };
      $http({
        method: "GET",
        url: "http://localhost:8080/api/productdetail_color_size/getQuantityProductAndColorAndSize",
        params: params,
      }).then(function (resp) {
        $scope.quantity = resp.data;

        if (
          document.getElementById("qty" + idCartDetail).value >= $scope.quantity
        ) {
          Swal.fire(
            "Số lượng đã đến mức tối đa số lượng sản phẩm hiện có !",
            "",
            "error"
          );
          return;
        }
        document.getElementById("qty" + idCartDetail).value =
          parseInt(document.getElementById("qty" + idCartDetail).value) + 1;

        //get đơn giá ở thời điểm hiện tại
        $http
          .get("http://localhost:8080/api/product/" + idProductDetail)
          .then(function (response) {
            var unitPrice = 0;
            if (response.data.discount > 0) {
              unitPrice =
                response.data.price -
                response.data.price * (response.data.discount * 0.01);
            } else {
              unitPrice = response.data.price;
            }

            // nếu thỏa mãn thì tăng số lượng trong giỏ hàng
            $http
              .put(
                "http://localhost:8080/api/cart/updateCart/" + idCartDetail,
                {
                  idCart: 1,
                  idProductDetail: idProductDetail,
                  idColor: idColor,
                  idSize: idSize,
                  quantity: parseInt(
                    document.getElementById("qty" + idCartDetail).value
                  ),
                  unitPrice: unitPrice,
                }
              )
              .then(function (cart) {
                if (cart.status === 200) {
                  //load lại sau khi tăng thành công !
                  $scope.loadCart();
                }
              });
          });
      });
    };

    $scope.EnterQuantity = function (
      idCartDetail,
      idProductDetail,
      idColor,
      idSize
    ) {
      var numberRegex = /^[0-9]+$/;
      if (
        !numberRegex.test(document.getElementById("qty" + idCartDetail).value)
      ) {
        Swal.fire("Số lượng phải là số nguyên dương !!", "", "error");
        $http
          .get(
            "http://localhost:8080/api/cart/getQuantityByCartDetail/" +
              idCartDetail
          )
          .then(function (resp) {
            document.getElementById("qty" + idCartDetail).value = resp.data;
          });
        return;
      }
      var params = {
        IdProduct: idProductDetail,
        IdColor: idColor,
        IdSize: idSize,
      };
      $http({
        method: "GET",
        url: "http://localhost:8080/api/productdetail_color_size/getQuantityProductAndColorAndSize",
        params: params,
      }).then(function (resp) {
        $scope.quantity = resp.data;

        if (
          document.getElementById("qty" + idCartDetail).value > $scope.quantity
        ) {
          Swal.fire(
            "Số lượng đã đến mức tối đa số lượng sản phẩm hiện có !",
            "",
            "error"
          );
          $http
            .get(
              "http://localhost:8080/api/cart/getQuantityByCartDetail/" +
                idCartDetail
            )
            .then(function (resp) {
              document.getElementById("qty" + idCartDetail).value = resp.data;
            });
        } else {
          //get đơn giá ở thời điểm hiện tại
          $http
            .get("http://localhost:8080/api/product/" + idProductDetail)
            .then(function (response) {
              var unitPrice = 0;
              if (response.data.discount > 0) {
                unitPrice =
                  response.data.price -
                  response.data.price * (response.data.discount * 0.01);
              } else {
                unitPrice = response.data.price;
              }

              // nếu thỏa mãn thì tăng số lượng trong giỏ hàng
              $http
                .put(
                  "http://localhost:8080/api/cart/updateCart/" + idCartDetail,
                  {
                    idCart: 1,
                    idProductDetail: idProductDetail,
                    idColor: idColor,
                    idSize: idSize,
                    quantity: parseInt(
                      document.getElementById("qty" + idCartDetail).value
                    ),
                    unitPrice: unitPrice,
                  }
                )
                .then(function (cart) {
                  if (cart.status === 200) {
                    //load lại sau khi tăng thành công !
                    $scope.loadCart();
                  }
                });
            });
        }
      });
    };
  };
  $scope.loadCart();

  //trang thanh toán
  $scope.checkOut = function () {
    $scope.listAddress = [];
    //load address by user
    $http.get("http://localhost:8080/api/address/1").then(function (address) {
      $scope.listAddress = address.data;
      let idAddress = address.data[0].id;
      //load cart by user
      $http.get("http://localhost:8080/api/cart/1").then(function (cart) {
        let TotalPrice = 0;

        let TotalGam = 0;
        for (let i = 0; i < cart.data.length; i++) {
          TotalPrice +=
            parseFloat(cart.data[i].unitPrice) *
            parseFloat(cart.data[i].quantity);
        }
        for (let i = 0; i < cart.data.length; i++) {
          TotalGam += cart.data[i].productDetail.weight * cart.data[i].quantity;
        }

        // lấy thông tin địa chỉ giao hàng
        $http
          .get("http://localhost:8080/api/address/get/" + idAddress)
          .then(function (resp) {
            var params = {
              service_type_id: 2,
              insurance_value: parseInt(TotalPrice),
              coupon: null,
              from_district_id: 1482,
              to_district_id: resp.data.districtId,
              to_ward_code: resp.data.wardId,
              height: 0,
              length: 0,
              weight: parseInt(TotalGam),
              width: 0,
            };
            // get phí ship từ GHN
            $http({
              method: "GET",
              url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
              params: params,
              headers: {
                "Content-Type": undefined,
                token: "f22a8bb9-632c-11ee-b394-8ac29577e80e",
                shop_id: 4603004,
              },
            }).then(function (ship) {
              $scope.phiShip = ship.data.data.total;
              $scope.tienThanhToan = TotalPrice + ship.data.data.total;

              // dat hang
              $scope.buy = function () {
                Swal.fire({
                  title: "Xác nhận đặt hàng ?",
                  showCancelButton: true,
                  confirmButtonText: "Đặt",
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    var typePay = document.getElementById("typePay").value;
                    //nếu chọn thanh toán tại nhà
                    if (typePay === "pay1") {
                      //check số lượng còn hàng trước khi cho đặt hàng
                      $http
                        .get("http://localhost:8080/api/cart/1")
                        .then(function (CheckCart) {
                          for (let i = 0; i < CheckCart.data.length; i++) {
                            //get số lượng sản phẩm đang có
                            var getPram = {
                              IdProduct: CheckCart.data[i].productDetail.id,
                              IdColor: CheckCart.data[i].idColor,
                              IdSize: CheckCart.data[i].idSize,
                            };

                            $http({
                              method: "GET",
                              url: "http://localhost:8080/api/productdetail_color_size/getQuantityProductAndColorAndSize",
                              params: getPram,
                            }).then(function (resp) {
                              if (CheckCart.data[i].quantity > resp.data) {
                                Swal.fire(
                                  "Số lượng sản phẩm " + CheckCart.data[i].productDetail.product.name + " không đủ ! Số lượng sản phẩm này trong giỏ hàng của bạn sẽ được cập nhật về số lượng hiện có !",
                                  "",
                                  "error"
                                );
                                // cập lại số lượng hiện có vào giỏ hàng
                                $http
                                  .put(
                                    "http://localhost:8080/api/cart/updateCart/" +
									CheckCart.data[i].id,
                                    {
                                      idCart: 1,
                                      idProductDetail:  CheckCart.data[i].productDetail.id,
                                      idColor: CheckCart.data[i].idColor,
                                      idSize: CheckCart.data[i].idSize,
                                      quantity: resp.data,
                                      unitPrice: CheckCart.data[i].unitPrice,
                                    }
                                  )
                                  .then(function (cart) {
                                    if (cart.status === 200) {
                                      //load lại sau khi tăng thành công !
                                      $scope.loadCart();
                                    }
                                  });
                                return;
                              }
							  // nếu số lượng hết thì xóa khỏi giỏ hàng
							  if(resp.data === 0){
								Swal.fire("Số lượng sản phẩm " + CheckCart.data[i].productDetail.product.name+" đã hết ! Sản phẩm sẽ được xóa khỏi giỏ hàng" , "", "success");
								$http.delete("http://localhost:8080/api/cart/" + CheckCart.data[i].id);
								$scope.loadCart();
								return;
							  }

                              // add bill
                              $http
                                .post("http://localhost:8080/api/bill", {
                                  totalPrice: TotalPrice,
                                  shipPrice: ship.data.data.total,
                                  totalPriceLast: TotalPrice,
                                  note: document.getElementById("note").value,
                                  payType: 1,
                                  payStatus: 0,
                                  idCoupon: 0,
                                  idAddress: idAddress,
                                  idCustomer: 1,
                                })
                                .then(function (bill) {
                                  $http
                                    .get("http://localhost:8080/api/cart/1")
                                    .then(function (CartToBill) {
                                      for (
                                        let i = 0;
                                        i < CartToBill.data.length;
                                        i++
                                      ) {
                                        $http
                                          .post(
                                            "http://localhost:8080/api/bill/addBillDetail",
                                            {
                                              // add bill detail
                                              idBill: bill.data.id,
                                              idProductDetail:
                                                CartToBill.data[i].productDetail
                                                  .id,
                                              idColor:
                                                CartToBill.data[i].idColor,
                                              idSize: CartToBill.data[i].idSize,
                                              quantity:
                                                CartToBill.data[i].quantity,
                                              unitPrice:
                                                CartToBill.data[i].unitPrice,
                                            }
                                          )
                                          .then(function (billdetail) {
                                            //xóa giỏ hàng by user
                                            $http.delete(
                                              "http://localhost:8080/api/cart/deleteAllCart/1"
                                            );

                                            //get số lượng sản phẩm đang có
                                            var getPram = {
                                              IdProduct:
                                                CartToBill.data[i].productDetail
                                                  .id,
                                              IdColor:
                                                CartToBill.data[i].idColor,
                                              IdSize: CartToBill.data[i].idSize,
                                            };
                                            $http({
                                              method: "GET",
                                              url: "http://localhost:8080/api/productdetail_color_size/getQuantityProductAndColorAndSize",
                                              params: getPram,
                                            }).then(function (resp) {
                                              var param2 = {
                                                IdProduct:
                                                  CartToBill.data[i]
                                                    .productDetail.id,
                                                IdColor:
                                                  CartToBill.data[i].idColor,
                                                IdSize:
                                                  CartToBill.data[i].idSize,
                                                Quantity:
                                                  parseInt(resp.data) -
                                                  parseInt(
                                                    CartToBill.data[i].quantity
                                                  ),
                                              };
                                              $http({
                                                method: "PUT",
                                                url: "http://localhost:8080/api/productdetail_color_size/updateQuantity",
                                                params: param2,
                                              }).then(function (resp) {
                                                Swal.fire(
                                                  "Đặt hàng thành công !",
                                                  "",
                                                  "success"
                                                );

                                                $location.path("#/checkout");
                                              });
                                            });
                                          });
                                      }
                                    });
                                });
                            });
                          }
                        });
                    } else if (typePay === "pay2") {
                    } else {
                      Swal.fire("Có lỗi xảy ra !", "", "error");
                    }
                  }
                });
              };
            });
          });
      });

      //thay đổi địa chỉ giao hàng
      $scope.changeAddress = function () {
        let idAddress = document.getElementById("idAddress").value;
        //load cart by user
        $http.get("http://localhost:8080/api/cart/1").then(function (cart) {
          let TotalPrice = 0;

          let TotalGam = 0;
          for (let i = 0; i < cart.data.length; i++) {
            TotalPrice +=
              parseFloat(cart.data[i].unitPrice) *
              parseFloat(cart.data[i].quantity);
          }
          for (let i = 0; i < cart.data.length; i++) {
            TotalGam +=
              cart.data[i].productDetail.weight * cart.data[i].quantity;
          }

          // lấy thông tin địa chỉ giao hàng
          $http
            .get("http://localhost:8080/api/address/get/" + idAddress)
            .then(function (resp) {
              var params = {
                service_type_id: 2,
                insurance_value: parseInt(TotalPrice),
                coupon: null,
                from_district_id: 1482,
                to_district_id: resp.data.districtId,
                to_ward_code: resp.data.wardId,
                height: 0,
                length: 0,
                weight: parseInt(TotalGam),
                width: 0,
              };
              // get phí ship từ GHN
              $http({
                method: "GET",
                url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
                params: params,
                headers: {
                  "Content-Type": undefined,
                  token: "f22a8bb9-632c-11ee-b394-8ac29577e80e",
                  shop_id: 4603004,
                },
              }).then(function (resp) {
                $scope.phiShip = resp.data.data.total;
                $scope.tienThanhToan = TotalPrice + resp.data.data.total;
              });
            });
        });
      };
    });
  };

  $scope.checkOut();

  /*********************************************************************************

	Template Name: Belle - Multipurpose eCommerce Bootstrap4 HTML Template
	Description: A perfect template to build beautiful and unique Glasses websites. It comes with nice and clean design.
	Version: 1.0

**********************************************************************************/

  /*************************************************
  1. Preloader Loading
  2. Promotional Bar Header
  3. Currency Show/Hide dropdown  
  4. Language Show/Hide dropdown
  5. Top Links Show/Hide dropdown
  6. Minicart Dropdown
  7. Sticky Header
  8. Search Trigger
  9. Mobile Menu
  10 Slick Slider
	 10.1 Homepage Slideshow 
	 10.2 Product Slider Slick
	 10.3 Product Slider Slick Style2
	 10.4 Product Slider Slick Style3
	 10.5 Product Slider Slick Fullwidth
	 10.6 Product Slider Slick Product Page
	 10.7 Collection Slider Slick
	 10.8 Collection Slider Slick 4 items
	 10.9 Logo Slider Slick
	 10.10 Testimonial Slider Slick
  11. Tabs With Accordian Responsive
  12. Sidebar Categories Level links
  13. Price Range Slider
  14. Color Swacthes
  15. Footer links for mobiles
  16. Site Animation
  17. SHOW HIDE PRODUCT TAG
  18. SHOW HIDE PRODUCT Filters
  19. Timer Count Down
  20. Scroll Top
  21. Height Product Grid Image
  22. Product details slider 2
  23. Product details slider 1
  24. Product Zoom
  25. Product Page Popup
  26. Quantity Plus Minus
  27. Visitor Fake Message
  28. Product Tabs
  29. Promotion / Notification Cookie Bar 
  30. Image to background js
  31. COLOR SWATCH ON COLLECTION PAGE
  32. Related Product Slider
  33. Infinite Scroll js
*************************************************/

  (function ($) {
    // Start of use strict
    "use strict";

    /*-----------------------------------------
	  1. Preloader Loading ----------------------- 
	  -----------------------------------------*/
    function pre_loader() {
      $("#load").fadeOut();
      $("#pre-loader").delay(0).fadeOut("slow");
    }
    pre_loader();

    /*-----------------------------------------
	 2. Promotional Bar Header ------------------
	  -----------------------------------------*/
    function promotional_bar() {
      $(".closeHeader").on("click", function () {
        $(".promotion-header").slideUp();
        Cookies.set("promotion", "true", { expires: 1 });
        return false;
      });
    }
    promotional_bar();

    /*-----------------------------------------
	 3. Currency Show/Hide dropdown -----------
	  -----------------------------------------*/
    function currency_dropdown() {
      $(".selected-currency").on("click", function () {
        $("#currencies").slideToggle();
      });
      $("#currencies li").on("click", function () {
        $(this).parent().slideUp();
      });
    }
    currency_dropdown();

    /*-----------------------------------------
	  4. Language Show/Hide dropdown ----------
	  -----------------------------------------*/
    function language_dropdown() {
      $(".language-dd").on("click", function () {
        $("#language").slideToggle();
      });
      $("#language li").on("click", function () {
        $(this).parent().slideUp();
      });
    }
    language_dropdown();

    /*-----------------------------------------
	  5. Top Links Show/Hide dropdown ---------
	  -----------------------------------------*/
    function userlink_dropdown() {
      $(".top-header .user-menu").on("click", function () {
        if ($(window).width() < 990) {
          $(this).next().slideToggle(300);
          $(this).parent().toggleClass("active");
        }
      });
    }
    userlink_dropdown();

    /*-----------------------------------------
	  6. Minicart Dropdown ---------------------
	  ------------------------------------------ */
    function minicart_dropdown() {
      $(".site-header__cart").on("click", function (i) {
        i.preventDefault();
        $("#header-cart").slideToggle();
      });
      // Hide Cart on document click
      $("body").on("click", function (event) {
        var $target = $(event.target);
        if (!$target.parents().is(".site-cart") && !$target.is(".site-cart")) {
          $("body").find("#header-cart").slideUp();
        }
      });
    }
    minicart_dropdown();
    /*-----------------------------------------
	  6. Login Dropdown ---------------------
	  ------------------------------------------ */
    function login_dropdown() {
      $(".site-header__login").on("click", function (i) {
        i.preventDefault();
        $("#header-login").slideToggle();
      });
      // Hide Cart on document click
      $("body").on("click", function (event) {
        var $target = $(event.target);
        if (
          !$target.parents().is(".site-login") &&
          !$target.is(".site-login")
        ) {
          $("body").find("#header-login").slideUp();
        }
      });
    }
    login_dropdown();

    /*-----------------------------------------
	  7. Sticky Header ------------------------
	  -----------------------------------------*/
    window.onscroll = function () {
      myFunction();
    };
    function myFunction() {
      if ($(window).width() > 1199) {
        if ($(window).scrollTop() > 145) {
          $(".header-wrap").addClass("stickyNav animated fadeInDown");
        } else {
          $(".header-wrap").removeClass("stickyNav fadeInDown");
        }
      }
    }

    /*-----------------------------------------
	  8. Search Trigger -----------------------
	  ----------------------------------------- */
    function search_bar() {
      $(".search-trigger").on("click", function () {
        const search = $(".search");

        if (search.is(".search--opened")) {
          search.removeClass("search--opened");
        } else {
          search.addClass("search--opened");
          $(".search__input")[0].focus();
        }
      });
    }
    search_bar();
    $(document).on("click", function (event) {
      if (!$(event.target).closest(".search, .search-trigger").length) {
        $(".search").removeClass("search--opened");
      }
    });

    /*-----------------------------------------
	  9. Mobile Menu --------------------------
	  -----------------------------------------*/
    var selectors = {
      body: "body",
      sitenav: "#siteNav",
      navLinks: "#siteNav .lvl1 > a",
      menuToggle: ".js-mobile-nav-toggle",
      mobilenav: ".mobile-nav-wrapper",
      menuLinks: "#MobileNav .anm",
      closemenu: ".closemobileMenu",
    };

    $(selectors.navLinks).each(function () {
      if ($(this).attr("href") == window.location.pathname)
        $(this).addClass("active");
    });

    $(selectors.menuToggle).on("click", function () {
      body: "body", $(selectors.mobilenav).toggleClass("active");
      $(selectors.body).toggleClass("menuOn");
      $(selectors.menuToggle).toggleClass("mobile-nav--open mobile-nav--close");
    });

    $(selectors.closemenu).on("click", function () {
      body: "body", $(selectors.mobilenav).toggleClass("active");
      $(selectors.body).toggleClass("menuOn");
      $(selectors.menuToggle).toggleClass("mobile-nav--open mobile-nav--close");
    });
    $("body").on("click", function (event) {
      var $target = $(event.target);
      if (
        !$target.parents().is(selectors.mobilenav) &&
        !$target.parents().is(selectors.menuToggle) &&
        !$target.is(selectors.menuToggle)
      ) {
        $(selectors.mobilenav).removeClass("active");
        $(selectors.body).removeClass("menuOn");
        $(selectors.menuToggle)
          .removeClass("mobile-nav--close")
          .addClass("mobile-nav--open");
      }
    });
    $(selectors.menuLinks).on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("anm-plus-l anm-minus-l");
      $(this).parent().next().slideToggle();
    });

    /*-----------------------------------------
	  10.1 Homepage Slideshow -----------------
	  -----------------------------------------*/
    function home_slider() {
      $(".home-slideshow").slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        lazyLoad: "ondemand",
      });
    }
    home_slider();

    // Full Size Banner on the Any Screen
    $(window)
      .resize(function () {
        var bodyheight = $(this).height() - 20;
        $(".sliderFull .bg-size").height(bodyheight);
      })
      .resize();

    /*-----------------------------------------
	  10.2 Product Slider Slick ---------------
	  -----------------------------------------*/
    function product_slider() {
      $(".productSlider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
    product_slider();

    /*-----------------------------------------
	  10.3 Product Slider Slick Style2 --------
	  -----------------------------------------*/
    function product_slider1() {
      $(".productSlider-style1").slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
    product_slider1();

    /*-----------------------------------------
	  10.4 Product Slider Slick Style3 --------
	  -----------------------------------------*/
    function product_slider2() {
      $(".productSlider-style2").slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
    product_slider2();

    /*-----------------------------------------
	  10.5 Product Slider Slick Fullwidth -----
	  ----------------------------------------- */
    function product_slider_full() {
      $(".productSlider-fullwidth").slick({
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
    product_slider_full();

    /*-----------------------------------------
	  10.6 Product Slider Slick Product Page --
	  ----------------------------------------- */
    function product_slider_ppage() {
      $(".productPageSlider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 680,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 380,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
    product_slider_ppage();

    /*-----------------------------------------
	  10.7 Collection Slider Slick ------------
	  ----------------------------------------- */
    function collection_slider() {
      $(".collection-grid").slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
    collection_slider();

    /*-----------------------------------------
	  10.8 Collection Slider Slick 4 items ----
	  ----------------------------------------- */
    function collection_slider1() {
      $(".collection-grid-4item").slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
    collection_slider1();

    /*-----------------------------------------
	  10.9 Logo Slider Slick ------------------
	  -----------------------------------------*/
    function logo_slider() {
      $(".logo-bar").slick({
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
    logo_slider();

    /*-----------------------------------------
	  10.10 Testimonial Slider Slick ----------
	  -----------------------------------------*/
    function testimonial_slider() {
      $(".quotes-slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      });
    }
    testimonial_slider();

    /*-----------------------------------
	  11. Tabs With Accordian Responsive
	-------------------------------------*/
    $(".tab_content").hide();
    $(".tab_content:first").show();

    /* if in tab mode */
    $("ul.tabs li").on("click", function () {
      $(".tab_content").hide();
      var activeTab = $(this).attr("rel");
      $("#" + activeTab).fadeIn();

      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");

      $(".tab_drawer_heading").removeClass("d_active");
      $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");

      $(".productSlider").slick("refresh");
    });
    /* if in drawer mode */
    $(".tab_drawer_heading").on("click", function () {
      $(".tab_content").hide();
      var d_activeTab = $(this).attr("rel");
      $("#" + d_activeTab).fadeIn();

      $(".tab_drawer_heading").removeClass("d_active");
      $(this).addClass("d_active");

      $("ul.tabs li").removeClass("active");
      $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");

      $(".productSlider").slick("refresh");
    });

    $("ul.tabs li").last().addClass("tab_last");

    /*-----------------------------------
	  End Tabs With Accordian Responsive
	-------------------------------------*/

    /*-----------------------------------
	  12. Sidebar Categories Level links
	-------------------------------------*/
    function categories_level() {
      $(".sidebar_categories .sub-level a").on("click", function () {
        $(this).toggleClass("active");
        $(this).next(".sublinks").slideToggle("slow");
      });
    }
    categories_level();

    $(".filter-widget .widget-title").on("click", function () {
      $(this).next().slideToggle("300");
      $(this).toggleClass("active");
    });

    /*-----------------------------------
	 13. Price Range Slider
	-------------------------------------*/
    function price_slider() {
      $("#slider-range").slider({
        range: true,
        min: 12,
        max: 200,
        values: [0, 100],
        slide: function (event, ui) {
          $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        },
      });
      $("#amount").val(
        "$" +
          $("#slider-range").slider("values", 0) +
          " - $" +
          $("#slider-range").slider("values", 1)
      );
    }
    price_slider();

    /*-----------------------------------
	 14. Color Swacthes
	-------------------------------------*/
    function color_swacthes() {
      $.each($(".swacth-list"), function () {
        var n = $(".swacth-btn");
        n.on("click", function () {
          $(this).parent().find(n).removeClass("checked");
          $(this).addClass("checked");
        });
      });
    }
    color_swacthes();

    /*-----------------------------------
	  15. Footer links for mobiles
	-------------------------------------*/
    function footer_dropdown() {
      $(".footer-links .h4").on("click", function () {
        if ($(window).width() < 766) {
          $(this).next().slideToggle();
          $(this).toggleClass("active");
        }
      });
    }
    footer_dropdown();

    //Resize Function
    var resizeTimer;
    $(window).resize(function (e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        $(window).trigger("delayed-resize", e);
      }, 250);
    });
    $(window).on("load resize", function (e) {
      if ($(window).width() > 766) {
        $(".footer-links ul").show();
      } else {
        $(".footer-links ul").hide();
      }
    });

    /*-------------------------------
	  16. Site Animation
	----------------------------------*/
    if ($(window).width() < 771) {
      $(".wow").removeClass("wow");
    }
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: false, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
      callback: function (box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null, // optional scroll container selector, otherwise use window
    });
    wow.init();

    /*-------------------------------
	  17. SHOW HIDE PRODUCT TAG
	----------------------------------*/
    $(".product-tags li").eq(10).nextAll().hide();
    $(".btnview").on("click", function () {
      $(".product-tags li").not(".filter--active").show();
      $(this).hide();
    });

    /*-------------------------------
	  18. SHOW HIDE PRODUCT Filters
	----------------------------------*/
    $(".btn-filter").on("click", function () {
      $(".filterbar").toggleClass("active");
    });
    $(".closeFilter").on("click", function () {
      $(".filterbar").removeClass("active");
    });
    // Hide Cart on document click
    $("body").on("click", function (event) {
      var $target = $(event.target);
      if (!$target.parents().is(".filterbar") && !$target.is(".btn-filter")) {
        $(".filterbar").removeClass("active");
      }
    });

    /*-------------------------------
	 19. Timer Count Down
	----------------------------------*/
    $("[data-countdown]").each(function () {
      var $this = $(this),
        finalDate = $(this).data("countdown");
      $this.countdown(finalDate, function (event) {
        $this.html(
          event.strftime(
            '<span class="ht-count days"><span class="count-inner"><span class="time-count">%-D</span> <span>Days</span></span></span> <span class="ht-count hour"><span class="count-inner"><span class="time-count">%-H</span> <span>HR</span></span></span> <span class="ht-count minutes"><span class="count-inner"><span class="time-count">%M</span> <span>Min</span></span></span> <span class="ht-count second"><span class="count-inner"><span class="time-count">%S</span> <span>Sc</span></span></span>'
          )
        );
      });
    });

    /*-------------------------------
	 20.Scroll Top ------------------
	---------------------------------*/
    function scroll_top() {
      $("#site-scroll").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
      });
    }
    scroll_top();

    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $("#site-scroll").fadeIn();
      } else {
        $("#site-scroll").fadeOut();
      }
    });

    /*-------------------------------
	  21. Height Product Grid Image
	----------------------------------*/
    function productGridView() {
      var gridRows = [];
      var tempRow = [];
      productGridElements = $(".grid-products .item");
      productGridElements.each(function (index) {
        if ($(this).css("clear") != "none" && index != 0) {
          gridRows.push(tempRow);
          tempRow = [];
        }
        tempRow.push(this);

        if (productGridElements.length == index + 1) {
          gridRows.push(tempRow);
        }
      });

      $.each(gridRows, function () {
        var tallestHeight = 0;
        var tallestHeight1 = 0;
        $.each(this, function () {
          $(this).find(".product-image > a").css("height", "");
          elHeight = parseInt($(this).find(".product-image").css("height"));
          if (elHeight > tallestHeight) {
            tallestHeight = elHeight;
          }
        });

        $.each(this, function () {
          if ($(window).width() > 768) {
            $(this).find(".product-image > a").css("height", tallestHeight);
          }
        });
      });
    }

    /*----------------------------
       22. Product details slider 2
    ------------------------------ */
    function product_thumb() {
      $(".product-dec-slider-2").slick({
        infinite: true,
        slidesToShow: 5,
        vertical: true,
        slidesToScroll: 1,
        centerPadding: "60px",
      });
    }
    product_thumb();

    /*----------------------------
       23. Product details slider 1
    ------------------------------ */
    function product_thumb1() {
      $(".product-dec-slider-1").slick({
        infinite: true,
        slidesToShow: 6,
        stageMargin: 5,
        slidesToScroll: 1,
      });
    }
    product_thumb1();

    /*--------------------------
      24. Product Zoom
	---------------------------- */
    function product_zoom() {
      $(".zoompro").elevateZoom({
        gallery: "gallery",
        galleryActiveClass: "active",
        zoomWindowWidth: 300,
        zoomWindowHeight: 100,
        scrollZoom: false,
        zoomType: "inner",
        cursor: "crosshair",
      });
    }
    product_zoom();

    /*--------------------------
      25. Product Page Popup ---
	---------------------------- */
    function video_popup() {
      if ($(".popup-video").length) {
        $(".popup-video").magnificPopup({
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false,
        });
      }
    }
    video_popup();

    function size_popup() {
      $(".sizelink").magnificPopup({
        type: "inline",
        midClick: true,
      });
    }
    size_popup();

    function inquiry_popup() {
      $(".emaillink").magnificPopup({
        type: "inline",
        midClick: true,
      });
    }
    inquiry_popup();

    /*----------------------------------
	  26. Quantity Plus Minus
	------------------------------------*/
    function qnt_incre() {
      $(".qtyBtn").on("click", function () {
        var qtyField = $(this).parent(".qtyField"),
          oldValue = $(qtyField).find(".qty").val(),
          newVal = 1;

        if ($(this).is(".plus")) {
          newVal = parseInt(oldValue) + 1;
        } else if (oldValue > 1) {
          newVal = parseInt(oldValue) - 1;
        }
        $(qtyField).find(".qty").val(newVal);
      });
    }
    qnt_incre();

    /*----------------------------------
	  27. Visitor Fake Message
	------------------------------------*/
    var userLimit = $(".userViewMsg").attr("data-user"),
      userTime = $(".userViewMsg").attr("data-time");
    $(".uersView").text(Math.floor(Math.random() * userLimit));
    setInterval(function () {
      $(".uersView").text(Math.floor(Math.random() * userLimit));
    }, userTime);

    /*----------------------------------
	  28. Product Tabs
	------------------------------------*/
    $(".tab-content").hide();
    $(".tab-content:first").show();
    /* if in tab mode */
    $(".product-tabs li").on("click", function () {
      $(".tab-content").hide();
      var activeTab = $(this).attr("rel");
      $("#" + activeTab).fadeIn();

      $(".product-tabs li").removeClass("active");
      $(this).addClass("active");

      $(this).fadeIn();
      if ($(window).width() < 767) {
        var tabposition = $(this).offset();
        $("html, body").animate({ scrollTop: tabposition.top }, 700);
      }
    });

    $(".product-tabs li:first-child").addClass("active");
    $(".tab-container h3:first-child + .tab-content").show();

    /* if in drawer mode */
    $(".acor-ttl").on("click", function () {
      $(".tab-content").hide();
      var activeTab = $(this).attr("rel");
      $("#" + activeTab).fadeIn();

      $(".acor-ttl").removeClass("active");
      $(this).addClass("active");
    });

    $(".reviewLink").on("click", function (e) {
      e.preventDefault();
      $(".product-tabs li").removeClass("active");
      $(".reviewtab").addClass("active");
      var tab = $(this).attr("href");
      $(".tab-content").not(tab).css("display", "none");
      $(tab).fadeIn();
      var tabposition = $("#tab2").offset();
      if ($(window).width() < 767) {
        $("html, body").animate({ scrollTop: tabposition.top - 50 }, 700);
      } else {
        $("html, body").animate({ scrollTop: tabposition.top - 80 }, 700);
      }
    });

    /*--------------------------------------
	  29. Promotion / Notification Cookie Bar 
	  -------------------------------------- */
    function cookie_promo() {
      if (Cookies.get("promotion") != "true") {
        $(".notification-bar").show();
      }
      $(".close-announcement").on("click", function () {
        $(".notification-bar").slideUp();
        Cookies.set("promotion", "true", { expires: 1 });
        return false;
      });
    }
    cookie_promo();
    /* --------------------------------------
	 	End Promotion / Notification Cookie Bar 
	 -------------------------------------- */

    /* --------------------------------------
	 	30. Image to background js
	 -------------------------------------- */
    $(".bg-top").parent().addClass("b-top");
    $(".bg-bottom").parent().addClass("b-bottom");
    $(".bg-center").parent().addClass("b-center");
    $(".bg-left").parent().addClass("b-left");
    $(".bg-right").parent().addClass("b-right");
    $(".bg_size_content").parent().addClass("b_size_content");
    $(".bg-img").parent().addClass("bg-size");
    $(".bg-img.blur-up").parent().addClass("");
    jQuery(".bg-img").each(function () {
      var el = $(this),
        src = el.attr("src"),
        parent = el.parent();

      parent.css({
        "background-image": "url(" + src + ")",
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat",
      });

      el.hide();
    });
    /* --------------------------------------
	 	End Image to background js
	 -------------------------------------- */

    /*----------------------------------
	32. Related Product Slider ---------
	------------------------------------*/
    function related_slider() {
      $(".related-product .productSlider").slick({
        dots: false,
        infinite: true,
        item: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
    related_slider();
    /*----------------------------------
	  End Related Product Slider
	  ------------------------------------*/

    /*-----------------------------------
	  33. Infinite Scroll js
	  -------------------------------------*/
    function load_more() {
      $(".product-load-more .item").slice(0, 16).show();
      $(".loadMore").on("click", function (e) {
        e.preventDefault();
        $(".product-load-more .item:hidden").slice(0, 4).slideDown();
        if ($(".product-load-more .item:hidden").length == 0) {
          $(".infinitpagin").html(
            '<div class="btn loadMore">no more products</div>'
          );
        }
      });
    }
    load_more();

    function load_more_post() {
      $(".blog--grid-load-more .article").slice(0, 3).show();
      $(".loadMorepost").on("click", function (e) {
        e.preventDefault();
        $(".blog--grid-load-more .article:hidden").slice(0, 1).slideDown();
        if ($(".blog--grid-load-more .article:hidden").length == 0) {
          $(".loadmore-post").html(
            '<div class="btn loadMorepost">No more Blog Post</div>'
          );
        }
      });
    }
    load_more_post();
    /*-----------------------------------
	  End Infinite Scroll js
	  -------------------------------------*/
  })(jQuery);
};
