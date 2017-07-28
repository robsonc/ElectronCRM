(function () {
    'use strict';

    angular
        .module('bs.sales')
        .factory('SaleService', SaleService);

    SaleService.$inject = ['$q', 'Sale', '$rootScope', '$mongoose', '$moment'];

    function SaleService($q, Sale, $rootScope, $mongoose, $moment) {

        var service = {
            save: save,
            findAll: findAll,
            addItem: addItem,
            removeItem: removeItem,
            removeAll: removeAll,
            remove: remove,
            editItem: editItem,
            addPayment: addPayment,
            removePayment: removePayment,
            getTotalSalesByMonth: getTotalSalesByMonth,
            getTotalSalesByLast7Days: getTotalSalesByLast7Days,
            getTotalSalesByLast30Days: getTotalSalesByLast30Days
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

            Sale.find({}).sort({ createdAt: -1 }).exec(function (err, sales) {
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
                    code: product.code,
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

            Sale.remove({ _id: saleId }, function (err) {
                if (err) deferred.reject(err);
                deferred.resolve();
            });

            return deferred.promise;
        }

        function editItem(saleId, itemId, data) {
            var deferred = $q.defer();

            Sale.findById(saleId, function (err, sale) {
                if (err) deferred.reject(err);
                sale.aplicaDescontoPercentualItem(itemId, data.discount);
                sale.mudaQuantidadeItem(itemId, data.quantity);
                sale.mudaPrecoVendaItem(itemId, data.unitPrice);

                sale.save(function (err) {
                    if (err) deferred.reject(err);
                    deferred.resolve(sale);
                });
            });

            return deferred.promise;
        }

        function addPayment(saleId, value, type) {
            var deferred = $q.defer();

            Sale.findById(saleId, function (err, sale) {
                if (err) deferred.reject(err);

                sale.payments.push({
                    value: value,
                    type: type
                });

                sale.save(function (err, sale) {
                    if (err) deferred.reject(err);
                    deferred.resolve(sale.toJSON());
                });
            });

            return deferred.promise;
        }

        function removePayment(saleId, paymentId) {
            var deferred = $q.defer();

            Sale.findById(saleId).exec(function (err, sale) {
                if (err) deferred.reject(err);

                sale.payments.pull(paymentId);

                sale.save(function (err, sale) {
                    if (err) deferred.reject(err);
                    deferred.resolve(sale.toJSON());
                });
            });

            return deferred.promise;
        }

        function getTotalSalesByMonth() {
            var deferred = $q.defer();

            Sale.aggregate([
                {
                    $project: {
                        total: true,
                        month: { $month: '$createdAt' }
                    }
                },
                {
                    $group: {
                        _id: '$month',
                        amount: { $sum: '$total' }
                    }
                }
            ], function (err, results) {
                if (err) deferred.reject(err);
                deferred.resolve(results);
            });

            return deferred.promise;
        }

        function getTotalSalesByLast7Days() {
            var deferred = $q.defer();

            Sale.aggregate([
                {
                    $match: {
                        createdAt: { $gte: $moment().subtract(7, 'days').toDate() }
                    }
                },
                {
                    $project: {
                        total: true,
                        day: { $dayOfMonth: '$createdAt' }
                    }
                },
                {
                    $group: {
                        _id: '$day',
                        amount: { $sum: '$total' }
                    }
                }
            ], function (err, results) {
                if (err) deferred.reject(err);
                deferred.resolve(results);
            });

            return deferred.promise;
        }

        function getTotalSalesByLast30Days() {
            var deferred = $q.defer();

            Sale.aggregate([
                {
                    $match: {
                        createdAt: { $gte: $moment().subtract(30, 'days').toDate() }
                    }
                },
                {
                    $project: {
                        total: true,
                        day: { $dayOfMonth: '$createdAt' },
                        month: { $month: '$createdAt'}
                    }
                },
                {
                    $group: {
                        _id: '$day',
                        month: { $first: '$month' },
                        amount: { $sum: '$total' }
                    }
                }
            ], function (err, results) {
                if (err) deferred.reject(err);
                deferred.resolve(results);
            });

            return deferred.promise;
        }
    }
})();