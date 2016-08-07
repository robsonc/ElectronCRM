(function () {
    'use strict';

    angular.module('TodoList').controller('MainController', MainController);
    MainController.$inject = ['$mongoose', 'TodoService'];
    function MainController($mongoose, TodoService) {
        var vm = this;

        vm.todos = [];

        TodoService.findAll().then(function (todos) {
            vm.todos = todos;
        });

        vm.addTodo = function (todo) {
            TodoService.save(todo).then(function (todo) {
                console.log('todo saved with success!');
                vm.todos.push(todo);
                vm.todo = {};
            });
        };

        vm.removeTodo = function (todo, $index) {
            TodoService.remove(todo._id).then(function () {
                vm.todos.splice($index, 1);
            }, function (err) {
                console.log('Erro ao remove todo ' + err);
            });
        }
    }
})();