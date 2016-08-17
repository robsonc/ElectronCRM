(function() {
'use strict';

    angular
        .module('bs.crm')
        .controller('OrganizationsController', OrganizationsController);

    OrganizationsController.$inject = ['OrganizationService', '$uibModal'];
    function OrganizationsController(OrganizationService, $uibModal) {
        var vm = this;
        vm.organizations = [];

        vm.addOrganization = addOrganization;

        activate();

        ////////////////

        function activate() {
            OrganizationService.findAll().then(function(organizations){
                vm.organizations = organizations;
            });
        }

        function addOrganization(){
            var modalInstance = $uibModal.open({
                templateUrl: './javascripts/crm/partials/new-organization-modal.html',
                controller: 'NewOrganizationController as newOrganizationCtrl',
                size: 'sm'
            });

            modalInstance.result.then(function(organization){
                vm.organizations.push(organization);
            });
        }
    }
})();