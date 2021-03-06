(function () {
    'use strict';

    var bluebird = require('bluebird');
    var q = require('q');
    var mongoose = require('mongoose');
    var moment = require('moment');
    var async = require('async');
    var _ = require('lodash');
    var FB = require('fb');

    var GoogleCalendarService = require('./../libs/google-calendar-api');
    var FacebookGraphService = require('./../libs/facebook-graph-api');
    var ipcRenderer = require('electron').ipcRenderer;

    //mongoose.Promise = bluebird;
    mongoose.Promise = global.Promise;
    //mongoose.Promise = q;

    mongoose.connect('mongodb://localhost/todolistdb', {
        useMongoClient: true
    });

    mongoose.options = {
        debug: true
    };

    angular.module('TodoList', [
        'bs.dolists',
        'bs.crm',
        'bs.sales',
        'bs.products',
        'ui.router',
        'ui.sortable',
        'ui.bootstrap',
        'ui.bootstrap.tpls',
        'ngAnimate',
        'ngSanitize',
        'angularTrix',
        'ngContentEditable',
        'nvd3'
    ]);

    angular.module('TodoList')
        .constant('$moment', moment)
        .constant('$mongoose', mongoose)
        .constant('async', async)
        .constant('_', _)
        .constant('GoogleCalendarService', GoogleCalendarService)
        .constant('ipcRenderer', ipcRenderer)
        .constant('FacebookGraphService', FacebookGraphService);
})();