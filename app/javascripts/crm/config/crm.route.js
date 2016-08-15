(function() {
    'use strict';

    angular.module('bs.crm').config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider){
        $stateProvider.state('app.pipeline', {
            url: 'pipeline',
            controller: 'PipelineController as pipelineCtrl',
            templateUrl: './javascripts/crm/partials/pipeline.html'
        });
    }
})();