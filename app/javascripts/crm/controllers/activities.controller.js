(function(){
    'use strict';

    angular
        .module('bs.crm')
        .controller('ActivitiesController', ActivitiesController);
    
    ActivitiesController.$inject = ['ActivityService'];
    
    function ActivitiesController(ActivityService){
        
        var vm = this;

        activate();
        
        function activate(){
            ActivityService.findAllNotDone().then(function(activities){
                vm.activities = activities;
            });
        }
    }
})();