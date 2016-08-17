(function() {
'use strict';

    angular
        .module('bs.crm')
        .controller('NewOrganizationController', NewOrganizationController);

    NewOrganizationController.$inject = ['OrganizationService', '$uibModalInstance'];
    function NewOrganizationController(OrganizationService, $uibModalInstance) {
        var vm = this;

        vm.organization = {};
        
        vm.save = save;

        activate();

        ////////////////

        function activate() { }

        function save(organization){
            OrganizationService.save({
                name: organization.name
            }).then(function(organization){
                $uibModalInstance.close(organization);
            });
        }
    }
})();