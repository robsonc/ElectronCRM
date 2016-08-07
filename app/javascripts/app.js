(function () {
    'use strict';

    var mongoose = require('mongoose');
    var Todo = require('./../../models/todo');

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/todolistdb');

    angular.module('TodoList', ['ui.router']);

    angular.module('TodoList')
        .constant('$mongoose', mongoose)
        .constant('Todo', Todo);
})();