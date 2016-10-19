var FB = require('fb');
var fs = require('fs');
var q = require('q');

try {
    var accessToken = JSON.parse(fs.readFileSync(__dirname + '/../libs/facebook-token.json'));   
} catch (error) {
    console.log(error);
}

module.exports = {
    getLikedPages: getLikedPages,
    getPageLiveVideos: getPageLiveVideos,
    getLiveVideo: getLiveVideo
};

function getLikedPages(){
    var deferred = q.defer();

    FB.setAccessToken(accessToken);
    FB.api("me/likes", {limit: 100}, function (res) {
        if(!res || res.error) {
            deferred.reject(!res ? 'error occurred' : res.error);
            return;
        }
        console.log(res);
        deferred.resolve(res);
    });

    return deferred.promise;
}

function getPageLiveVideos(pageId){
    var deferred = q.defer();

    FB.setAccessToken(accessToken);
    FB.api(pageId + "/live_videos", {fields: ['id', 'description', 'embed_html', 'status'], limit: 5}, function (res) {
        if(!res || res.error) {
            deferred.reject(!res ? 'error occurred' : res.error);
            return;
        }
        console.log(res);
        deferred.resolve(res);
    });

    return deferred.promise;
}

function getLiveVideo(videoId){
    var deferred = q.defer();

    FB.setAccessToken(accessToken);
    FB.api(videoId, {fields: ['id', 'description', 'embed_html', 'status']}, function (res) {
        if(!res || res.error) {
            deferred.reject(!res ? 'error occurred' : res.error);
            return;
        }
        console.log(res);
        deferred.resolve(res);
    });

    return deferred.promise;
}