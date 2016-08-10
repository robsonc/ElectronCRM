var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var q = require('q');
var moment = require('moment');
var calendar = google.calendar('v3');

var config = JSON.parse(fs.readFileSync(__dirname + '/../config/client_id.json'));

var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(
    config.installed.client_id,
    config.installed.client_secret,
    config.installed.redirect_uris[0]
);

try {
    var credentials = JSON.parse(fs.readFileSync(__dirname + '/token.json'));
    oauth2Client.credentials = credentials;
} catch (error) {
    console.log(error);
}

module.exports = {
    get: get,
    save: save
};

function save(event) {
    var deferred = q.defer();

    event = {
        summary: event.summary,
        start: {
            dateTime: moment().toISOString()
        },
        end: {
            dateTime: moment().toISOString()
        }
    };

    calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        resource: event
    }, function (err, event) {
        if (err) return deferred.reject(err);
        deferred.resolve(event);
    });

    return deferred.promise;
}

function get(limitOfEvents) {
    var deferred = q.defer();

    var limit = 10;
    if (limitOfEvents) limit = limitOfEvents;

    console.log(calendar.events.reminders);

    calendar.events.list({
        auth: oauth2Client,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: limit,
        singleEvents: true,
        orderBy: 'startTime'
    }, function (err, response) {
        if (err) return deferred.reject(err);
        deferred.resolve(response.items);
    });

    return deferred.promise;
};

/*function listFiles(auth) {
    var service = google.drive('v3');
    service.files.list({
        auth: auth,
        pageSize: 10,
        fields: "nextPageToken, files(id, name)"
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var files = response.files;
        if (files.length == 0) {
            console.log('No files found.');
        } else {
            console.log('Files:');
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log('%s (%s)', file.name, file.id);
            }
        }
    });
}

function listEvents(auth) {
    var calendar = google.calendar('v3');
    calendar.events.list({
        auth: auth,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var events = response.items;
        if (events.length == 0) {
            console.log('No upcoming events found.');
        } else {
            console.log('Upcoming 10 events:');
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var start = event.start.dateTime || event.start.date;
                console.log('%s - %s', start, event.summary);
            }
        }
    });
}*/