var debugMode = true;

// Debug Function
var debugMsg = function(msg) {
    if (debugMode)
        console.log("<<<|DEBUG|>>> " + msg);
};

if (debugMode)
    debugMsg('Debug Mode Active!')

// Global Vars
var rawGArtistList;
var rawTop10;
var checkNewList;

// Create Angular App
var ngApp = angular.module('spotifyApp', ['spotify']);

// Creates Controller
ngApp.controller('primary', ['$scope', '$http', 'Spotify', function($scope, $http, Spotify) {
    $scope.userName = false;
    $scope.gameActive = false;
    $scope.audioObject = {};
    $scope.rawArtistList;

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

    //Query by Artist
    $scope.searchArtist = function() {
        Spotify.search($scope.inputArtist, 'artist', {limit: 10}).then( function(data) {
            $scope.rawArtistList = data.artists.items;
            rawGArtistList = $scope.rawArtistList;

            var newArtistList = [];

            var holdTop10 = [];
            $scope.rawArtistList.map(function(artist) {
                Spotify.getArtistTopTracks(artist.id, 'US').then(function (data) {
                    if (data.length == 10) {
                        artist['top10'] = data;
                        newArtistList.push(artist);
                    };
                });
            })
            checkNewList = newArtistList;
        });
    }
}]);

// Kinda works: return (() || ($scope.formSetup.username.$touched && ));