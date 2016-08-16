(function () {
    'use strict';

    var mongoose = require('mongoose');
    var async = require('async');
    var _ = require('lodash');

    var GoogleCalendarService = require('./../libs/google-calendar-api');
    var ipcRenderer = require('electron').ipcRenderer;

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/todolistdb');
/*    mongoose.options = {
        debug: true
    };*/

    angular.module('TodoList', [
        'bs.dolists',
        'bs.crm',
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
        .constant('GoogleCalendarService', GoogleCalendarService)
        .constant('ipcRenderer', ipcRenderer);
})();