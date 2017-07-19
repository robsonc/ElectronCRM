(function() {
    'use strict';

    angular.module('bs.crm').config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider){
        $stateProvider.state('app.pipeline', {
            url: 'pipeline',
            controller: 'PipelineController as pipelineCtrl',
            templateUrl: './javascripts/crm/partials/pipeline.html'
        }).state('app.deal', {
            url: 'deal/:dealId',
            controller: 'DealController as dealCtrl',
            templateUrl: './javascripts/crm/partials/deal.html',
            resolve: {
                deal: ['$stateParams', 'DealService', function($stateParams, DealService){
                return DealService.findById($stateParams.dealId).then(function(deal){
                    return deal;
                });
            }]}
        }).state('app.persons', {
            url: 'persons',
            controller: 'PersonsController as personsCtrl',
            templateUrl: './javascripts/crm/partials/persons.html'
        }).state('app.organizations', {
            url: 'organizations',
            controller: 'OrganizationsController as organizationsCtrl',
            templateUrl: './javascripts/crm/partials/organizations.html'
        }).state('app.activities', {
            url: 'activities',
            controller: 'ActivitiesController as activitiesCtrl',
            templateUrl: './javascripts/crm/partials/activities.html'
        });
    }
})();