(function() {
    'use strict';

    angular
        .module('bs.crm')
        .directive('dealNotes', Directive);

    Directive.$inject = ['Activity'];
    function Directive(Activity) {
        return {
            scope: {
                'deal': '='
            },
            templateUrl: './javascripts/crm/partials/deal-notes-template.html',
            link: function(scope, attrs, elem){
                Activity.find({deal: scope.deal}).limit(5).exec(function(err, activities){
                    scope.$apply(function(){
                        scope.activities = activities;
                    });
                });
            }
        };
    }
})();