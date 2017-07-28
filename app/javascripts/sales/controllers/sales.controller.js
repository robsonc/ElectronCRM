(function () {
    'use strict';

    angular
        .module('bs.sales')
        .controller('SalesController', SalesController);

    SalesController.$inject = ['SaleService', 'Sale', '$scope', '$uibModal'];
    function SalesController(SaleService, Sale, $scope, $uibModal) {
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
            var confirmDialog = $uibModal.open({
                controller: 'ConfirmDialogController as confirmDialogCtrl',
                templateUrl: './partials/confirm-dialog.html'
            });

            confirmDialog.result.then(function () {
                SaleService.removeAll().then(function () {
                    console.log('All sales removed');
                    vm.sales = [];
                }, function (err) {
                    console.log(err);
                });
            });
        }

        function removeSale(index, saleId) {
            var confirmDialog = $uibModal.open({
                controller: 'ConfirmDialogController as confirmDialogCtrl',
                templateUrl: './partials/confirm-dialog.html'
            });

            confirmDialog.result.then(function () {
                SaleService.remove(saleId).then(function () {
                    vm.sales.splice(index, 1);
                }, function (err) {
                    console.log(err);
                });
            });
        }
    }
})();