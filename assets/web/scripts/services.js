'use strict';

angular.module('PrApp')
  .constant("baseURL","http://localhost:3578/api/")
  
 // .constant("baseURL","http://194.87.232.245:3578/api/")

.service('gingerFactory',['Restangular','baseURL',function(Restangular,baseURL){
    var products = Restangular.all('products');
    var tags = Restangular.all('tags');
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
.service('cartFactory',['baseURL','Restangular','toastr',function(baseURL,Restangular,toastr){
    var cart = Restangular.all('carts');
    this.toastr=toastr;
    this.getLength = function(){
        return cart.getList().length;
    };

    this.getCart = function(){
        //console.log(cart.getList());
        return  cart.getList();//$resource(baseURL+"cart/:id",null,{'update':{method:'PUT'}});
    };

    this.addToCart = function(obj){
        console.log(toastr);
        var cartobj={};
        if (!obj.amount) {cartobj.amount= 1;}
        cartobj.product_id=obj.id;
        console.log(cartobj);
        cart.post(cartobj).then(function(res){
            if (res.result =="saved") toastr.success("Сохранено в корзине");
            if (res.result=="exist") toastr.warning("Уже есть в корзине");


        });
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