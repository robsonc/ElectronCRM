(function() {
'use strict';

    angular
        .module('bs.crm')
        .factory('DealService', DealService);

    DealService.$inject = ['$q', 'Deal'];
    function DealService($q, Deal) {
        
        return {
            save: save,
            findById: findById,
            remove: remove,
            changeTitle: changeTitle
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

        function findById(dealId){
            var deferred = $q.defer();

            Deal.findById(dealId).populate('person organization').exec(function(err, deal){
                if (err) deferred.reject(err);
                deferred.resolve(deal);
            });

            return deferred.promise;
        }

        function remove(deal){
            var deferred = $q.defer();

            Deal.findById(deal._id).exec(function(err, deal){
                if (err) deferred.reject(err);
                deal.remove(function(err){
                    if (err) deferred.reject(err);
                    deferred.resolve();
                });
            });

            return deferred.promise;   
        }

        function changeTitle(id, title){
            var deferred = $q.defer();

            Deal.findById(id, function(err, deal){
                if (err) deferred.reject(err);
                deal.title = title;
                deal.save(function(err, deal){
                    if (err) deferred.reject(err);
                    deferred.resolve(deal);
                });
            });

            return deferred.promise;
        }
    }
})();