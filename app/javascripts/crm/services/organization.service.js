(function() {
'use strict';

    angular
        .module('bs.crm')
        .factory('OrganizationService', OrganizationService);

    OrganizationService.$inject = ['$q', 'Organization'];
    function OrganizationService($q, Organization) {
        
        return {
            save: save,
            findByName: findByName,
            findAll: findAll
        };

        function save(organization){
            var deferred = $q.defer();

            var newOrganization = Organization({
                name: organization.name
            });

            newOrganization.save(function(err, organization){
                if(err) deferred.reject(err);
                deferred.resolve(organization);
            });

            return deferred.promise;
        }

        function findByName(name){
            var deferred = $q.defer();

            var text = new RegExp(".*" + name + ".*", "i");
            Organization.find({name: text}).exec(function(err, organizations){
                if (err) deferred.reject(err);
                deferred.resolve(organizations);
            });

            return deferred.promise;
        }

        function findAll(){
            var deferred = $q.defer();

            Organization.find().exec(function(err, organizations){
                if (err) deferred.reject(err);
                deferred.resolve(organizations);
            });

            return deferred.promise;
        }
    }
})();