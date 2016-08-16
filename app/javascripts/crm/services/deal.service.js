(function() {
'use strict';

    angular
        .module('bs.crm')
        .factory('DealService', DealService);

    DealService.$inject = ['$q', 'Deal'];
    function DealService($q, Deal) {
        
        return {
            save: save
        };

        function save(deal){
            var deferred = $q.defer();

            var newDeal = Deal({
                title: deal.title,
                value: deal.value,
                person: deal.person,
                organization: deal.organization,
                stage: deal.stage
            });

            newDeal.save(function(err, deal){
                if(err) deferred.reject(err);
                deferred.resolve(deal);
            });

            return deferred.promise;
        }
    }
})();