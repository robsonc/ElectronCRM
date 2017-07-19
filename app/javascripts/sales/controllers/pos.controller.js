(function () {
    'use strict';

    angular
        .module('bs.sales')
        .controller('POSController', POSController);

    POSController.$inject = ['SaleService', 'Sale', 'Product', '$scope'];
    function POSController(SaleService, Sale, Product, $scope) {
        var vm = this;
        
        vm.products = [];
        vm.currentSale = null;
        vm.selectedProduct = null;

        vm.getProduct = getProduct;
        vm.addItem = addItem;
        vm.removeItem = removeItem;

        activate();

        ////////////////
        function activate() {
            SaleService.save().then(function (sale) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        vm.currentSale = sale;
                    });
                }, 1000);
            });
        }

        function getProduct(description) {

            var text = new RegExp(".*" + description + ".*", "i");
            return Product.find({ description: text }).exec(function (err, products) {
                if (err) return console.log(err);
                return products;
            });
        }

        function addItem() {
            SaleService.addItem(vm.currentSale._id, vm.selectedProduct).then(function (sale) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        vm.currentSale = sale;
                        vm.selectedProduct = null;
                    });
                }, 1000);
            });
        }

        function removeItem(itemId) {
            SaleService.removeItem(vm.currentSale._id, itemId).then(function (sale) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        vm.currentSale = sale;
                    });
                }, 1000);
            }, function(err){
                console.log(err);
            });
        }
    }

})();