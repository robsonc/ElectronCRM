'use strict';

//jshint node:true

var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var url = require('url');
var FB = require('fb');
var fs = require('fs');

module.exports = {
    showPermissionDialog: showPermissionDialog
};

function showPermissionDialog(){
    var browserWindow = new BrowserWindow({
        show: false,
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            experimentalFeatures: true,
            experimentalCanvasFeatures: true
        }
    });

    var redirectUri = "https://www.facebook.com/connect/login_success.html";
    var appId = "1635375440087986";
    var scopes = [
        'public_profile',
        'user_friends',
        'email',
        'manage_pages',
        'pages_show_list',
        'user_posts',
        'user_about_me',
        'user_likes',
        'user_location',
        'publish_actions',
        'publish_pages',
        'read_page_mailboxes',
        'user_videos'
    ];

    var authUrl = `https://www.facebook.com/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join()}`;
    console.log('Auth URL: ' + authUrl);
    browserWindow.on('closed', function(){
        browserWindow = null;
    });

    browserWindow.loadURL(authUrl);
    browserWindow.show();

    browserWindow.webContents.on('will-navigate', function(event, url){
        /*console.log('will-navigate');
        console.log(url);*/
        handleCallback(url);
    });

    browserWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl){
        /*console.log('did-get-redirect-request');
        console.log(newUrl);*/
        handleCallback(newUrl);
    });
}

function handleCallback (returnedUrl) {
    var result = url.parse(returnedUrl, true);

    if(result.query.error) {
        if(result.query.error_description) {
            console.log(result.query.error_description);
        } else {
            console.log(result.query.error);
        }
        return;
    } else if (!result.query.code) {
        console.log('not a oauth callback');
        return;
    }

    var code = result.query.code;
    
    FB.api('oauth/access_token', {
        client_id: '1635375440087986',
        client_secret: 'eaf56f2deec542f7f510ab317f763f17',
        redirect_uri: 'https://www.facebook.com/connect/login_success.html',
        code: code
    }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }

        var accessToken = res.access_token;
        var expires = res.expires ? res.expires : 0;

        fs.writeFile('./app/libs/facebook-token.json', JSON.stringify(accessToken));
    });
}