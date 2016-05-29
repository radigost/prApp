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
.service('common', [
    'RestAPI','toastr', function(RestAPI,toastr) {
        this.save= function(element,destination) {
          RestAPI.all(destination).post(element).then(function (res) {
              // console.log("saved!", res);
              toastr.success('Сохранено!');
          });
        };
        this.getAll= function(destination) {
            return RestAPI.all(destination).getList().$object;
        };


        this.delete= function(element,destination){
            // console.log(element);
            RestAPI.all(destination).getList().then(function (res) {
                var r = _.find(res,{id:element.id});
                // console.log("deleting!",res,r);
                r.remove().then(function (res) {
                    toastr.warning( 'Удалено!');
                })
                //
            })
        };
        this.deleteBy= function(element,destination){
            // console.log(element);
            RestAPI.all(destination).getList().then(function (res) {
                var r = _.find(res,function (o) {
                    return o.product.id==element.product.id && o.tag.id==element.tag.id
                });
                // console.log("deleting!",res,r);
                r.remove().then(function (res) {
                    toastr.warning( 'Удалено!');
                })
                //
            })
        };
        this.put= function(element,destination){
            // console.log(element);
            RestAPI.one(destination,element.id).get().then(function (res) {
                // console.log(res);
                _.forEach(_.keys(element),function (key) {
                    res[key]=element[key]
                })

                res.save().then(function (res) {
                    toastr.success( 'Сохранено!');
                })
                //
            })
        };
    }
])
.factory('ordersFactory',['RestAPI','common',function(RestAPI,common){
    // console.log("starting factory");
    var orderModel;
    orderModel = function () {
        this.description = "модель для заказов. Позволяет просматривать, изменять и удалять заказы";
        this.orders = common.getAll('orders');
        return this;
    }

    orderModel.prototype.delOrder = function(item){
        common.delete(item,'orders');
    };

    orderModel.prototype.orderDeliver = function(item){
        // console.log(item);
        // item.delivered = true;
        common.put(item,'orders');
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
.factory('tagsFactory',['RestAPI','common',function(RestAPI,common){
        var tagModel;
        tagModel = function () {
            this.description = "модель для Тэгов";
            this.tags = common.getAll('tags');
            return this;
        };
        tagModel.prototype.saveTag= function(tag) {
            common.save(tag,'tags');
        };
        tagModel.prototype.delTag= function(tag) {
            common.delete(tag, 'tags');
        };
        return tagModel;
    }])
.factory('productsFactory',['RestAPI','common',function(RestAPI,common){
        var productModel;
        productModel = function () {
            this.description = "модель для продуктов";
            this.products = common.getAll('products');
            return this;
        };
        productModel.prototype.saveProduct= function(product) {
            // console.log(product);
            common.save(product,'products');
     
        };
        productModel.prototype.delProduct= function(product){
            // console.log(product);
            common.delete(product,'products');

        };
        productModel.prototype.addTag= function(product,tag){
            // console.log("Будем сохранять",product,tag);
            var item = {'product':product.id,'tag':tag.id};
            common.save(item,'producttags');
            // common.delete(product,'products');
        };
        productModel.prototype.delTag= function(product,tag){
            // console.log("Будем  удалять",product,tag);
            var item = {'product':product,'tag':tag};
            common.deleteBy(item,'producttags');
            // common.delete(product,'products');
        };
        return productModel;
    }])
.factory('callsFactory',['RestAPI','common',function(RestAPI,common){
    var callsModel;
    callsModel = function () {
            this.description = "модель для Заказа Звонков";
            this.calls = common.getAll('callbacks');
            return this;
    };
    callsModel.prototype.delCall= function(call){
        // console.log(product);
        common.delete(call,'callbacks');

    };
        return callsModel;
}])
.factory('blogFactory',['RestAPI','common',function(RestAPI,common){
    var blog;
    blog = function () {
        this.description = "модель для Блога";
        this.entries = common.getAll('blog');
        return this;
    };
    blog.prototype.saveEntry = function(entry) {
        // console.log(product);
        common.save(entry,'blog');

    };
    blog.prototype.delEntry = function(entry) {
        // console.log(product);
        common.delete(entry,'blog');

    };
    return blog;
}])

;