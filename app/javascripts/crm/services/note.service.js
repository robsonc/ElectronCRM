(function() {
'use strict';

    angular
        .module('bs.crm')
        .factory('NoteService', NoteService);

    NoteService.$inject = ['$q', 'Note'];
    function NoteService($q, Note) {
        return {
            save: save,
            findByDeal: findByDeal,
            remove: remove
        };

        function save(note){
            var deferred = $q.defer();

            var newNote = new Note({
                content: note.content,
                deal: note.deal
            });

            newNote.save(function(err, note){
                if (err) deferred.reject(err);
                deferred.resolve(note);
            });

            return deferred.promise;
        }

        function findByDeal(dealId){
            var deferred = $q.defer();

            Note.find({deal: dealId}).exec(function(err, notes){
                if (err) deferred.reject(err);
                deferred.resolve(notes);
            });

            return deferred.promise;
        }

        function remove(note){
            var deferred = $q.defer();

            Note.findById(note._id).exec(function(err, note){
                if (err) deferred.reject(err);
                if (note) {
                    note.remove(function(err){
                        if(err) deferred.reject(err);
                        deferred.resolve();
                    });
                } else {
                    deferred.reject("Note not found");
                }
            });

            return deferred.promise;
        }
    }
})();