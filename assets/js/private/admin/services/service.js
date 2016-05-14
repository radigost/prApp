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
    var userModel;
    userModel = function () {
        this.description = "модель для пользователей. Можно смотреть и назначать права.";
        this.orders = RestAPI.all('users').getList().$object;
        return this;
        };
    return userModel;
}])
.factory('tagsFactory',['RestAPI','toastr',function(RestAPI,toastr){
        var tagModel;
        tagModel = function () {
            this.description = "модель для Тэгов";
            this.tags = RestAPI.all('tags').getList().$object;
            return this;
        };
        tagModel.prototype.saveTag= function(tag) {
            RestAPI.all('tags').post(tag).then(function (res) {
                console.log("saved!", res);
                toastr.success(res.normalname, 'Сохранено!');
            });
        };
        tagModel.prototype.delTag= function(tag){
            console.log(tag);
            RestAPI.all('tags').getList().then(function (res) {
                var r = _.find(res,{name:tag.name});
                // console.log("deleting!",res,r);
                r.remove().then(function (res) {
                    toastr.warning(res.normalname, 'Удалено!');
                })
                //
            })
        };
        return tagModel;
    }])
.factory('productsFactory',['RestAPI','toastr',function(RestAPI,toastr){
        var productModel;
        productModel = function () {
            this.description = "модель для продуктов";
            this.products = RestAPI.all('products').getList().$object;
            return this;
        };
        productModel.prototype.saveProduct= function(product) {
            console.log(product);
            RestAPI.all('products').post(product).then(function (res) {
                console.log("saved!", res);
                toastr.success(res.name, 'Сохранено!');
            });
        };
        return productModel;
    }])
.factory('callsFactory',['RestAPI',function(RestAPI){
    var callsModel;
    callsModel = function () {
            this.description = "модель для Заказа Звонков";
            this.calls = RestAPI.all('callbacks').getList().$object;
            return this;
        };
        return callsModel;
}])
.factory('blogFactory',['RestAPI',function(RestAPI){
    var blog;
    blog = function () {
        this.description = "модель для Блога";
        this.entries = RestAPI.all('blog').getList().$object;
        return this;
    };
    return blog;
}])

;