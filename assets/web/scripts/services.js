'use strict';

angular.module('PrApp')
  .constant("baseURL","http://localhost:3578/api/")
  
 // .constant("baseURL","http://194.87.232.245:3578/api/")

.service('gingerFactory',['Restangular','baseURL',function(Restangular,baseURL){


 var products = Restangular.all('products');
 var tags = Restangular.all('tags');
//  var ps = products.one('56bcb91ee4b04d5aff53e430').get().then(function(res){
//     console.log(res);
// });
 //console.log(ps);
 
// products.getList().then(function(accounts) {
//     for (var i = accounts.length - 1; i >= 0; i--) {
//        // console.log(accounts[i].title);
//     }
//   //console.log(accounts[0].description);
// });


//console.log(s);

    var normalName = {
        palochka:"На палочке",
        newyear:"На новый год",
        odinoch:"Одиночные",
        nabor:"Наборы",
        fromsaratov:"Подарки из Саратова"
    };
    this.getProducts  = function (v){
        //return pr;  
            return products.getList(v); //$resource(baseURL+"pr/:id",null,{'update':{method:'PUT'}});                
    };
    this.getElement  = function (v){
        //return pr;  
            //console.log(products.one(v));
            return products.one(v).get(); //$resource(baseURL+"pr/:id",null,{'update':{method:'PUT'}});                
    };

    this.getCallback  = function (){
        //return pr;  
        //     return $resource(baseURL+"callback/:id",null,{'update':{method:'PUT'}});
    };

    this.getTags  = function (v){
        //return pr;  
            return tags.getList(v);//$resource(baseURL+"tag/:id");                
    };

    this.getDetails = function(index){
        return pr[index];
    };
    this.getNormalName = function(index){
        return normalName[index];
    };
    
    
}])
.service('cartFactory',['baseURL','Restangular',function(baseURL,Restangular){
    var cart = Restangular.all('carts');
    this.getLength = function(){
        return cart.getList().length;
    };

    this.getCart = function(){
        //console.log(cart.getList());
        return  cart.getList();//$resource(baseURL+"cart/:id",null,{'update':{method:'PUT'}});
    };

    this.addToCart = function(obj){
        if (!obj.amount) {obj.amount= 1;}
        cart.post(obj);
    };

    this.removeCart = function(){
        cart.remove();
        //len=0;

    };

    this.removeCartItem=function(item){
        //console.log(item);
        cart.one(item).remove().then(function(){console.log("ok!")});
    };

    this.minusNumberOfItems = function(item){

           var p = item._id;
           Restangular.one('cart',p).get().then(function(res){
            //console.log(res.amount);
            res.amount--;
            // console.log(res.amount);
            res.put()//.then(function(){console.log("done!");});
        });
    
    };
   this.plusNumberOfItems = function(item){

           var p = item._id;
           //console.log(p);
           Restangular.one('cart',p).get().then(function(res){
            //console.log(res.amount);
            res.amount++;
            //console.log(res);
            res.put()//.then(function(){console.log("done!");});
        });
    
    };

    this.getOrder = function (){
        // return  $resource(baseURL+"order/:id",null,{'update':{method:'PUT'}});
    };

    this.getNewCart = function(){
        return cart;
    };




    // this.summ = function () {
    //      var itogo;  
    //      cart.getList().then(function(res){         
    //         itogo = 0;
    //         console.log(res);
    //         res.forEach(function(value,index){
    //             if (value.hasOwnProperty('price')){
    //               itogo += value.price*value.amount;
    //             console.log(itogo);
    //             }
    //         });
    
    //      });
    //      console.log(itogo);
    //      return itogo;
    //            }
     
    
}])

;