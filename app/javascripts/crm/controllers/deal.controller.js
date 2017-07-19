(function () {
    'use strict';

    angular
        .module('bs.crm')
        .controller('DealController', DealController);

    DealController.$inject = ['$stateParams', 'deal', '$uibModal', 'DealService', 
        '$state', 'NoteService', 'ActivityService', 'GoogleCalendarService', '$filter', '$scope'];
    function DealController($stateParams, deal, $uibModal, DealService, 
        $state, NoteService, ActivityService, GoogleCalendarService, $filter, $scope) {
        
        var vm = this;

        vm.deal = deal;
        vm.notes = [];
        vm.activities = [];
        vm.types = [
            { icon: 'phone', name: 'Call' },
            { icon: 'users', name: 'Meeting' },
            { icon: 'clock-o', name: 'Task' },
            { icon: 'envelope-o', name: 'Email' },
            { icon: 'coffee', name: 'Lunch' }
        ];
        vm.startDatepicker = {
            opened: false
        };

        vm.remove = remove;
        vm.addNote = addNote;
        vm.addActivity = addActivity;
        vm.removeNote = removeNote;
        vm.openStartDatepicker = openStartDatepicker;
        vm.removeActivity = removeActivity;
        vm.doneActivity = doneActivity;

        vm.changeTitle = function(newTitle){
            var stripedTitle = String(newTitle).replace(/<[^>]+>/gm, '');
            DealService.changeTitle(deal._id, stripedTitle).then(function(deal){
                console.log('title changed');
            });
        };

        activate();

        ////////////////

        function activate() {
            NoteService.findByDeal(deal._id).then(function (notes) {
                vm.notes = notes;
            });

            ActivityService.findByDeal(deal._id).then(function (activities) {
                vm.activities = activities;
                sort('createdAt');
                sort('isDone');
            });
        }

        function remove(deal) {
            var confirmDialog = $uibModal.open({
                controller: 'ConfirmDialogController as confirmDialogCtrl',
                templateUrl: './partials/confirm-dialog.html'
            });

            confirmDialog.result.then(function () {
                DealService.remove(deal).then(function () {
                    $state.go('app.pipeline');
                });
            });
        }

        function addNote(note) {
            NoteService.save({
                content: note.content,
                deal: deal
            }).then(function (note) {
                vm.notes.push(note);
                vm.note = {};
                console.log('Note saved with success!');
            });
        }

        function addActivity(activity) {
            ActivityService.save({
                content: activity.content,
                startDate: activity.startDate,
                startTime: activity.startTime,
                deal: deal
            }).then(function (activity) {
                GoogleCalendarService.save({
                    summary: activity.content,
                    startDate: activity.startDate,
                    startTime: activity.startTime
                }).then(function success() {
                    console.log('event created on calendar');
                }, function error(err) {
                    console.log(err);
                });

                vm.activities.push(activity);
                vm.activity = {};
                sort('isDone');
                console.log('Activity saved with success!');
            });
        }

        function removeNote(note, $index) {
            NoteService.remove(note).then(function () {
                vm.notes.splice($index, 1);
            });
        }

        function openStartDatepicker() {
            vm.startDatepicker.opened = true;
        }

        function doneActivity(activity, $index){
            if (activity.isDone) {
                ActivityService.undone(activity._id).then(function success() {
                    activity.undo();
                    sort('createdAt');
                    sort('isDone');
                });
            } else {
                ActivityService.done(activity._id).then(function success() {
                    activity.do();
                    sort('isDone');
                });
            }
        }

        function removeActivity(activity, $index) {

            var confirmDialog = $uibModal.open({
                controller: 'ConfirmDialogController as confirmDialogCtrl',
                templateUrl: './partials/confirm-dialog.html'
            });

            confirmDialog.result.then(function(){
                ActivityService.remove(activity._id).then(function success() {
                    vm.activities.splice($index, 1);
                    sort('isDone');
                }, function error(err) {
                    console.log('Erro ao remover a atividade ' + err);
                });
            });
        }

        function sort(property) {
            vm.activities = $filter('orderBy')(vm.activities, property);
        }
    }
})();