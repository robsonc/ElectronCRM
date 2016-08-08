(function () {
    'use strict';

    angular
        .module('TodoList')
        .controller('DoListController', DoListController);

    DoListController.$inject = ['DoListService', '$stateParams', '$window', 'TodoService', '$state'];
    function DoListController(DoListService, $stateParams, $window, TodoService, $state) {
        var vm = this;

        vm.back = back;
        vm.addTodo = addTodo;
        vm.removeTodo = removeTodo;
        vm.removeDoList = removeDoList;

        activate();

        ////////////////

        function activate() {
            var doListId = $stateParams.doListId;
            DoListService.findById(doListId).then(function (doList) {
                vm.doList = doList;
            });
        }

        function back() {
            $window.history.back();
        }

        function addTodo(todo) {
            console.log(vm.doList);
            TodoService.save({ name: todo.name, belongsTo: vm.doList }).then(function (todo) {
                vm.doList.todos.push(todo);
                vm.todo = {};
            });
        };

        function removeTodo(todo, $index) {
            TodoService.remove(todo._id).then(function () {
                vm.doList.todos.splice($index, 1);
            }, function (err) {
                console.log('Erro ao remove todo ' + err);
            });
        }

        function removeDoList(doList){
            DoListService.remove(doList._id).then(function(){
                $state.go('app.doLists');
            });
        }
    }
})();