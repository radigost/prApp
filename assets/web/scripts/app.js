"use strict";


angular
    .module('PrApp', ['restangular','ui.router'])
        // .config(['$httpProvider', function($httpProvider) {
        //     $httpProvider.defaults.useXDomain = true;
        //     $httpProvider.defaults.withCredentials = true;
        //
        //  }])
        // .config(function(RestangularProvider) {
        //     RestangularProvider.setBaseUrl('http://localhost:3578/api');
        // })

        .config(function($stateProvider, $urlRouterProvider,$locationProvider) {

            $urlRouterProvider.otherwise('index')
            $stateProvider
                .state('app', {
                    url:'/',
                    abstract:true,
                    templateUrl:'/web/views/main.html',
                    // abstract:true,
                    // controller:'MagazController',
                    // resolve:{
                    //      len: function (cartFactory) {
                    //          console.log("asdfas");
                    //          return cartFactory.getCart();
                    //     }
                    // }
                })
                .state('app.start',{
                    url:'index',
                    templateUrl: '/web/views/home.html'
                    })
                .state('app.aboutus', {
                    url:'aboutus',
                    templateUrl: '/web/views/aboutus.html'
                })
                .state('app.magaz', {
                    url: 'magaz/:category',
                    views: {
                        '': {
                            templateUrl : '/web/views/magaz.html',
                            controller  : 'MagazController'
                            },
                        'gingerContent@app.magaz':{
                            templateUrl : '/web/views/magaz_products.html',
                            }
                        }
                })
               .state('app.details', {
                    url: 'magaz/:category/:id',
                    views: {
                        '': {
                            templateUrl : '/web/views/magaz.html',
                            controller  : 'MagazController'
                            },
                        'gingerContent@app.details':{
                            templateUrl : '/web/views/magaz_details.html',
                            }
                    }
                })
                .state('app.contactus', {
                    url:'contactus',
                    templateUrl : '/web/views/contactus.html',
                })
                .state('app.cart', {
                    url:'cart',
                    templateUrl : '/web/views/cart.html',
                    controller  : 'CartController',
                    }
                )
                .state('app.masterclass', {
                    url:'masterclass',
                    templateUrl : '/web/views/masterclass.html',
                })
                .state('app.fororder', {
                    url:'fororder',
                    templateUrl : '/web/views/for_order.html',
                })
                .state('app.news', {
                    url:'news',
                    templateUrl : '/web/views/news.html',
                });

            });
// console.log(angular.module('PrApp'));
// console.log($stateProvider);
// angular.module('PrApp').run();
// console.log("SSSS");