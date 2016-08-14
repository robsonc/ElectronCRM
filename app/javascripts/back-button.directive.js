(function() {
    'use strict';

    angular
        .module('TodoList')
        .directive('backButton', backButton);

    backButton.$inject = ['$window'];

    function backButton($window) {
        
        var directive = {
            link: link,
            restrict: 'EA',
            template: "<button class='btn btn-default'>Back</button>"
        };

        return directive;
        
        function link(scope, element, attrs) {
            element.on('click', function(){
                $window.history.back();
            });
        }
    }
    
})();
