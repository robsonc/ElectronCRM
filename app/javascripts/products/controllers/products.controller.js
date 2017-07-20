(function () {
    'use strict';

    angular
        .module('bs.products')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['ProductService', 'Product', '$scope'];
    function ProductsController(ProductService, Product, $scope) {
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
            ProductService.remove(productId).then(function(){
                vm.products.splice(index, 1);
            }, function(err){
                console.log(err);
            });
        }
    }
})();