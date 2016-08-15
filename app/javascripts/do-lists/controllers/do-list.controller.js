(function () {
    'use strict';

    angular
        .module('bs.dolists')
        .controller('DoListController', DoListController);

    DoListController.$inject = [
        'DoListService', 
        '$stateParams', 
        '$window', 
        'TodoService', 
        '$state', 
        '_', 
        '$filter', 
        '$scope', 
        'GoogleCalendarService',
        '$uibModal'
    ];
    
    function DoListController(DoListService, $stateParams, $window, TodoService, 
        $state, _, $filter, $scope, GoogleCalendarService, $uibModal) {
        
        var vm = this;

        vm.startDatepicker = {
            opened: false
        };

        vm.sortableOptions = {
            axis: 'y',
            stop: function (evt, ui) {
                var reorderedTodos = ui.item.sortable.sourceModel;
                DoListService.reorder(reorderedTodos).then(function success(todos) {
                    console.log('To-dos reordered!');
                });
            }
        };

        vm.addTodo = addTodo;
        vm.removeTodo = removeTodo;
        vm.removeDoList = removeDoList;
        vm.doneTodo = doneTodo;
        vm.showSettings = showSettings;
        vm.openStartDatepicker = openStartDatepicker;

        activate();

        ////////////////

        function activate() {
            var doListId = $stateParams.doListId;
            DoListService.findById(doListId).then(function success(doList) {
                vm.doList = doList;
                sort('isDone');
            });
        }

        function addTodo(newTodo) {
            TodoService.save({
                name: newTodo.name,
                startDate: newTodo.startDate,
                startTime: newTodo.startTime,
                belongsTo: vm.doList
            }).then(function success(todo) {
                vm.doList.todos.push(todo);
                vm.todo = {};
                sort('isDone');
                
                if(newTodo.addToCalendar) {
                    GoogleCalendarService.save({
                        summary: todo.name,
                        startDate: todo.startDate,
                        startTime: todo.startTime
                    }).then(function success() {
                        console.log('event created on calendar');
                    }, function error(err){
                        console.log(err);
                    });
                }
                
            });
        }

        function removeTodo(todo, $index) {

            var confirmDialog = $uibModal.open({
                controller: 'ConfirmDialogController as confirmDialogCtrl',
                templateUrl: './partials/confirm-dialog.html'
            });

            confirmDialog.result.then(function(){
                TodoService.remove(todo._id).then(function success() {
                    vm.doList.todos.splice($index, 1);
                    sort('isDone');
                }, function error(err) {
                    console.log('Erro ao remove todo ' + err);
                });
            });
        }

        function removeDoList(doList) {

            var confirmDialog = $uibModal.open({
                controller: 'ConfirmDialogController as confirmDialogCtrl',
                templateUrl: './partials/confirm-dialog.html'
            });

            confirmDialog.result.then(function(){
                DoListService.remove(doList._id).then(function success() {
                    $state.go('app.doLists');
                });
            });
        }

        function doneTodo(todo, $index) {
            if (todo.isDone) {
                TodoService.undone(todo._id).then(function success() {
                    todo.undo();
                    sort('priority');
                    sort('isDone');
                });
            } else {
                TodoService.done(todo._id).then(function success() {
                    todo.do();
                    sort('isDone');
                });
            }
        }

        function sort(property) {
            vm.doList.todos = $filter('orderBy')(vm.doList.todos, property);
        }

        function showSettings(doList) {
            $state.go('app.doListSettings', { doListId: doList._id });
        }

        function openStartDatepicker() {
            vm.startDatepicker.opened = true;
        }
    }
})();