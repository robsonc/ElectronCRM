(function () {
    'use strict';

    angular.module('TodoList').controller('MainController', MainController);
    MainController.$inject = ['$mongoose', 'TodoService'];
    function MainController($mongoose, TodoService) {
        var vm = this;
    }
})();