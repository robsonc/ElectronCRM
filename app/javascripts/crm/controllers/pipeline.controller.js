(function() {
'use strict';

    angular
        .module('bs.crm')
        .controller('PipelineController', PipelineController);

    PipelineController.$inject = ['$uibModal', 'StageService', '$scope'];
    function PipelineController($uibModal, StageService, $scope) {
        var vm = this;

        vm.stages = [];
        vm.cardsSortableOptions = {
            connectWith: '.pipeline-column',
            placeholder: 'placeholder panel',
            forcePlaceholderSize: true,
            stop: function(evt, ui){
                if (ui.item.sortable.droptarget) {
                    var stageId = ui.item.sortable.droptarget.attr('id').split('-')[1];
                    var deal = ui.item.sortable.model;
                    
                    StageService.addDeal(stageId, deal).then(function(){
                        console.log('change deal stage');
                    });
                }
            }
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
                vm.stages.forEach(function(stage){
                    if (stage._id.equals(deal.stage._id)) {
                        stage.deals.push(deal);
                    }
                });
            });
        }
    }
})();