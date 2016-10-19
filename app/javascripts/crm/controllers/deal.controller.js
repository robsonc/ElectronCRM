(function () {
    'use strict';

    angular
        .module('bs.crm')
        .controller('DealController', DealController);

    DealController.$inject = ['$stateParams', 'deal', '$uibModal', 'DealService', 
        '$state', 'NoteService', 'ActivityService', 'GoogleCalendarService'];
    function DealController($stateParams, deal, $uibModal, DealService, 
        $state, NoteService, ActivityService, GoogleCalendarService) {
        
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

        activate();

        ////////////////

        function activate() {
            NoteService.findByDeal(deal._id).then(function (notes) {
                vm.notes = notes;
            });

            ActivityService.findByDeal(deal._id).then(function (activities) {
                vm.activities = activities;
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
    }
})();