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
        vm.closeAlert = closeAlert;

        activate();

        function activate() {
            GoogleCalendarService.get(10).then(function (events) {
                $rootScope.$apply(function () {
                    vm.events = events;
                });
            }, function(error){
                $rootScope.$apply(function(){
                    vm.error = "Houve um erro ao tentar conectar com Google Calendar";
                    console.log(error);
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

        function closeAlert(){
            vm.error = null;
        }
    }
})();