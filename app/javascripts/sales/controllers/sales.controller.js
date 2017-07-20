(function () {
    'use strict';

    angular
        .module('bs.sales')
        .controller('SalesController', SalesController);

    SalesController.$inject = ['SaleService', 'Sale', '$scope'];
    function SalesController(SaleService, Sale, $scope) {
        var vm = this;

        vm.sales = [];

        vm.clearSales = clearSales;
        vm.removeSale = removeSale;

        activate();

        ////////////////

        function activate() {
            SaleService.findAll().then(function (sales) {
                vm.sales = sales;
            });
        }

        function clearSales() {
            SaleService.removeAll().then(function(){
                console.log('All sales removed');
                vm.sales = [];
            }, function(err){
                console.log(err);
            });
        }

        function removeSale(index, saleId) {
            console.log(index);
            console.log(saleId);
            SaleService.remove(saleId).then(function(){
                vm.sales.splice(index, 1);
            }, function(err){
                console.log(err);
            });
        }
    }
})();