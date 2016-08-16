(function() {
'use strict';

    angular
        .module('bs.crm')
        .controller('NewDealController', NewDealController);

    NewDealController.$inject = ['DealService', 'OrganizationService', 'PersonService', 'StageService', '$uibModalInstance'];
    function NewDealController(DealService, OrganizationService, PersonService, StageService, $uibModalInstance) {
        var vm = this;
        
        vm.deal = {};

        vm.save = save;
        vm.getPerson = getPerson;
        vm.getOrganization = getOrganization;

        activate();

        ////////////////

        function activate() {
            StageService.findAll().then(function(stages){
                vm.stages = stages;
            });
        }

        function save(deal){
            DealService.save({
                title: deal.title,
                value: deal.value,
                person: deal.person,
                organization: deal.organization,
                stage: deal.stage
            }).then(function(deal){
                vm.formNewDeal.$setPristine();
                vm.deal = {};
                $uibModalInstance.close(deal);
            });
        }

        function getPerson(name){
            return PersonService.findByName(name).then(function(persons){
                return persons;
            });
        }

        function getOrganization(name){
            return OrganizationService.findByName(name).then(function(organizations){
                return organizations;
            });
        }
    }
})();