(function() {
'use strict';

    angular
        .module('bs.crm')
        .factory('StageService', StageService);

    StageService.$inject = ['$q', 'Stage', 'Deal', 'async'];
    function StageService($q, Stage, Deal, async) {
        return {
            findAll: findAll,
            addDeal: addDeal
        };

        function findAll(){
            var deferred = $q.defer();

            Stage.find({}).exec(function(err, stages){
                if (err) deferred.reject(err);

                async.each(stages, function(stage, done){
                    Deal.find({stage: stage}).populate('person organization').exec(function(err, deals){
                        if (err) return done(err);
                        stage.deals = deals;
                        return done();
                    });
                }, function(err){
                    if (err) deferred.reject(err);
                    deferred.resolve(stages);
                });
            });

            return deferred.promise;
        }

        function addDeal(stageId, deal){
            var deferred = $q.defer();

            Stage.findById(stageId).exec(function(err, stage){
                if (err) deferred.reject(err);
                deal.stage = stage;
                deal.save(function(err){
                    if (err) deferred.reject(err);
                    deferred.resolve();
                });
            });

            return deferred.promise;
        }
    }
})();