(function() {
'use strict';

    angular
        .module('TodoList')
        .controller('ConfirmDialogController', ConfirmDialogController);

    ConfirmDialogController.$inject = ['$uibModalInstance'];
    function ConfirmDialogController($uibModalInstance) {
        var vm = this;
        
        vm.confirm = confirm;
        vm.cancel = cancel;

        function confirm(){
            $uibModalInstance.close();
        }

        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
    }
})();