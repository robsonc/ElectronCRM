(function(){
    'use strict';

    angular
        .module('bs.sales')
        .controller('PaymentController', PaymentController);
    
    PaymentController.$inject = ['SaleService', 'sale', '$filter', '$uibModalInstance'];

    function PaymentController(SaleService, sale, $filter, $uibModalInstance) {
        var vm = this;

        //state
        vm.currentSale = sale;
        vm.payment = {
            value: sale.total
        };
        vm.change = sale.change;

        //actions
        vm.addPayment = addPayment;
        vm.removePayment = removePayment;
        vm.finish = finish;

        activate();

        function activate() {

        }

        ///////////////////////////

        function addPayment(payment) {
            SaleService.addPayment(vm.currentSale._id, payment.value, payment.type)
            .then(function(sale){
                vm.currentSale = sale;

                if (sale.balance < 0) {
                    vm.payment.value = 0;
                    vm.change = $filter('currency')(-sale.change, 'R$ ');
                } else {
                    vm.payment.value = sale.balance;
                }
            
            }, function(err){
                console.log(err);
            });
        }

        function removePayment(paymentId) {
            SaleService.removePayment(vm.currentSale._id, paymentId).then(function(sale){
                vm.currentSale = sale;
            }, function(err){
                console.error(err);
            });
        }

        function finish() {
            $uibModalInstance.close(vm.currentSale);
        }
    }
})();