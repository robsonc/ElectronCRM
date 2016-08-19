(function() {
    'use strict';

    angular
        .module('bs.crm')
        .directive('dealNotes', Directive);

    Directive.$inject = ['Note'];
    function Directive(Note) {
        return {
            scope: {
                'deal': '='
            },
            templateUrl: './javascripts/crm/partials/deal-notes-template.html',
            link: function(scope, attrs, elem){
                Note.find({deal: scope.deal}).limit(5).exec(function(err, notes){
                    scope.$apply(function(){
                        scope.notes = notes;
                    });
                });
            }
        };
    }
})();