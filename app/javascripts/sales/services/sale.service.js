(function () {
    'use strict';

    angular
        .module('bs.sales')
        .factory('SaleService', SaleService);

    SaleService.$inject = ['$q', 'Sale', '$rootScope'];

    function SaleService($q, Sale, $rootScope) {

        var service = {
            save: save,
            findAll: findAll,
            addItem: addItem,
            removeItem: removeItem
        };

        return service;

        function save(newSale) {
            var deferred = $q.defer();

            var sale = new Sale({
                identifier: 'Test'
            });

            sale.save(function (err, sale) {
                if (err) return deferred.reject(err);
                return deferred.resolve(sale);
            });

            return deferred.promise;
        }

        function findAll() {
            var deferred = $q.defer();

            Sale.find({}).exec(function (err, sales) {
                if (err) deferred.reject(err);
                deferred.resolve(sales);
            });

            return deferred.promise;
        }

        function addItem(saleId, product) {
            var deferred = $q.defer();

            Sale.findById(saleId).exec(function (err, sale) {
                if (err) deferred.reject(err);

                sale.lineItems.push({
                    description: product.description,
                    unitPrice: product.sellPrice,
                    quantity: 1
                });

                sale.save(function (err) {
                    if (err) deferred.reject(err);
                    deferred.resolve(sale);
                });
            });

            return deferred.promise;
        }

        function removeItem(saleId, itemId) {
            var deferred = $q.defer();

            Sale.findById(saleId).exec(function (err, sale) {
                if (err) deferred.reject(err);

                sale.lineItems.id(itemId).remove();
                
                sale.save(function (err) {
                    if (err) deferred.reject(err);
                    deferred.resolve(sale);
                });
            });

            return deferred.promise;
        }
    }
})();