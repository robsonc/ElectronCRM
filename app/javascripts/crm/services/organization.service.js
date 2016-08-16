(function() {
'use strict';

    angular
        .module('bs.crm')
        .factory('OrganizationService', OrganizationService);

    OrganizationService.$inject = ['$q', 'Organization'];
    function OrganizationService($q, Organization) {
        
        return {
            save: save,
            findByName: findByName
        };

        function save(organization){
            var deferred = $q.defer();

            var newOrganization = Organization({
                title: deal.title,
                value: deal.value
            });

            newOrganization.save(function(err, organization){
                if(err) deferred.reject(err);
                deferred.resolve(organization);
            });

            return deferred.promise;
        }

        function findByName(name){
            var deferred = $q.defer();

            Organization.find({name: name}).exec(function(err, organizations){
                if (err) deferred.reject(err);
                deferred.resolve(organizations);
            });

            return deferred.promise;
        }
    }
})();