(function() {
'use strict';

    angular
        .module('bs.crm')
        .controller('DealController', DealController);

    DealController.$inject = ['$stateParams', 'deal', '$uibModal', 'DealService', '$state', 'NoteService'];
    function DealController($stateParams, deal, $uibModal, DealService, $state, NoteService) {
        var vm = this;

        vm.deal = deal;
        vm.notes = [];

        vm.remove = remove;
        vm.addNote = addNote;
        vm.removeNote = removeNote;

        activate();

        ////////////////

        function activate() {
            NoteService.findByDeal(deal._id).then(function(notes){
                vm.notes = notes;
            });
        }

        function remove(deal){
            var confirmDialog = $uibModal.open({
                controller: 'ConfirmDialogController as confirmDialogCtrl',
                templateUrl: './partials/confirm-dialog.html'
            });

            confirmDialog.result.then(function(){
                DealService.remove(deal).then(function(){
                    $state.go('app.pipeline');
                });
            });
        }

        function addNote(note){
            NoteService.save({
                content: note.content,
                deal: deal
            }).then(function(note){
                vm.notes.push(note);
                vm.note = {};
                console.log('note saved with success!');
            });
        }

        function removeNote(note, $index){
            NoteService.remove(note).then(function(){
                vm.notes.splice($index, 1);
            });
        }
    }
})();