window.HoaDonController = function($scope, $http, $location,$routeParams){
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
                  $scope.getBill = function(){
                    
                    $scope.listItem = [];
                  $scope.bill = {};
                 
                  $http.get("http://localhost:8080/api/bill/getbycode/"+code).then(function(resp){
                    $scope.bill = resp.data;
                     })
                     $scope.address = {};
                     $http.get("http://localhost:8080/api/address/getBill/"+code).then(function(resp){
                       $scope.address = resp.data;
                     })
                     $http.get("http://localhost:8080/api/bill/getallbybill/"+code).then(function(resp){
                       $scope.listItem = resp.data;
                     })
                     $scope.billhistory = [];
                     $http.get("http://localhost:8080/api/billhistory/"+code).then(function(resp){
                      $scope.billhistory = resp.data;
                      $scope.maxStatus = $scope.billhistory.reduce(function(max, obj) {
                        return Math.max(max, obj.status);
                      }, -Infinity);
                     
                    })
                  }
                  $scope.getBill();


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
                            createBy : null,
                            note : result.value,
                            status : 1,
                            idBill : id
                          });
                        let params = {
                          code : code,
                          status : 1
                        }
                        $http({
                          method : 'PUT',
                          url : 'http://localhost:8080/api/bill/updatestatus',
                          params : params
                      });
                       
                        Swal.fire("Xác nhận thành công !","","success");
                        setTimeout(() => {
                          location.reload();
                        }, 2000);
                          
                        
                     
                    }
                      })
                      }
                     else if($scope.bill.status === 1){
                        Swal.fire({
                          title: "Xác nhận đang giao hàng đơn hàng " +code +" ?",
                          inputLabel : 'Ghi chú',
                          input: 'textarea',
                          showCancelButton: true,
                          confirmButtonText: "Xác nhận",        
                      }).then((result) => {
                        if (result.isConfirmed) {
                          $http.post('http://localhost:8080/api/billhistory',{
                            createBy : null,
                            note : result.value,
                            status : 2,
                            idBill : id
                          });
                        let params = {
                          code : code,
                          status : 2
                        }
                        $http({
                          method : 'PUT',
                          url : 'http://localhost:8080/api/bill/updatestatus',
                          params : params
                      });
                       
                        Swal.fire("Xác nhận thành công !","","success");
                        setTimeout(() => {
                          location.reload();
                        }, 2000);
                          
                     
                    }
                      })
                      }
                   
                      else if($scope.bill.status === 2){
                        Swal.fire({
                          title: "Xác nhận đơn hàng " +code +" đã hoàn thành",
                          inputLabel : 'Ghi chú',
                          input: 'textarea',
                          showCancelButton: true,
                          confirmButtonText: "Xác nhận",        
                      }).then((result) => {
                        if (result.isConfirmed) {
                          $http.post('http://localhost:8080/api/billhistory',{
                            createBy : null,
                            note : result.value,
                            status : 3,
                            idBill : id
                          });
                          $http.put('http://localhost:8080/api/bill/updateStatus/'+ code,{
                            payStatus : 1,
                            paymentDate : new Date(),
                            delyveryDate : new Date(),
                            status : 3
                          
                          });
                       
                        Swal.fire("Xác nhận thành công !","","success");
                        setTimeout(() => {
                          location.reload();
                        }, 2000);
                          
                     
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
                          createBy : null,
                          note : result.value,
                          status : 5,
                          idBill : id
                        });
                      let params = {
                        code : code,
                        status : 4
                      }
                      $http({
                        method : 'PUT',
                        url : 'http://localhost:8080/api/bill/updatestatus',
                        params : params
                    });
                  
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
                    })
                     
                      Swal.fire("Hủy đơn hàng thành công !","","success");
                      setTimeout(() => {
                        location.reload();
                      }, 2000);
                      }
                    })
                    
                     }
                 
                     $scope.capNhatAddress = function(){

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
                  $scope.themvaogio = function(id){

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
                                                $http({
                                                  method: "PUT",
                                                  url: "http://localhost:8080/api/productdetail_color_size/updateQuantity",
                                                  params: param2,
                                                }).then(function (resp) {
                                                  Swal.fire("Đã thêm !","","success");
                                              
                                                  $scope.getBill();
                                                  $scope.getAllProduct();
                                                 
                                                  
                                                  
      
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
                                                $http({
                                                  method: "PUT",
                                                  url: "http://localhost:8080/api/productdetail_color_size/updateQuantity",
                                                  params: param2,
                                                }).then(function (resp) {
                                                  Swal.fire("Đã thêm !","","success");
                                                  $scope.getBill();
                                                  $scope.getAllProduct();
                                                  

      
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
                    //xóa bill detail
                    $scope.deleteBillDetail = function(id){
                   
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
                                        $http({
                                          method: "PUT",
                                          url: "http://localhost:8080/api/productdetail_color_size/updateQuantity",
                                          params: param2,
                                        }).then(function (resp) {
                                            $http.get("http://localhost:8080/api/bill/deleteBillDetail/"+id).then(function(resp){
                                                Swal.fire("Xóa thành công !","","success");
                                      
                                                $scope.getBill();
                                                $scope.getAllProduct();
                                              
                                            })
                                         
                                         
  
                                      })
  
                                                })
                                              
                                            })
      
                                        
                                        
                                    
                                
                            
                                  
                              })
                             
                          }
                      })
                    }
  
}