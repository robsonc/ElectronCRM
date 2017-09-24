var electron = require('electron')
var BrowserWindow = electron.BrowserWindow
var googleAuth = require('google-auth-library');
var fs = require('fs');

var scopes = [
	'https://www.googleapis.com/auth/calendar',
	'https://www.googleapis.com/auth/drive.metadata.readonly'
];

var config = JSON.parse(fs.readFileSync(__dirname + '/../config/client_id.json'));

var auth = new googleAuth();
var oauth2Client = new auth.OAuth2(
	config.installed.client_id,
	config.installed.client_secret,
	config.installed.redirect_uris[0]
);

module.exports = {
	showPermissionDialog: showPermissionDialog,
	authorize: authorize
};

function storeToken(token) {
    fs.writeFile(__dirname + '/token.json', JSON.stringify(token));
    console.log('Token stored to ' + __dirname);
}

function showPermissionDialog() {
	var browserWindow = new BrowserWindow({ show: false })

	browserWindow.on('closed', () => {
		console.log('browserWindow: closed')
		browserWindow = null;
	});

	var authUrl = oauth2Client.generateAuthUrl({
        scope: scopes,
		response_type: 'code'
    });

	browserWindow.loadURL(authUrl)
	browserWindow.show();
}

function authorize(code) {
	oauth2Client.getToken(code, function (err, token) {
		if (err) {
			console.log('Error while trying to retrieve access token', err);
			return;
		}
		oauth2Client.credentials = token;
		storeToken(token);
	});
}