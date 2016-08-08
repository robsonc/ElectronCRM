(function() {
'use strict';

    angular
        .module('TodoList')
        .controller('DoListsController', DoListsController);

    DoListsController.$inject = ['DoListService'];
    function DoListsController(DoListService) {
        var vm = this;
        
        vm.addDoList = addDoList;

        activate();

        ////////////////

        function activate() { 

            DoListService.findAll().then(function(doLists){
                vm.doLists = doLists;
            });
        }

        function addDoList(doList){
            DoListService.save(doList).then(function(doList){
                vm.doLists.push(doList);
                vm.doList = {};
            });
        }
    }
})();