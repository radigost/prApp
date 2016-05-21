"use strict"; 
angular.module('PrApp')

.controller('IndexController',['$scope',function($scope){

    $scope.name="Hello! TRololo";
    
}])

.controller('MagazController',['$scope','$rootScope','$stateParams','gingerFactory','cartFactory',function($scope,$rootScope,$stateParams,gingerFactory,cartFactory){
  // console.log("Hello from ctrl");
    $scope.element = {};
  $scope.callback = {};  
  // $scope.bada = 6
  // $scope.hurray = function(el){
  //   $scope.bada ++
  //   console.log(el,$scope.bada);
  // }
  var init = function() {
    var map = new ymaps.Map('map', {
            center: [55.650625, 37.62708],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        }),
        counter = 0,

        // Создание макета содержимого балуна.
        // Макет создается с помощью фабрики макетов с помощью текстового шаблона.
        myBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="margin: 10px;">' +
                '<b>{{properties.name}}</b><br />' +
                '<i id="count"></i> ' +
                '$[[options.hintContent]]'+
                '<button id="counter-button"> +1 </button>' +
            '</div>', {

            // Переопределяем функцию build, чтобы при создании макета начинать
            // слушать событие click на кнопке-счетчике.
            build: function () {
                // Сначала вызываем метод build родительского класса.
                myBalloonContentLayout.superclass.build.call(this);
                // А затем выполняем дополнительные действия.
                $('#counter-button').bind('click', this.onCounterClick);
                $('#count').html(counter);
            },

            // Аналогично переопределяем функцию clear, чтобы снять
            // прослушивание клика при удалении макета с карты.
            clear: function () {
                // Выполняем действия в обратном порядке - сначала снимаем слушателя,
                // а потом вызываем метод clear родительского класса.
                $('#counter-button').unbind('click', this.onCounterClick);
                myBalloonContentLayout.superclass.clear.call(this);
            },

            onCounterClick: function () {
                $scope.hurray(5);
                $('#count').html(++counter);
                if (counter == 5) {
                    alert('Вы славно потрудились.');
                    counter = 0;
                    $('#count').html(counter);
                }
            }
        });

    var placemark = new ymaps.Placemark([55.650625, 37.62708], {
            name: $scope.bada
        }, {
            balloonContentLayout: myBalloonContentLayout,
            hintContent: 'Москва!',
            preset: 'islands#redIcon',
            balloonContentFooter: "Подвал",
            // Запретим замену обычного балуна на балун-панель.
            // Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
            balloonPanelMaxMapArea: 0
        });

    map.geoObjects.add(placemark);
    var placemark = new ymaps.Placemark([58.650625, 34.62708], {
            name: 'Считаем'
        }, {
            balloonContentLayout: myBalloonContentLayout,
            hintContent: 'МАКСВА!',
            preset: 'islands#redIcon',
            balloonContentFooter: "Подвал",
            // Запретим замену обычного балуна на балун-панель.
            // Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
            balloonPanelMaxMapArea: 0
        });

    map.geoObjects.add(placemark);
  }
  ymaps.ready(init);
  console.log("SADFSADFAS");

  cartFactory.getCart().then(function(res){
    $rootScope.len = res.length;
  }); 

  if ($stateParams.id) {
    gingerFactory.getElement($stateParams.id).then(function(res){
      $scope.element=res;
      console.log($scope.element);    
    });
  }
  $scope.filtCategory="";
  $scope.categoryName=gingerFactory.getNormalName($stateParams.category);  
  gingerFactory.getProducts().then( function (res){
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
  cartFactory.getCart().then(function(res){
    $scope.cartData=res ;   
    var itogo = 0;
    res.forEach(function(value,index){
      if (value.hasOwnProperty('price')){
        itogo += value.price*value.amount;
      }
    });
   $scope.summ = itogo;
  });
  $scope.makeOrder = cartFactory.getOrder();

     
  $scope.Minus = function(item){
    cartFactory.minusNumberOfItems(item);
    item.amount-=1;
    $scope.summ -= item.price;
  };
  $scope.Plus = function(item){
    cartFactory.plusNumberOfItems(item);
    item.amount+=1;
    $scope.summ += item.price; 
  };
  $scope.emptyCart = function(choice){
    cartFactory.removeCartItem(choice);
    var cartData = $scope.cartData;
      for(var i = cartData.length-1; i >= 0; i--){  
        if(cartData[i]._id == choice){ 
          $scope.summ -=cartData[i].price*cartData[i].amount; 
          cartData.splice(i,1); 
        }
        $scope.cartData = cartData;
      }  
    $rootScope.len--;
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

  $scope.createOrder = function(){
    var order = {};
    order.products = $scope.cartData;
    order.date = new Date().toISOString();  
    console.log($scope.customername);
    order.customername = $scope.customername;
    order.customerphone = $scope.customerphone;
    order.customeremail = $scope.customeremail;
    order.needDelivery = $scope.needDelivery;
    order.customeradress = $scope.customeradress;
    $scope.makeOrder.save(order);
    $scope.cartData = $scope.deleteCart();
    $scope.customername = "";
    $scope.customerphone = "";
    $scope.customeremail = "";
    $scope.needDelivery = false;
    $scope.customeradress = "";
  };

}])

; 