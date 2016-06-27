'use strict';

/**
 * @ngdoc overview
 * @name adminApp
 * @description
 * # adminApp
 *
 * Main module of the application.
 */
angular.module('adminApp', [ 'ui.router','restangular','toastr','ui.bootstrap']);
console.log("Загрузили модуль");
angular.module('adminApp').config(config);
console.log("Позвали конфигурацию");
function config($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise("/main");
        $stateProvider
            .state ('main',{
                url:'/main',
                templateUrl:'templates/main.html',
                controller:'MainCtrl as main',
                resolve:{
                    orders: function (ordersFactory) {
                         console.log("resolvin orders");
                        var s;
                        s = new ordersFactory;
                        return s;
                    },
                    users: function (usersFactory) {
                        console.log("resolvins");
                        var s;
                        s = new usersFactory;
                        return s;
                    },
                },

            })
            .state('products',{
                url:'/products',
                templateUrl:'templates/products.html',
                controller:'ProductsCtrl as main',
                resolve: {
                    tags: function (tagsFactory) {
                        // console.log("resolvin tags");
                        var s;
                        s = new tagsFactory;
                        return s;
                    },
                    products: function (productsFactory) {
                        // console.log("resolvin products");
                        var s;
                        s = new productsFactory;
                        return s;
                    },
                }
            })
            .state('blog',{
                url:'/blog',
                templateUrl:'templates/blog.html',
                controller:'BlogCtrl as main',
                resolve: {
                    entries: function (blogFactory) {
                        // console.log("resolvin entries");
                        var s;
                        s = new blogFactory;
                        return s;
                    },
                }
            })
            .state('callback',{
                url:'/callback',
                templateUrl:'templates/callback.html',
                controller:'CallbackCtrl as main',
                resolve: {
                    calls: function (callsFactory) {
                        // console.log("resolvin calls");
                        var s;
                        s = new callsFactory;
                        return s;
                    },
                }
            })
        ;
    };
