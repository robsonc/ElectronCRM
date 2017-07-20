(function () {
    'use strict';

    angular
        .module('bs.products')
        .controller('ProductController', ProductController);

    ProductController.$inject = ['ProductService', 'Product', '$scope', 'product'];
    function ProductController(ProductService, Product, $scope, product) {
        var vm = this;

        vm.product = product;

        vm.save = save;

        activate();

        ////////////////

        function activate() {

        }

        function save(product) {
            if (product._id) {
                ProductService.update(product._id, product).then(function (raw) {
                    console.log(raw);
                }, function (err) {
                    console.log(err);
                });
            } else {
                ProductService.save(product).then(function (product) {
                    console.log(product);
                }, function (err) {
                    console.log(err);
                });
            }
        }
    }
})();