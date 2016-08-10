(function () {
    'use strict';

    angular.module('TodoList').controller('MainController', MainController);
    MainController.$inject = ['$mongoose', 'TodoService', 'ipcRenderer', 'GoogleCalendarService', '$rootScope'];
    function MainController($mongoose, TodoService, ipcRenderer, GoogleCalendarService, $rootScope) {
        var vm = this;

        vm.event = {};
        vm.permission = permission;
        vm.authorize = authorize;
        vm.save = save;

        activate();

        function activate() {
            GoogleCalendarService.get(10).then(function (events) {
                $rootScope.$apply(function () {
                    vm.events = events;
                });
            });
        }

        function permission() {
            ipcRenderer.send('google-grant-permission');
        }

        function authorize(google) {
            if (!google) return console.log("Invalid code");
            ipcRenderer.send('google-authorize', { code: google.code });
            vm.google = {};
        }

        function save(event) {
            GoogleCalendarService.save(event).then(function (event) {
                $rootScope.$apply(function () {
                    vm.events.push(event);
                    vm.event = {};
                });
            }, function (err) {
                console.log(err);
            });
        }
    }
})();