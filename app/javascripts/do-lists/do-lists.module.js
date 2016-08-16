(function() {
    'use strict';

    var Todo = require('./../../models/todo');
    var DoList = require('./../../models/do-list');

    angular.module('bs.dolists', ['ui.router']);
    angular.module('bs.dolists')
        .constant('Todo', Todo)
        .constant('DoList', DoList);
})();