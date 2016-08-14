(function() {
'use strict';

    angular
        .module('TodoList')
        .controller('DoListSettingsController', DoListSettingsController);

    DoListSettingsController.$inject = ['$stateParams', 'doList', 'DoListService'];
    function DoListSettingsController($stateParams, doList, DoListService) {
        var vm = this;

        vm.doList = doList;
        
        vm.save = save;

        activate();

        ////////////////

        function activate() {
            
        }

        function save(doList){
            DoListService.update(doList._id, {
                name: doList.name,
                color: doList.color
            }).then(function(doList){
                console.log('Lista salva com sucesso');
            });
        }
    }
})();