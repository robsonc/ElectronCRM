(function() {
'use strict';

    angular
        .module('TodoList')
        .controller('NavController', NavController);

    NavController.$inject = [];
    function NavController() {
        var vm = this;
        
        vm.name = 'Todo List';
    }
})();