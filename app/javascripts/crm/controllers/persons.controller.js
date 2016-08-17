(function() {
'use strict';

    angular
        .module('bs.crm')
        .controller('PersonsController', PersonsController);

    PersonsController.$inject = ['PersonService', '$uibModal'];
    function PersonsController(PersonService, $uibModal) {
        var vm = this;
        vm.persons = [];

        vm.addPerson = addPerson;

        activate();

        ////////////////

        function activate() {
            PersonService.findAll().then(function(persons){
                vm.persons = persons;
            });
        }

        function addPerson(){
            var modalInstance = $uibModal.open({
                templateUrl: './javascripts/crm/partials/new-person-modal.html',
                controller: 'NewPersonController as newPersonCtrl',
                size: 'sm'
            });

            modalInstance.result.then(function(person){
                vm.persons.push(person);
            });
        }
    }
})();