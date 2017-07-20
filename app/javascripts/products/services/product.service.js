(function () {
    'use strict';

    angular
        .module('bs.products')
        .factory('ProductService', ProductService);

    ProductService.$inject = ['$q', 'Product', '$rootScope', '$mongoose'];

    function ProductService($q, Product, $rootScope, $mongoose) {

        var service = {
            save: save,
            update: update,
            findAll: findAll,
            findById: findById,
            remove: remove
        };

        return service;

        function save(newProduct) {
            var deferred = $q.defer();

            var product = new Product({
                code: newProduct.code,
                description: newProduct.description,
                costPrice: newProduct.costPrice,
                sellPrice: newProduct.sellPrice
            });

            product.save(function (err, product) {
                if (err) deferred.reject(err);
                deferred.resolve(product.toJSON());
            });

            return deferred.promise;
        }

        function update(productId, product) {
            var deferred = $q.defer();

            Product.update({_id: productId}, {
                code: product.code,
                description: product.description,
                costPrice: product.costPrice,
                sellPrice: product.sellPrice
            }, function (err, raw) {
                if (err) deferred.reject(err);
                deferred.resolve(raw);
            });

            return deferred.promise;
        }

        function findAll() {
            var deferred = $q.defer();

            Product.find({}).exec(function (err, products) {
                if (err) deferred.reject(err);
                deferred.resolve(products.map(function (p) {
                    return p.toJSON();
                }));
            });

            return deferred.promise;
        }

        function remove(productId) {
            var deferred = $q.defer();

            Product.remove({ _id: productId }, function (err) {
                if (err) deferred.reject(err);
                deferred.resolve();
            });

            return deferred.promise;
        }

        function findById(productId) {
            var deferred = $q.defer();

            Product.findById(productId, function (err, product) {
                if (err) deferred.reject(err);

                if (product) {
                    deferred.resolve(product.toJSON());
                } else {
                    deferred.resolve({});
                }
            });

            return deferred.promise;
        }
    }
})();