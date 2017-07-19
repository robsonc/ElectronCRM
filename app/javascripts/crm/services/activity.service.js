(function () {
    'use strict';

    angular
        .module('bs.crm')
        .factory('ActivityService', ActivityService);

    ActivityService.$inject = ['$q', 'Activity'];
    function ActivityService($q, Activity) {

        return {
            save: save,
            findByDeal: findByDeal,
            done: done,
            undone: undone,
            remove: remove,
            findAllNotDone: findAllNotDone
        };

        function save(activity) {
            var deferred = $q.defer();

            var newActivity = new Activity({
                content: activity.content,
                startDate: activity.startDate,
                startTime: activity.startTime,
                deal: activity.deal,
                isDone: activity.isDone
            });

            newActivity.save(function (err, activity) {
                if (err) deferred.reject(err);
                deferred.resolve(activity);
            });

            return deferred.promise;
        }

        function findByDeal(dealId) {
            var deferred = $q.defer();

            Activity.find({ deal: dealId }).sort({ createdAt: -1 }).exec(function (err, activities) {
                if (err) deferred.reject(err);
                deferred.resolve(activities);
            });

            return deferred.promise;
        }

        function findAllNotDone(){
            var deferred = $q.defer();

            Activity.find({isDone: false})
                .populate({
                    path: 'deal',
                    model: 'Deal',
                    populate: {
                        path: 'organization',
                        model: 'Organization'
                    }
                })
                .sort({ createdAt: -1 }).exec(function (err, activities) {
                
                if (err) deferred.reject(err);
                deferred.resolve(activities);
            });

            return deferred.promise;
        }

        function done(id) {
            var deferred = $q.defer();

            Activity.findById(id, function (err, activity) {
                if (err) return deferred.reject(err);
                if (!activity) return deferred.reject('Activity not found');

                activity.do();
                activity.save(function (err) {
                    if (err) return deferred.reject(err);
                    deferred.resolve();
                });
            });

            return deferred.promise;
        }

        function undone(id) {
            var deferred = $q.defer();

            Activity.findById(id, function (err, activity) {
                if (err) return deferred.reject(err);
                if (!activity) return deferred.reject('Activity not found');

                activity.undo();
                activity.save(function (err) {
                    if (err) return deferred.reject(err);
                    deferred.resolve();
                });
            });

            return deferred.promise;
        }

        function remove(id) {
            var deferred = $q.defer();

            Activity.findById(id).exec(function (err, activity) {
                if (err) deferred.reject(err);
                if (activity) {
                    activity.remove(function (err) {
                        if (err) deferred.reject(err);
                        deferred.resolve();
                    });
                } else {
                    deferred.reject('Activity does not exists!');
                }
            });

            return deferred.promise;
        }
    }
})();