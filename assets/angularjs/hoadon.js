window.HoaDonController = function($scope, $http, $location,$routeParams,$rootScope,$timeout){
    $scope.list = [];
    $http.get("http://localhost:8080/api/bill/getall").then(function(rest){
        $scope.list = rest.data;
        $scope.tatca = rest.data.length;
    })
    $http.get("http://localhost:8080/api/bill/getbystatus/0").then(function(rest){
      $scope.choxacnhan = rest.data.length;
  });
  $http.get("http://localhost:8080/api/bill/getbystatus/1").then(function(rest){
    $scope.chogiaohang = rest.data.length;
});
$http.get("http://localhost:8080/api/bill/getbystatus/2").then(function(rest){
  $scope.danggiaohang = rest.data.length;
});
$http.get("http://localhost:8080/api/bill/getbystatus/3").then(function(rest){
  $scope.dagiaohang = rest.data.length;
});
$http.get("http://localhost:8080/api/bill/getbystatus/4").then(function(rest){
  $scope.dahuy = rest.data.length;
});
$http.get("http://localhost:8080/api/bill/getbystatus/5").then(function(rest){
  $scope.doitra = rest.data.length;
});
    let urlcolor = "http://localhost:8080/api/color";
    let urlsize = "http://localhost:8080/api/size";
    let url = "http://localhost:8080/api/product";
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
 //load product
 $scope.listPro = [];
 $http.get(url).then(function (response) {
   $scope.listPro = response.data;
 });

 $scope.loc = function(status){
  $scope.list = [];
  if(status ===null){
    $http.get("http://localhost:8080/api/bill/getall").then(function(rest){
      $scope.list = rest.data;
  })
  }
  else{
    $http.get("http://localhost:8080/api/bill/getbystatus/"+status).then(function(rest){
      $scope.list = rest.data;
  });
  }
   
       // pagation
       $scope.pager = {
        page: 0,
        size: 10,
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
 }


                  // pagation
                  $scope.pager = {
                    page: 0,
                    size: 10,
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

                  $scope.redirect = function(code){
                    location.href = "#/bill/view/" +code;
                  }
                
                  let code = $routeParams.code ;
                  $scope.address = {};
                  $http.get("http://localhost:8080/api/address/getBill/"+code).then(function(resp){
                    $scope.address = resp.data;
                  })
                  $scope.listItem = [];
                  $http.get("http://localhost:8080/api/bill/getallbybill/"+code).then(function(resp){
                    $scope.listItem = resp.data;
                  })
                  $scope.bill = {};
                  $scope.billhistory = [];
                  $scope.getBill = function(){
                   
                   
                  
                 
                  $http.get("http://localhost:8080/api/bill/getbycode/"+code).then(function(resp){
                    $scope.bill = resp.data;
                    $http.get("http://localhost:8080/api/billhistory/"+code).then(function(resp1){
                      $scope.billhistory = resp1.data;
                      for(let i = 0 ; i < $scope.billhistory.length ; i++){
                        if($scope.billhistory[i].status === 10){
                         
                          $scope.nhanhVienTT = $scope.billhistory[i].createBy;
                          
                        }
                      }
                     
                      $scope.maxStatus = $scope.billhistory.reduce(function(max, obj) {
                        return Math.max(max, obj.status);
                      }, -Infinity);
                     
                      $scope.listItem = [];
                      $http.get("http://localhost:8080/api/bill/getallbybill/"+code).then(function(resp){
                        $scope.listItem = resp.data;
                      })
                      $http.get("http://localhost:8080/api/address/getBill/"+code).then(function(resp){
                        $scope.address = resp.data;
                      })
                    })
                     })

                  }
                  $scope.getBill();
                  $scope.timkiem = function(){
                    var text = document.getElementById("name").value;
                    var idColor = document.getElementById("mausac").value;
                    var idSize = document.getElementById("kichthuoc").value;
                    let idcolor = (idColor != '') ? idColor : null;
                    let idsize = (idSize != '') ? idSize : null;
                    let text1 = (text != '' ? text : null)
                  
                    
                    var param = {
                        keyword : text1,
                        idColor : idcolor,
                        idSize : idsize
    
                    }
                    $http({
                        method: "GET",
                        url: "http://localhost:8080/api/productdetail_color_size/getallbykeyword",
                        params: param
                      }).then(function (resp) {
                        $scope.listQuantity = resp.data;
                        // pagation
                $scope.pager1 = {
                  page: 0,
                  size: 8,
                  get items() {
                    var start = this.page * this.size;
                    return $scope.listQuantity.slice(start, start + this.size);
                  },
                  get count() {
                    return Math.ceil((1.0 * $scope.listQuantity.length) / this.size);
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
                      })
        
        
                  }


                     $scope.check = function(code,id){
                      if($scope.bill.status === 0){
                        Swal.fire({
                          title: "Xác nhận đơn hàng " +code +" ?",
                          inputLabel : 'Ghi chú',
                          input: 'textarea',
                          showCancelButton: true,
                          confirmButtonText: "Xác nhận",        
                      }).then((result) => {
                        if (result.isConfirmed) {
                          $http.post('http://localhost:8080/api/billhistory',{
                            createBy : $rootScope.user.username,
                            note : result.value,
                            status : 1,
                            idBill : id
                          }).then(function(resp){
                           
                            $http.put("http://localhost:8080/api/bill/updatestatusbill",{
                              code : code,
                              status : 1
                            }).then(function(re){
                              Swal.fire("Xác nhận thành công !","","success");
                            
                                $scope.getBill();
                            
                            })
                          
                           
                          })
                      
                       
                          
                        
                     
                    }
                      })
                      }
                      if($scope.bill.status === 1){
                        Swal.fire({
                          title: "Xác nhận đang giao hàng đơn hàng " +code +" ?",
                          inputLabel : 'Ghi chú',
                          input: 'textarea',
                          showCancelButton: true,
                          confirmButtonText: "Xác nhận",        
                      }).then((result) => {
                        if (result.isConfirmed) {
                        
                          $http.post('http://localhost:8080/api/billhistory',{
                            createBy : $rootScope.user.username,
                            note : result.value,
                            status : 2,
                            idBill : id
                          }).then(function(re){
                            $http.put("http://localhost:8080/api/bill/updatestatusbill",{
                              code : code,
                              status : 2
                            }).then(function(re){
                              Swal.fire("Xác nhận thành công !","","success");
                            
                                $scope.getBill();
                            
                            })
                           
                          })
                          
                 
                        
                       
                       
                        
                          
                     
                    }
                      })
                      }
                   
                     if($scope.bill.status === 2){
                      if($scope.bill.payStatus === 0){
                        Swal.fire("Vui lòng xác nhận thanh toán trước khi xác nhận đơn hoàn thành !","","error");
                        return;
                      }
                        Swal.fire({
                          title: "Xác nhận đơn hàng " +code +" đã hoàn thành",
                          inputLabel : 'Ghi chú',
                          input: 'textarea',
                          showCancelButton: true,
                          confirmButtonText: "Xác nhận",        
                      }).then((result) => {
                        if (result.isConfirmed) {
                          $http.post('http://localhost:8080/api/billhistory',{
                            createBy : $rootScope.user.username,
                            note : result.value,
                            status : 3,
                            idBill : id
                          }).then(function(resp){
                            $http.put("http://localhost:8080/api/bill/updatestatusbill",{
                              code : code,
                              status : 3
                            }).then(function(re){
                              Swal.fire("Xác nhận thành công !","","success");
                            
                                $scope.getBill();
                            
                            })
                          })
                        
                    }
                      })
                      }
                      
                      
                     }
                     $scope.isChiTiet = false;
                     $scope.chitiet = function(code){
                      $scope.isChiTiet = !$scope.isChiTiet;
                      $scope.listbillhistory = [];
                      $http.get("http://localhost:8080/api/billhistory/"+code).then(function(resp){
                       $scope.listbillhistory = resp.data;
                     })
                     }
                     $scope.isUpdateAddress = false;
                     $scope.updateAddress = function(code){
                    
                      $scope.isUpdateAddress = !$scope.isUpdateAddress;
                      $scope.listTinh = [];
                      $http({
                          method: "GET",
                          url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
                          headers : {
                              'token' : 'f22a8bb9-632c-11ee-b394-8ac29577e80e'
                          }
                        }).then(function (resp) {
                          $scope.listTinh = resp.data.data ;
                  
                        })
                        $scope.listHuyen = [];
                        $http({
                            method: "GET",
                            url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
                            headers : {
                                'token' : 'f22a8bb9-632c-11ee-b394-8ac29577e80e'
                            }
                          }).then(function (resp) {
                            $scope.listHuyen = resp.data.data ;
                  
                          })
                          $scope.listXa = [];
                          $http({
                              method: "GET",
                              url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=" + $scope.address.districtId,
                              headers : {
                                  'token' : 'f22a8bb9-632c-11ee-b394-8ac29577e80e'
                              }
                            }).then(function (resp) {
                              $scope.listXa = resp.data.data ;
                    
                            })
                       $scope.getHuyen = function(){
                          let tinh = document.getElementById("tinh").value
                          
                          $scope.listHuyen = [];
                          $http({
                              method: "GET",
                              url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=" + tinh,
                              headers : {
                                  'token' : 'f22a8bb9-632c-11ee-b394-8ac29577e80e'
                              }
                            }).then(function (resp) {
                              $scope.listHuyen = resp.data.data ;
                    
                            })
                       }
                       $scope.getXa = function(){
                          let huyen = document.getElementById("huyen").value
                         
                          $scope.listXa = [];
                          $http({
                              method: "GET",
                              url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=" + huyen,
                              headers : {
                                  'token' : 'f22a8bb9-632c-11ee-b394-8ac29577e80e'
                              }
                            }).then(function (resp) {
                              $scope.listXa = resp.data.data ;
                    
                            })
                       }
                      
                    
                     }
                     $scope.suaDiaChi = function(code,id){
                      let tennguoimua = document.getElementById('tennguoimua').value;
                      let sodienthoai = document.getElementById('sodienthoai').value;
                      let diachicuthe = document.getElementById('diachicuthe').value;
                      let cityId = document.getElementById('tinh').value;
                      let districtId = document.getElementById('huyen').value;
                      let wardId = document.getElementById('xa').value;
                      
                    // Get the select element by its id
                const selectElement = document.getElementById('tinh');
                
                // Get the selected option's text content (ProvinceName)
                const cityName = selectElement.options[selectElement.selectedIndex].textContent;
                    // Get the select element by its id
                    const selectElement1 = document.getElementById('huyen');
                
                    // Get the selected option's text content (ProvinceName)
                    const districtName = selectElement1.options[selectElement1.selectedIndex].textContent;
                      // Get the select element by its id
                      const selectElement2 = document.getElementById('xa');
                
                      // Get the selected option's text content (ProvinceName)
                      const wardName = selectElement2.options[selectElement2.selectedIndex].textContent;

                      $http.post('http://localhost:8080/api/address',{
                        fullname : tennguoimua,
                        phone : sodienthoai,
                        address : diachicuthe,
                        cityId : cityId,
                        districtId : districtId,
                        wardId : wardId,
                        cityName : cityName,
                        districtName : districtName,
                        wardName : wardName
                        }).then(function(adds){
                          $http.put("http://localhost:8080/api/bill/updateDiaChi?Code=" + code + "&IdAddress=" + adds.data.id).then(function(res){
                            $http.post('http://localhost:8080/api/billhistory',{
                              createBy : $rootScope.user.username,
                              note : "Cập nhật địa chỉ giao hàng",
                              status : 11,
                              idBill : id
                            }).then(function(resp){
                              Swal.fire("Cập nhật địa chỉ giao hàng thành công !","","success");
                              $scope.isUpdateAddress = false;
                              $scope.getBill();
                            })
                          })


                        })
                     }

                     $scope.huy = function(code,id){
                      Swal.fire({
                        title: "Xác nhận hủy đơn hàng " +code +" ?",
                        inputLabel : 'Ghi chú',
                        input: 'textarea',
                        showCancelButton: true,
                        confirmButtonText: "Xác nhận",        
                    }).then((result) => {
                      if (result.isConfirmed) {
                        $http.post('http://localhost:8080/api/billhistory',{
                            createBy : $rootScope.user.username,
                            note : result.value,
                            status : 4,
                            idBill : id
                          }).then(function(resp){
                            $http.put("http://localhost:8080/api/bill/updatestatusbill",{
                              code : code,
                              status : 4
                            }).then(function(re){
                               
                    $http.get("http://localhost:8080/api/bill/getallbybill/"+code).then(function(resp){
                      for(let i = 0; i < resp.data.length; i++){
                         //get số lượng sản phẩm đang có
                         var getPram = {
                           IdProduct:
                           resp.data[i].productDetail
                               .id,
                           IdColor:
                           resp.data[i].idColor,
                           IdSize: resp.data[i].idSize,
                         };
                         $http({
                           method: "GET",
                           url: "http://localhost:8080/api/productdetail_color_size/getQuantityProductAndColorAndSize",
                           params: getPram,
                         }).then(function (soluong) {
                           var param2 = {
                             IdProduct:
                             resp.data[i]
                                 .productDetail.id,
                             IdColor:
                             resp.data[i].idColor,
                             IdSize:
                             resp.data[i].idSize,
                             Quantity:
                               parseInt(soluong.data) +
                               parseInt(
                                 resp.data[i].quantity
                               ),
                           };
                           $http({
                             method: "PUT",
                             url: "http://localhost:8080/api/productdetail_color_size/updateQuantity",
                             params: param2,
                           })
                      })
                      }
                     }).then(function(res){
                     
                      Swal.fire("Hủy đơn hàng thành công !","","success");
                            
                      $scope.getBill();
                     })
                             
                            
                            })
                          })
                 
                     
                    
                      }
                    })
                    
                     }
                 
                    

    $scope.isPopupVisible = false;

                  $scope.togglePopup = function() {
                    
                    $scope.isPopupVisible = !$scope.isPopupVisible;
                    
               $scope.getAllProduct = function(){
                let url = "http://localhost:8080/api/product";
                let urlcolor = "http://localhost:8080/api/color";
                let urlsize = "http://localhost:8080/api/size";
               
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
             //load product
                $scope.listPro = [];
                $http.get(url).then(function (response) {
                $scope.listPro = response.data;
                });
                $scope.listQuantity = [];
                //load size and color of product
                $http.get("http://localhost:8080/api/productdetail_color_size/getall").then(function(resp){
                    $scope.listQuantity = resp.data;
                })
                 // pagation
              $scope.pager1 = {
                page: 0,
                size: 6,
                get items() {
                  var start = this.page * this.size;
                  return $scope.listQuantity.slice(start, start + this.size);
                },
                get count() {
                  return Math.ceil((1.0 * $scope.listQuantity.length) / this.size);
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
               }

               $scope.getAllProduct();

                  }
                // thêm giỏ hàng
                let idPro = null;
                  $scope.themvaogio = function(id,idBill){

                    $http.get("http://localhost:8080/api/productdetail_color_size/getbyid/"+id).then(function(resp){
                        $http.get("http://localhost:8080/api/product/" +resp.data.idProductDetail).then(function(pro){
               
                        if(resp.data.quantity == 0 ){
                            Swal.fire("Số lượng sản phẩm này đang tạm hết !","","error");
                        }
                        else{
                            Swal.fire({
                                title: "Mời nhập số lượng thêm vào giỏ",
                                input: 'text',
                                showCancelButton: true        
                            }).then((result) => {
                                if(result.value.trim() === ''){
                                    Swal.fire("Số lượng không được bỏ trống !","","error");
                                    return;
                                }
                                if (result.value) {
                                    if(parseInt(result.value) <= 0){
                                        Swal.fire("Số lượng phải lớn hơn 0 !","","error");
                                        return;
                                    }
                                    if(parseInt(result.value) > 100){
                                        Swal.fire("Số lượng phải nhỏ hơn 100 !","","error");
                                        return;
                                    }
                                   
                                    var numberRegex = /^[0-9]+$/;
                                    if (!numberRegex.test(result.value)) {
                                      Swal.fire("Số lượng phải là số !!", "", "error");
                                        return;
                                    }
                                      //get số lượng sản phẩm đang có
                                      var getPram = {
                                        IdProduct:
                                        resp.data.idProductDetail,
                                        IdColor:
                                        resp.data.idColor,
                                        IdSize: resp.data.idSize,
                                      };
                                      $http({
                                        method: "GET",
                                        url: "http://localhost:8080/api/productdetail_color_size/getQuantityProductAndColorAndSize",
                                        params: getPram,
                                      }).then(function (soluong) {
                                        if(parseInt(soluong.data) < parseInt(result.value)){
                                            Swal.fire("Số lượng bạn nhập đang lớn hơn số lượng còn hàng !!", "", "error");
                                            return;
                                        }
                                        $http.get("http://localhost:8080/api/bill/getallbybill/"+ code).then(function(bill){
                                         
                                            for(let i = 0 ; i < bill.data.length ; i++) {
                                              if(bill.data[i].productDetail.id == resp.data.idProductDetail && bill.data[i].idColor == resp.data.idColor && bill.data[i].idSize == resp.data.idSize) {
                                                  // nếu tồn tại rồi thì updatate số lượng
                                                  $http.put("http://localhost:8080/api/bill/updateBillDetail/"+bill.data[i].id ,{
                                                    idBill: $scope.bill.id,
                                                      idProductDetail: resp.data.idProductDetail,
                                                      idColor: resp.data.idColor,
                                                      idSize: resp.data.idSize,
                                                      quantity: parseInt(result.value) + parseInt(bill.data[i].quantity),
                                                      unitPrice:
                                                        pro.data.price,
                                                  }).then(function(billdetail){
                                                    
                                                    $http.get("http://localhost:8080/api/bill/getbycode/"+code).then(function(update){
                                                      var total = parseFloat(update.data.totalPrice) +  parseFloat(pro.data.price * result.value);
                                                      $http.put("http://localhost:8080/api/bill/updateTongTien?Code=" + code + "&Money=" + total)
  
                                                    })
                                                        //get số lượng sản phẩm đang có
                                                        var getPram = {
                                                          IdProduct:
                                                          resp.data.idProductDetail,
                                                          IdColor:
                                                          resp.data.idColor,
                                                          IdSize: resp.data.idSize,
                                                        };
                                                        $http({
                                                          method: "GET",
                                                          url: "http://localhost:8080/api/productdetail_color_size/getQuantityProductAndColorAndSize",
                                                          params: getPram,
                                                        }).then(function (soluong) {
                                                              //  cập nhật số lượng sản phẩm
                                                   var param2 = {
                                                  IdProduct:
                                                  resp.data.idProductDetail,
                                                  IdColor:
                                                  resp.data.idColor,
                                                  IdSize:
                                                  resp.data.idSize,
                                                  Quantity:
                                                    parseInt(soluong.data) -
                                                    parseInt(
                                                      result.value
                                                    ),
                                                };
                                                let tenMau = '';
                                                  let tenKT = '';
                                               
;                                                $http.get(urlcolor).then(function (response) {
                                              
                                                  for(let j = 0 ; j < response.data.length; j++){
                                                    if(response.data[j].id === bill.data[i].idColor){
                                                     
                                                      tenMau = response.data[j].name;
                                                     
                                                      
                                                    }
                                                  }
                                              
                                               
                                                  $http.get(urlsize).then(function (response) {
                                                
                                                    
                                                    for(let j = 0 ; j < response.data.length; j++){
                                                      
                                                      if(response.data[j].id === bill.data[i].idSize){
                                                       
                                                        tenKT = response.data[j].name;
                                                       
                                                       
                                                      }
                                                    }
                                                   
                                                    $http({
                                                      method: "PUT",
                                                      url: "http://localhost:8080/api/productdetail_color_size/updateQuantity",
                                                      params: param2,
                                                    });
                                                    let note = "Đã thêm sản phẩm " + bill.data[i].productDetail.product.name + " [ màu " +tenMau + ", kích thước " + tenKT + ", số lượng : " + bill.data[i].quantity+" ]";
                                                    $http.post('http://localhost:8080/api/billhistory',{
                                                      createBy : $rootScope.user.username,
                                                      note : note,
                                                      status : 13,
                                                      idBill : idBill
                                                    }).then(function(re){
                                                      Swal.fire("Đã thêm !","","success");
                                                
                                                      $scope.getBill();
                                                      $scope.getAllProduct();
                                                    })
                                                  })
                                                })
                                               
                                              
      
                                                        })
                                                      
                                                  })

                                                  return;
                                                 
                                              }
                                                 
                                              }
                                            
                                              // nếu chưa tồn tại thì thêm vào giỏ
                                              $http
                                              .post(
                                                "http://localhost:8080/api/bill/addBillDetail",
                                                {
                                                  // add bill detail
                                                  idBill: $scope.bill.id,
                                                  idProductDetail: resp.data.idProductDetail,
                                                  idColor: resp.data.idColor,
                                                  idSize: resp.data.idSize,
                                                  quantity: result.value,
                                                  unitPrice:
                                                    pro.data.price,
                                                }
                                              )
                                              .then(function (billdetail) {
                                                
                                                $http.get("http://localhost:8080/api/bill/getbycode/"+code).then(function(update){
                                                  var total = parseFloat(update.data.totalPrice) +  parseFloat(pro.data.price * result.value);
                                                  $http.put("http://localhost:8080/api/bill/updateTongTien?Code=" + code + "&Money=" + total)

                                                })
                                                        //get số lượng sản phẩm đang có
                                                        var getPram = {
                                                          IdProduct:
                                                          resp.data.idProductDetail,
                                                          IdColor:
                                                          resp.data.idColor,
                                                          IdSize: resp.data.idSize,
                                                        };
                                                        $http({
                                                          method: "GET",
                                                          url: "http://localhost:8080/api/productdetail_color_size/getQuantityProductAndColorAndSize",
                                                          params: getPram,
                                                        }).then(function (soluong) {
                                                              //  cập nhật số lượng sản phẩm
                                                              var param2 = {
                                                                IdProduct:
                                                                resp.data.idProductDetail,
                                                                IdColor:
                                                                resp.data.idColor,
                                                                IdSize:
                                                                resp.data.idSize,
                                                                Quantity:
                                                                  parseInt(soluong.data) -
                                                                  parseInt(
                                                                    result.value
                                                                  ),
                                                              };
                                                              let tenMau = '';
                                                                let tenKT = '';
                                                             
              ;                                                $http.get(urlcolor).then(function (response) {
                                                            
                                                                for(let j = 0 ; j < response.data.length; j++){
                                                                  if(response.data[j].id === resp.data.idColor){
                                                                   
                                                                    tenMau = response.data[j].name;
                                                                   
                                                                    
                                                                  }
                                                                }
                                                            
                                                             
                                                                $http.get(urlsize).then(function (response) {
                                                              
                                                                  
                                                                  for(let j = 0 ; j < response.data.length; j++){
                                                                    
                                                                    if(response.data[j].id === resp.data.idSize){
                                                                     
                                                                      tenKT = response.data[j].name;
                                                                     
                                                                     
                                                                    }
                                                                  }
                                                                 
                                                                  $http({
                                                                    method: "PUT",
                                                                    url: "http://localhost:8080/api/productdetail_color_size/updateQuantity",
                                                                    params: param2,
                                                                  });
                                                                  $http.get("http://localhost:8080/api/product/"+ resp.data.idProductDetail).then(function(pro){
                                                                    let note = "Đã thêm sản phẩm " + pro.data.product.name + " [ màu " +tenMau + ", kích thước " + tenKT + ", số lượng : " + result.value+" ]";
                                                                    $http.post('http://localhost:8080/api/billhistory',{
                                                                      createBy : $rootScope.user.username,
                                                                      note : note,
                                                                      status : 13,
                                                                      idBill : idBill
                                                                    }).then(function(re){
                                                                      Swal.fire("Đã thêm !","","success");
                                                                
                                                                      $scope.getBill();
                                                                      $scope.getAllProduct();
                                                                    })
                                                                  })
                                                                
                                                                })
                                                              })
                                                             
      
                                                        })
                                             
                                                
                                              })
      
                                            
                                          })
                                      })

                                  
                                  
                                }
                            });
                        }
                            
                        })
                      
                    })

                    
                  }

                  $scope.isPopupVisible1 = false;

                  $scope.doihang = function(id){
                    $scope.isPopupVisible1 = !$scope.isPopupVisible1;

                    $scope.listProduct = [];
                    $http.get("http://localhost:8080/api/productdetail_color_size/getbyproduct/"+id).then(function (response) {
                      $scope.listProduct = response.data;
                    
                  
                      });
                            // pagation
                            $scope.pager2 = {
                              page: 0,
                              size: 6,
                              get items() {
                                var start = this.page * this.size;
                                return $scope.listProduct.slice(start, start + this.size);
                              },
                              get count() {
                                return Math.ceil((1.0 * $scope.listProduct.length) / this.size);
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
                            }
                  }
                    //xóa bill detail
                    $scope.deleteBillDetail = function(id,IdBill){
                   
                      Swal.fire({
                          title: 'Bạn có chắc muốn xóa sản phẩm này ?',
                          showCancelButton: true,
                          confirmButtonText: 'Xóa',
                      }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                              $http.get("http://localhost:8080/api/bill/getbilldetail/"+id).then(function(resp){
                             
                              $http.get("http://localhost:8080/api/product/" +resp.data.productDetail.id).then(function(pro){
                              
                                               //get số lượng sản phẩm đang có
                                               var getPram = {
                                                  IdProduct:
                                                  resp.data.productDetail.id,
                                                  IdColor:
                                                  resp.data.idColor,
                                                  IdSize: resp.data.idSize,
                                                };
                                                $http({
                                                  method: "GET",
                                                  url: "http://localhost:8080/api/productdetail_color_size/getQuantityProductAndColorAndSize",
                                                  params: getPram,
                                                }).then(function (soluong) {
                                                      //  cập nhật số lượng sản phẩm
                                           var param2 = {
                                          IdProduct:
                                          resp.data.productDetail.id,
                                          IdColor:
                                          resp.data.idColor,
                                          IdSize:
                                          resp.data.idSize,
                                          Quantity:
                                            parseInt(soluong.data) + parseInt(resp.data.quantity)
                                           ,
                                        };
                                      let tenMau = '';
                                      let tenKT = '';
                                    $http.get(urlcolor).then(function (response) {
                                      for(let i = 0 ; i < response.data.length; i++){
                                        if(response.data[i].id === resp.data.idColor){
                                          tenMau = response.data[i].name;
    
                                        }
                                      }
                                      $http.get(urlsize).then(function (response) {
                                        for(let i = 0 ; i < response.data.length; i++){
                                          if(response.data[i].id === resp.data.idSize){
                                            tenKT = response.data[i].name;
                                          }
                                        }
                                       
                                     
                                        let note = "Đã xóa sản phẩm " + resp.data.productDetail.product.name + " [ màu " +tenMau + ", kích thước " + tenKT + " ]";
                                        $http.get("http://localhost:8080/api/bill/getbycode/"+code).then(function(update){
                                          var total = parseFloat(update.data.totalPrice) -  parseFloat(resp.data.unitPrice * resp.data.quantity);
                        $http.put("http://localhost:8080/api/bill/updateTongTien?Code=" + code + "&Money=" + total)

                      })
                                        $http({
                                          method: "PUT",
                                          url: "http://localhost:8080/api/productdetail_color_size/updateQuantity",
                                          params: param2,
                                        }).then(function (resp) {
                                            $http.get("http://localhost:8080/api/bill/deleteBillDetail/"+id).then(function(resp){
                                              $http.post('http://localhost:8080/api/billhistory',{
                                                createBy : $rootScope.user.username,
                                                note : note,
                                                status : 12,
                                                idBill : IdBill
                                              }).then(function(re){
                                                Swal.fire("Xóa thành công !","","success");
                                      
                                                $scope.getBill();
                                              })
                                               
                                               
                                              
                                            })
                                         
                                         
  
                                      })
                                        
                                      });
                                    })
          
                                
                                   

                                       
  
                                                })
                                              
                                            })
      
                                        
                                        
                                    
                                
                            
                                  
                              })
                             
                          }
                      })
                    }

                    $scope.XacNhanTT = function(){
                      let code = $routeParams.code;
                      $http.get("http://localhost:8080/api/bill/getbycode/"+code).then(function(resp){
                      
                        let amout = resp.data.totalPrice + resp.data.shipPrice - resp.data.totalPriceLast;
                        Swal.fire({
                          title: 'Xác nhận đã thanh toán '+ amout.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                          showCancelButton: true,
                          confirmButtonText: 'Xác nhận',
                      }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            $http.post('http://localhost:8080/api/billhistory',{
                              createBy : $rootScope.user.username,
                              note : "Xác nhận đã thanh toán",
                              status : 10,
                              idBill : resp.data.id
                            }).then(function(re){
                              $http.put('http://localhost:8080/api/bill/updateStatus/'+ code,{
                                payStatus : 1,
                                paymentDate : new Date(),
                                delyveryDate : new Date(),
                                status : resp.data.status
                              
                              }).then(function(resp){
                                Swal.fire("Xác nhận thanh toán thành công !","","success");
                                $timeout(function () {
                                  $scope.getBill();
                              });
                              })
                            })
                          
  
                          }
                        })
                         })
                   
                   
                    }
                    $scope.sendBillToMail = function(code){
     
                      $http.get('http://localhost:8080/api/bill/getbycode/'+code).then(function(billexport){
                        $scope.billexport = billexport.data;
                        $http.get('http://localhost:8080/api/address/get/' + billexport.data.idAddress).then(function(add){
                          $scope.addressexport = add.data;
                        }).then(function(resp){
                          $http.get("http://localhost:8080/api/bill/getallbybill/"+code).then(function(resp){
                            $scope.listItemExport = resp.data;
                
                       
                      
                
                      $http.get("http://localhost:8080/api/customer/"+IdCustomer).then(function(response){
                               // Lấy phần tử bằng ID
                      var myElement = document.getElementById('exportbill');
                
                      // Lấy HTML từ phần tử và in ra console
                      var htmlContent = myElement.innerHTML;
                        // Lấy ngày và giờ hiện tại
                var currentDate = new Date();
                
                // Lấy giờ, phút, giây
                var hours = currentDate.getHours();
                var minutes = currentDate.getMinutes();
                
                // Lấy ngày, tháng, năm
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
                var year = currentDate.getFullYear();
                        var emailData = {
                            to: response.data.email,
                            subject: 'Cảm ơn bạn đã mua hàng tại BeeBetaShoes lúc ' + hours +' giờ ' + minutes + ' phút ' +day + '/'+month + '/' + year,
                            bodyHtml: htmlContent,
                        };
                
                        $http.post('http://localhost:8080/api/sendmail', emailData).then(function(resp){
                          Swal.fire(
                            "Đặt hàng thành công !",
                            "",
                            "success"
                          );
                          
                         $rootScope.listCartIndex = [];
                         $rootScope.tongTienIndex = 0;
                          location.href = "#/myorder";
                        })
                
                    })
                        })
                        })
                       
                      })
                     
                    
                    
                    }
  
}