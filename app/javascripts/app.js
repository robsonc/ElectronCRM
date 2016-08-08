(function () {
    'use strict';

    var mongoose = require('mongoose');
    var async = require('async');
    var Todo = require('./../models/todo');
    var DoList = require('./../models/do-list');

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/todolistdb');

    angular.module('TodoList', ['ui.router']);

    angular.module('TodoList')
        .constant('$mongoose', mongoose)
        .constant('async', async)
        .constant('Todo', Todo)
        .constant('DoList', DoList);
})();