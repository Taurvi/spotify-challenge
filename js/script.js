var debugMode = true;

// Debug Function
var debugMsg = function(msg) {
    if (debugMode)
        console.log("<<<|DEBUG|>>> " + msg);
};

if (debugMode)
    debugMsg('Debug Mode Active!')

// Global Vars

// Create Angular App
var ngApp = angular.module('spotifyApp', ['spotify']);

// Creates Controller
ngApp.controller('primary', ['$scope', '$http', function($scope, $http) {
    app.config(function (SpotifyProvider) {
        SpotifyProvider.setClientId('e9a7c84eb4d1413ea673caabdf6c4106');
        SpotifyProvider.setRedirectUri('<CALLBACK_URI>');
        SpotifyProvider.setScope('<SCOPE>');
        // If you already have an auth token
        SpotifyProvider.setAuthToken('<AUTH_TOKEN>');
    });

    $scope.userName = false;
    $scope.gameActive = false;
    $scope.audioObject = {};
    $scope.featuredUrl = 'https://api.spotify.com/v1/browse/featured-playlists';

    // When game start is clicked
    $scope.startGame = function() {
        $scope.gameActive = true;
        $scope.userName = $scope.inputName;
    };

    $scope.checkUserInvalid = function() {
        if (!$scope.formSetup.username.$touched) {
            return false;
        } else {
            return (!$scope.formSetup.username.$dirty || ($scope.formSetup.username.$error.minlength || $scope.formSetup.username.$invalid));
        }
        debugMsg('CheckUserValid did not trigger!');
    }

    $scope.checkUserValid = function() {
        return ($scope.formSetup.username.$valid && $scope.formSetup.username.$touched);
    }
}]);

// Kinda works: return (() || ($scope.formSetup.username.$touched && ));