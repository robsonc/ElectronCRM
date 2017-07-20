(function() {
    'use strict';

    angular.module('bs.products').config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider){
        //your config goes here
        $stateProvider.state('app.products', {
            url: 'products',
            templateUrl: './javascripts/products/partials/products.html',
            controller: 'ProductsController as productsCtrl'
        }).state('app.product', {
            url: 'product',
            params: {
                productId: {
                    value: null,
                    squash: true
                }
            },
            templateUrl: './javascripts/products/partials/product.html',
            controller: 'ProductController as productCtrl',
            resolve: {
                product: ['$stateParams', 'ProductService', function($stateParams, ProductService){
                    return ProductService.findById($stateParams.productId).then(function(product){
                        return product;
                    }, function(err){
                        console.log(err);
                    });
                }]
            }
        });
    }
})();