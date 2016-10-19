(function () {
    'use strict';

    angular
        .module('bs.crm')
        .factory('ActivityService', ActivityService);

    ActivityService.$inject = ['$q', 'Activity'];
    function ActivityService($q, Activity) {

        return {
            save: save,
            findByDeal: findByDeal
        };

        function save(activity) {
            var deferred = $q.defer();

            var newActivity = new Activity({
                content: activity.content,
                startDate: activity.startDate,
                startTime: activity.startTime,
                deal: activity.deal
            });

            newActivity.save(function (err, activity) {
                if (err) deferred.reject(err);
                deferred.resolve(activity);
            });

            return deferred.promise;
        }

        function findByDeal(dealId) {
            var deferred = $q.defer();

            Activity.find({ deal: dealId }).exec(function (err, activities) {
                if (err) deferred.reject(err);
                deferred.resolve(activities);
            });

            return deferred.promise;
        }
    }
})();