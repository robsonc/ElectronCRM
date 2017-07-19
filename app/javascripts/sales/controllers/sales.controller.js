(function () {
    'use strict';

    angular
        .module('bs.sales')
        .controller('SalesController', SalesController);

    SalesController.$inject = ['SaleService', 'Sale'];
    function SalesController(SaleService, Sale) {
        var vm = this;

        vm.sales = [];
        vm.newSale = newSale;

        activate();

        ////////////////

        function activate() {
            SaleService.findAll().then(function (sales) {
                vm.sales = sales;
            });
        }

        function newSale() {
            SaleService.save({

            }).then(function (sale) {
                SaleService.addItem(sale._id, {
                    description: 'COCA COLA',
                    unitPrice: 20,
                    quantity: 3
                }).then(function(sale){
                    console.log(sale);
                    vm.sales.push(sale);
                }, function(err){
                    console.log(err);
                });
            }, function (err) {
                console.log(err);
            });
        }
    }
})();