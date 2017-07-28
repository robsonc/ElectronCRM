(function () {
    'use strict';

    angular
        .module('bs.sales')
        .controller('EditItemController', EditItemController);

    EditItemController.$inject = ['SaleService', 'Sale', '$scope', '$uibModalInstance', 'item'];
    function EditItemController(SaleService, Sale, $scope, $uibModalInstance, item) {
        var vm = this;

        vm.item = {
            quantity: item.quantity,
            discount: item.discountPercentage,
            unitPrice: item.unitPrice
        };

        vm.finish = finish;

        activate();

        ////////////////

        function activate() {

        }

        function finish(itemData) {
            $uibModalInstance.close(itemData);
        }
    }
})();