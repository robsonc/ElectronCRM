(function () {
    'use strict';

    angular
        .module('bs.sales')
        .controller('POSController', POSController);

    POSController.$inject = ['SaleService', 'Sale', 'Product', '$scope'];
    function POSController(SaleService, Sale, Product, $scope) {
        var vm = this;

        vm.products = [];
        vm.quantity = 1;
        vm.currentSale = null;
        vm.selectedProduct = null;

        vm.getProduct = getProduct;
        vm.addItem = addItem;
        vm.removeItem = removeItem;

        activate();

        ////////////////
        function activate() {
            SaleService.save().then(function (sale) {
                vm.currentSale = sale;
            });
        }

        function getProduct(description) {

            var text = new RegExp(".*" + description + ".*", "i");
            return Product.find({ description: text }).exec(function (err, products) {
                if (err) return console.log(err);
                return products.map(function (p) {
                    return p.toJSON();
                });
            });
        }

        function addItem() {
            SaleService.addItem(vm.currentSale._id, vm.selectedProduct, vm.quantity).then(function (sale) {
                vm.currentSale = sale;
                vm.selectedProduct = null;
            });
        }

        function removeItem(itemId) {
            SaleService.removeItem(vm.currentSale._id, itemId).then(function (sale) {
                vm.currentSale = sale;
            }, function (err) {
                console.log(err);
            });
        }
    }

})();