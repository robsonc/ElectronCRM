(function () {
    'use strict';

    var mongoose = require('mongoose');
    var async = require('async');
    var _ = require('lodash');
    var Todo = require('./../models/todo');
    var DoList = require('./../models/do-list');
    var GoogleCalendarService = require('./../libs/google-calendar-api');
    var ipcRenderer = require('electron').ipcRenderer;

    /*Todo.find({ belongsTo: '57a9db13d842c70c2d94f167' }).exec(function (err, todos) {
        if (err) return console.log(err);
        console.log(todos.length);
        var priority = 0;
        todos.forEach(function (todo) {
            todo.priority = priority++;
            todo.save();
        });
    });*/

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/todolistdb');

    angular.module('TodoList', ['ui.router', 'ui.sortable']);

    angular.module('TodoList')
        .constant('$mongoose', mongoose)
        .constant('async', async)
        .constant('_', _)
        .constant('Todo', Todo)
        .constant('DoList', DoList)
        .constant('GoogleCalendarService', GoogleCalendarService)
        .constant('ipcRenderer', ipcRenderer);
})();