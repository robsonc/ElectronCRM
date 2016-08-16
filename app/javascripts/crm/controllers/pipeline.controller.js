(function() {
'use strict';

    angular
        .module('bs.crm')
        .controller('PipelineController', PipelineController);

    PipelineController.$inject = ['$uibModal', 'StageService'];
    function PipelineController($uibModal, StageService) {
        var vm = this;

        vm.stages = [];
        vm.cardsSortableOptions = {
            connectWith: '.pipeline-column',
            placeholder: 'placeholder panel',
            forcePlaceholderSize: true
        };

        vm.newDeal = newDeal;

        activate();

        ////////////////

        function activate() { 
            StageService.findAll().then(function(stages){
                vm.stages = stages;
            }, function(err){
                console.log(err);
            });
        }

        function newDeal(){
            var modalInstance = $uibModal.open({
                templateUrl: './javascripts/crm/partials/new-deal-modal.html',
                size: 'sm',
                controller: 'NewDealController as newDealCtrl'
            });

            modalInstance.result.then(function(deal){
                console.log(deal.title);
                vm.stages.forEach(function(stage){
                    if (stage._id.equals(deal.stage._id)) {
                        stage.deals.push(deal);
                    }
                });
            });
        }
    }
})();