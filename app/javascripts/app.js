(function () {
    'use strict';

    var mongoose = require('mongoose');
    var async = require('async');
    var _ = require('lodash');
    var Todo = require('./../models/todo');
    var DoList = require('./../models/do-list');
    var GoogleCalendarService = require('./../libs/google-calendar-api');
    var ipcRenderer = require('electron').ipcRenderer;

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/todolistdb');
/*    mongoose.options = {
        debug: true
    };*/

    angular.module('TodoList', [
        'ui.router', 
        'ui.sortable', 
        'ui.bootstrap', 
        'ui.bootstrap.tpls', 
        'ngAnimate'
    ]);

    angular.module('TodoList')
        .constant('$mongoose', mongoose)
        .constant('async', async)
        .constant('_', _)
        .constant('Todo', Todo)
        .constant('DoList', DoList)
        .constant('GoogleCalendarService', GoogleCalendarService)
        .constant('ipcRenderer', ipcRenderer);
})();