(function() {
'use strict';

    angular
        .module('bs.crm')
        .controller('NewPersonController', NewPersonController);

    NewPersonController.$inject = ['$uibModalInstance', 'PersonService'];
    function NewPersonController($uibModalInstance, PersonService) {
        var vm = this;
        
        vm.person = {};

        vm.save = save;

        activate();

        ////////////////

        function activate() { }

        function save(person){
            PersonService.save({
                name: person.name,
                phone: person.phone,
                email: person.email
            }).then(function(person){
                $uibModalInstance.close(person);
            });
        }
    }
})();