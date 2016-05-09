'use strict';
//http://localhost:3578/api/
angular.module('adminApp')
  //.constant("baseURL","http://194.87.232.245:3578/api/")
.constant("baseURL","http://localhost:1337")
.factory('RestAPI', [
    'Restangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            return RestangularConfigurer.setBaseUrl('http://localhost:1337');
        });
    }
])
.factory('ordersFactory',['RestAPI',function(RestAPI){
    // console.log("starting factory");
    var orderModel;
    orderModel = function () {
        this.description = "модель для заказов. Позволяет просматривать, изменять и удалять заказы";
        this.orders = RestAPI.all('orders').getList().$object;
        return this;
    }

    orderModel.prototype.delOrder = function(item){
        console.log("started");
        console.log(item);
        var self = this;
        item.one(item._id).remove().then(function (res) {
            _.pull(self.orders,item);
            console.log("removed");
        });

    };

    orderModel.prototype.orderDeliver = function(item){
        console.log(item);
        item.delivered = true;
        item.one(item._id).put();
    };

    return orderModel;
}
])

    .factory('usersFactory',['RestAPI',function(RestAPI){
        // console.log("starting factory");
        var userModel;
        userModel = function () {
            this.description = "модель для пользователей. Можно смотреть и назначать права.";
            this.orders = RestAPI.all('users').getList().$object;
            return this;
        }

        // orderModel.prototype.delOrder = function(item){
        //     console.log("started");
        //     console.log(item);
        //     var self = this;
        //     item.one(item._id).remove().then(function (res) {
        //         _.pull(self.orders,item);
        //         console.log("removed");
        //     });
        //
        // };
        //
        // orderModel.prototype.orderDeliver = function(item){
        //     console.log(item);
        //     item.delivered = true;
        //     item.one(item._id).put();
        // };

        return userModel;
    }
    ])
.service('gingerFactory',['$resource','baseURL',function($resource,baseURL){



    this.getProducts  = function (){
        //return pr;  
            return $resource(baseURL+"pr/:id",null,{'update':{method:'PUT'}});                

    };
    this.getDetails = function(index){
        return pr[index];
    };
    this.getNormalName = function(index){
        return normalName[index];
    };
    this.getNewCart = function(){
        return cart;
    };

    this.getTags  = function (){
            return $resource(baseURL+"tag/:id",{id:'@id'},{'update':{method:'PUT'}});                

    };
    
}])
.service('cartFactory',['$resource','baseURL',function($resource,baseURL){
    this.getCart = function(){
        return  $resource(baseURL+"cart/:id",null,{'update':{method:'PUT'}});
    };
    this.getOrder = function (){
        return  $resource(baseURL+"order/:id",null,{'update':{method:'PUT'}});
    };

     
    
}])

.service('blogFactory',['$resource','baseURL',function($resource,baseURL){

this.getBlog = function(){
        return  $resource(baseURL+"blog/:id",null,{'update':{method:'PUT'}});
    };
}])

.service('callbackFactory',['$resource','baseURL',function($resource,baseURL){

this.getCallback = function(){
        return  $resource(baseURL+"callback/:callback_id",{callback_id:'@callback_id'},{'update':{method:'PUT',}});
    };
}])
;