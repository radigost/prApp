'use strict';

/**
 * @ngdoc overview
 * @name adminApp
 * @description
 * # adminApp
 *
 * Main module of the application.
 */
angular
    .module('adminApp', [
        // 'ngAnimate',
        // 'ngResource',
        'ui.router',
        'restangular',
    ])
    .config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise("/main")
        $stateProvider
            .state ('main',{
                url:'/main',
                templateUrl:'templates/main.html',
                controller:'MainCtrl as main',
                resolve:{
                    orders: function (ordersFactory) {
                         console.log("resolvins");
                        var s;
                        s = new ordersFactory;
                        return s;
                    },
                },

            })
            .state('products',{
                url:'/products',
                templateUrl:'templates/products.html',
                controller:'ProductsCtrl'
            })
            .state('blog',{
                url:'/blog',
                templateUrl:'templates/blog.html',
                controller:'BlogCtrl'
            })
            .state('callback',{
                url:'/callback',
                templateUrl:'templates/callback.html',
                controller:'CallbackCtrl'
            })
        ;
    })
;
