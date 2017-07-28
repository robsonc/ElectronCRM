(function () {
    'use strict';

    angular
        .module('bs.products')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['ProductService', 'Product', '$scope', '$uibModal'];
    function ProductsController(ProductService, Product, $scope, $uibModal) {
        var vm = this;

        vm.products = [];

        vm.removeProduct = removeProduct;

        activate();

        ////////////////

        function activate() {
            ProductService.findAll().then(function (products) {
                vm.products = products;
            });
        }

        function removeProduct(index, productId) {

            var confirmDialog = $uibModal.open({
                controller: 'ConfirmDialogController as confirmDialogCtrl',
                templateUrl: './partials/confirm-dialog.html'
            });

            confirmDialog.result.then(function () {
                ProductService.remove(productId).then(function () {
                    vm.products.splice(index, 1);
                }, function (err) {
                    console.log(err);
                });
            });

        }
    }
})();