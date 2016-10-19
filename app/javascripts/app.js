(function () {
    'use strict';

    var mongoose = require('mongoose');
    var async = require('async');
    var _ = require('lodash');
    var FB = require('fb');

    var GoogleCalendarService = require('./../libs/google-calendar-api');
    var FacebookGraphService = require('./../libs/facebook-graph-api');
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
        'ngAnimate',
        'ngSanitize',
        'angularTrix'
    ]);

    angular.module('TodoList')
        .constant('$mongoose', mongoose)
        .constant('async', async)
        .constant('_', _)
        .constant('GoogleCalendarService', GoogleCalendarService)
        .constant('ipcRenderer', ipcRenderer)
        .constant('FacebookGraphService', FacebookGraphService);
})();