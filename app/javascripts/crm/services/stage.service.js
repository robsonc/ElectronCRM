(function() {
'use strict';

    angular
        .module('bs.crm')
        .factory('StageService', StageService);

    StageService.$inject = ['$q', 'Stage', 'Deal', 'async'];
    function StageService($q, Stage, Deal, async) {
        return {
            findAll: findAll
        };

        function findAll(){
            var deferred = $q.defer();

            Stage.find({}).exec(function(err, stages){
                if (err) deferred.reject(err);

                async.each(stages, function(stage, done){
                    Deal.find({stage: stage}).exec(function(err, deals){
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
    }
})();