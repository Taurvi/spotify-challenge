var debugMode = true;

// Debug Function
var debugMsg = function(msg) {
    if (debugMode)
        console.log("<<<|DEBUG|>>> " + msg);
};

if (debugMode)
    debugMsg('Debug Mode Active!')

// Create Angular App
var ngApp = angular.module('spotifyApp', []);

// Creates Controller
ngApp.controller('changeSearchImg', function($scope) {
   $scope.serachType = 'search-artist';
});