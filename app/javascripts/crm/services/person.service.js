(function() {
'use strict';

    angular
        .module('bs.crm')
        .factory('PersonService', PersonService);

    PersonService.$inject = ['$q', 'Person'];
    function PersonService($q, Person) {
        
        return {
            save: save,
            findByName: findByName,
            findAll: findAll
        };

        function save(person){
            var deferred = $q.defer();

            var newPerson = Person({
                name: person.name
            });

            newPerson.save(function(err, person){
                if(err) deferred.reject(err);
                deferred.resolve(person);
            });

            return deferred.promise;
        }

        function findByName(name){
            var deferred = $q.defer();

            var text = new RegExp(".*" + name + ".*", "i");
            Person.find({name: text}).exec(function(err, persons){
                if (err) deferred.reject(err);
                deferred.resolve(persons);
            });

            return deferred.promise;
        }

        function findAll(){
            var deferred = $q.defer();

            Person.find().exec(function(err, persons){
                if (err) deferred.reject(err);
                deferred.resolve(persons);
            });

            return deferred.promise;
        }
    }
})();