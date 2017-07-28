(function () {
    'use strict';

    angular
        .module('bs.sales')
        .controller('POSController', POSController);

    POSController.$inject = ['SaleService', 'ProductService', 'Sale', 'Product', '$scope', '$uibModal'];
    function POSController(SaleService, ProductService, Sale, Product, $scope, $uibModal) {
        var vm = this;

        vm.products = [];
        vm.quantity = 1;
        vm.currentSale = null;
        vm.selectedProduct = null;

        vm.getProduct = getProduct;
        vm.addItem = addItem;
        vm.removeItem = removeItem;
        vm.selectProduct = selectProduct;
        vm.editItem = editItem;
        vm.pay = pay;

        activate();

        ////////////////
        function activate() {
            SaleService.save().then(function (sale) {
                vm.currentSale = sale;
            });

            ProductService.findAll().then(function (products) {
                vm.products = products;
            });
        }

        function getProduct(description) {

            var text = new RegExp(".*" + description + ".*", "i");
            return Product.find({ $or: [{ description: text }, { code: description }] })
                .exec(function (err, products) {
                    if (err) return console.log(err);
                    return products.map(function (p) {
                        return p.toJSON();
                    });
                });
        }

        function addItem($item, $model, $label, $event) {
            SaleService.addItem(vm.currentSale._id, vm.selectedProduct, vm.quantity).then(function (sale) {
                vm.currentSale = sale;
                vm.selectedProduct = null;
                vm.quantity = 1;
            });
        }

        function selectProduct(product) {
            vm.selectedProduct = product;
            vm.addItem();
        }

        function removeItem(itemId) {
            SaleService.removeItem(vm.currentSale._id, itemId).then(function (sale) {
                vm.currentSale = sale;
            }, function (err) {
                console.log(err);
            });
        }

        function editItem(item) {

            var modalInstance = $uibModal.open({
                templateUrl: './javascripts/sales/partials/edit-item-modal.html',
                size: 'sm',
                controller: 'EditItemController as editItemCtrl',
                resolve: {
                    item: item
                }
            });

            modalInstance.result.then(function (itemData) {
                SaleService.editItem(vm.currentSale._id, item._id, itemData).then(function (sale) {
                    console.log(sale);
                    vm.currentSale = sale;
                }, function (err) {
                    console.log(err);
                });
            });
        }

        function pay() {
            var modalInstance = $uibModal.open({
                templateUrl: './javascripts/sales/partials/payment-modal.html',
                size: 'lg',
                controller: 'PaymentController as paymentCtrl',
                resolve: {
                    sale: vm.currentSale
                }
            });

            modalInstance.result.then(function (sale) {
                vm.currentSale = sale;
            });
        }
    }

})();