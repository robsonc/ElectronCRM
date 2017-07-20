(function () {
    'use strict';

    angular
        .module('bs.sales')
        .factory('SaleService', SaleService);

    SaleService.$inject = ['$q', 'Sale', '$rootScope', '$mongoose'];

    function SaleService($q, Sale, $rootScope, $mongoose) {

        var service = {
            save: save,
            findAll: findAll,
            addItem: addItem,
            removeItem: removeItem,
            removeAll: removeAll,
            remove: remove
        };

        return service;

        function save(newSale) {
            var deferred = $q.defer();

            var sale = new Sale();

            sale.save(function (err, sale) {
                if (err) return deferred.reject(err);
                return deferred.resolve(sale.toJSON());
            });

            return deferred.promise;
        }

        function findAll() {
            var deferred = $q.defer();

            Sale.find({}).exec(function (err, sales) {
                if (err) deferred.reject(err);
                deferred.resolve(sales.map(function (s) {
                    return s.toJSON();
                }));
            });

            return deferred.promise;
        }

        function addItem(saleId, product, quantity) {
            var deferred = $q.defer();

            Sale.findById(saleId).exec(function (err, sale) {
                if (err) deferred.reject(err);

                sale.lineItems.push({
                    description: product.description,
                    unitPrice: product.sellPrice,
                    quantity: quantity
                });

                sale.save(function (err, sale) {
                    if (err) deferred.reject(err);
                    deferred.resolve(sale.toJSON());
                });
            });

            return deferred.promise;
        }

        function removeItem(saleId, itemId) {
            var deferred = $q.defer();

            Sale.findById(saleId).exec(function (err, sale) {
                if (err) deferred.reject(err);

                sale.lineItems.pull(itemId);

                sale.save(function (err, sale) {
                    if (err) deferred.reject(err);
                    deferred.resolve(sale.toJSON());
                });
            });

            return deferred.promise;
        }

        function removeAll() {
            var deferred = $q.defer();

            Sale.remove({}, function (err) {
                if (err) deferred.reject(err);
                deferred.resolve();
            });

            return deferred.promise;
        }

        function remove(saleId) {
            var deferred = $q.defer();

            Sale.remove({ _id: saleId}, function (err) {
                if (err) deferred.reject(err);
                deferred.resolve();
            });

            return deferred.promise;
        }
    }
})();