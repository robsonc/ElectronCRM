(function() {
'use strict';

    angular
        .module('TodoList')
        .controller('DoListsController', DoListsController);

    DoListsController.$inject = ['DoListService'];
    function DoListsController(DoListService) {
        var vm = this;
        var defaultColor = "#6B4FBB";
        
        vm.sortableOptions = {
            handle: '.fa.fa-list',
            cursor: 'move',
            revert: true,
            stop: function(evt, ui){
                // ui.item.sortable.sourceModel
                DoListService.sortable(ui.item.sortable.sourceModel);
            }
        };

        vm.addDoList = addDoList;
        vm.doList = {
            color: defaultColor
        };

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
                delete vm.doList.name;
            });
        }
    }
})();