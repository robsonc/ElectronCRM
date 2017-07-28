(function(){
    'use strict';

    angular.module('TodoList').filter('sumByKey', sumByKey);

    function sumByKey(){
        return function(data, key) {
            if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
                return 0;
            }

            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                sum += parseFloat(data[i][key]);
            }

            return sum;
        };
    }
})();