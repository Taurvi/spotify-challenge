var debugMode = true;

// Debug Function
var debugMsg = function(msg) {
    if (debugMode)
        console.log("<<<|DEBUG|>>> " + msg);
};

if (debugMode)
    debugMsg('Debug Mode Active!')

// Global Vars
var dataArtistList;

// Create Angular App
var ngApp = angular.module('spotifyApp', ['spotify']);

// Creates Controller
ngApp.controller('primary', ['$scope', '$http', 'Spotify', function($scope, $http, Spotify) {
    $scope.userName = false;
    $scope.gameActive = false;
    $scope.audioObject = {};
    $scope.artistList = {};

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
        Spotify.search($scope.inputArtist, 'artist').then( function(data) {
            data.forEach(function(artist) {
                var top10 = [];

                Spotify.getArtistTopTracks(artist.id, 'US').then(function (data) {
                    top10 = data.tracks;
                });

                $scope.artistList = {
                    name: data.artists.items.name,
                    id: data.artists.items.id,
                    top10: top10
                };

                dataArtistList = $scope.artistList;

            })

        });
    }
}]);

// Kinda works: return (() || ($scope.formSetup.username.$touched && ));