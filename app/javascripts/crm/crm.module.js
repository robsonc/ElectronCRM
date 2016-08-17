(function() {
    'use strict';

    var Deal = require('./../../models/deal');
    var Organization = require('./../../models/organization');
    var Person = require('./../../models/person');
    var Stage = require('./../../models/stage');
    var Note = require('./../../models/note');

    angular.module('bs.crm', ['ui.router']);
    angular.module('bs.crm')
        .constant('Deal', Deal)
        .constant('Organization', Organization)
        .constant('Person', Person)
        .constant('Stage', Stage)
        .constant('Note', Note);
})();