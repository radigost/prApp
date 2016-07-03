"use strict"; 
angular.module('PrApp')

.controller('IndexController',['$scope',function($scope){

    $scope.name="Hello! TRololo";
    
}])

.controller('MagazController',['$scope','$rootScope','$stateParams','gingerFactory','cartFactory',function($scope,$rootScope,$stateParams,gingerFactory,cartFactory){
    $scope.element = {};
    $scope.callback = {};
    $scope.filtCategory="";

    cartFactory.getCart().then(function(res){
        $rootScope.len = res.length;
    }); 

    if ($stateParams.id) {
    gingerFactory.getElement($stateParams.id).then(function(res){
      $scope.element=res;
      console.log($scope.element);    
    });
    }
    
    $scope.categoryName=gingerFactory.getNormalName($stateParams.category);  
    gingerFactory.getProducts().then( function (res){
        // console.log(res);
        $scope.pr = res;
    });
    $scope.filtCategory  = $stateParams.category;
    $scope.category = $stateParams.category; //i do not sure if i need it
    $scope.id=$stateParams.id;
    $scope.tabs = gingerFactory.getTags({showinmagaz:true}).then(function(data){
        $scope.tabs = data;
    });
    //this is working with cart
    
    $scope.cart =cartFactory.getCart();
    $scope.addCart = function (obj){
        console.log(obj);
        if (cartFactory.addToCart(obj)){
            console.log("done!")
        };
        $rootScope.len++;
      
    };
    $scope.addCallbackPr = function(from_method){
    var el = $scope.element;
    el.name = $scope.callbackname;
    el.date = new Date().toISOString();
    el.message = $scope.callbackmessage;
    el.phone = $scope.callbackphone;
    el.from_method = from_method;
    el.email = $scope.callbackemail;
    gingerFactory.getCallback().save(el);
    $scope.callbackname="";
    $scope.callbackemail="";
    $scope.callbackmessage="";
    $scope.callbackphone="";
    }
    
    $scope.CheckMKForm = function(){
    console.log ($scope.callbackname);
    return true;
    }
    
    $scope.normalNameCaller = function(name){
    var tabs = $scope.tabs;
    for (var tag in tabs) {
      if (tag.name == name){
        console.log(tag.normalname);
        return tag.normalname;
      };       
    }; 
    }
  
}])
/* .controller('DetailController',['$scope','$stateParams','gingerFactory', 'cartFactory',function($scope,$stateParams,gingerFactory,cartFactory){
  //$scope.element = {};        
 //   $scope.element = gingerFactory.getProducts().get({id:parseInt($stateParams.id,10)});
 //   $scope.categoryName=gingerFactory.getNormalName($stateParams.category);
   // $scope.category = $stateParams.category;
    //$scope.id=$stateParams.id;
    /*
    $scope.cart =cartFactory.getCart().query(); //getting data of cart
    $scope.addCart = function (obj){
        obj.date = new Date().toISOString();  
        cartFactory.getCart().save(obj);
       // $rootScope.len = $scope.cart.length; //need to rewrite it normally, without rootScope , also need to access it in both controllers
    }; 
}]) */
.controller('CartController',['$scope','$rootScope','cartFactory',function($scope,$rootScope,cartFactory){
    $scope.showOrder=false;
    $scope.summProducts=function () {
        $scope.summ=0;
        _.forEach($scope.cartData,function (cartItem) {
            $scope.summ+=cartItem.amount*cartItem.product.price;
        })
    };

    $scope.summProducts();
    cartFactory.getCart().then(function(res){
        $scope.cartData=res ;
        var itogo = 0;
        res.forEach(function(value,index){
          if (value.product.hasOwnProperty('price')){
            itogo += value.product.price*value.amount;
          }
        });
    $scope.summ = itogo;
    });

    $scope.Change = function(item,number){
      var cartItem=_.find($scope.cartData,{id:item});
      cartItem.amount+=number;
      if (cartItem.amount<0) cartItem.amount=0;
      $scope.summProducts();
    };

    $scope.emptyCart = function(choice){
        cartFactory.removeCartItem(choice);
        var cartData = $scope.cartData;
        for(var i = cartData.length-1; i >= 0; i--){
            if(cartData[i].id == choice){
              cartData.splice(i,1);
            }
            $scope.cartData = cartData;
        }
        if ($scope.cartData.length>0)  $rootScope.len=$scope.cartData.length ;
        else $rootScope.len=0;
        $scope.summProducts();
    };

    $scope.deleteCart = function(){
        cartFactory.removeCart();
        $scope.cartData=[];
        $scope.summ=0;
    };

    $scope.toggleOrder = function(){
        var showOrder = $scope.showOrder;
        $scope.showOrder = !showOrder;
        return $scope.showOrder;
    };

    $scope.createOrder = function(order){
        order.products = $scope.cartData;
        order.summ=$scope.summ;
        cartFactory.makeOrder(order);
        // console.log(order);
    // cartFactory.getOrder().save(order);
    //    отправить даные по заказу
    //  отправить данные по продуктам
    //  очистить коорзину
    //     $scope.cartData=[];
        $scope.summProducts();
        // $scope.clearOrder();
        // console.log(order);
    };

}])

; 