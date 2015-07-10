var debugMode = true;

// Debug Function
var debugMsg = function(msg) {
    if (debugMode)
        console.log("<<<|DEBUG|>>> " + msg);
};

if (debugMode)
    debugMsg('Debug Mode Active!')

// Global Vars
var revisedList = [];
var truncatedList = [];
var checkNewList;

// Create Angular App
var ngApp = angular.module('spotifyApp', ['spotify']);

// Creates Controller
ngApp.controller('primary', ['$scope', '$http', 'Spotify', function($scope, $http, Spotify) {
    //* Global controller variables
    //  Used for showing the selected artist
    $scope.selectedArtistedId = -1;
    //  Shows/Hides description box
    $scope.showDescription = false;

    $scope.userName;

    $scope.gameState = 'inactive';

    $scope.showInfo = false;

    // When game start is clicked
    $scope.startGame = function() {
        $scope.userName = $scope.inputName;
        $scope.gameState = 'setup';
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
        //  Checks if model is empty, if so, set variables to hide and to unselect row
        if ($scope.inputArtist) {
            $scope.selectedArtistedId = -1;
            $scope.showInfo = false;
        }
        //  Searches the spotify database for the artist
        Spotify.search($scope.inputArtist, 'artist', {limit: 10}).then( function(data) {
            truncatedList = [];
            data.artists.items.forEach( function(artist) {
                rawTopTen = [];
                Spotify.getArtistTopTracks(artist.id, 'US').then(function (data) {
                    //  Stores artist's top tracks
                    rawTopTen = data.tracks;
                    if (rawTopTen.length  == 10) {
                        truncatedList.push(artist);
                    }
                    $scope.dispArtistList = truncatedList;
                });
            });
        });
    };

    $scope.artistSelected = function(artistName, artistId) {
        //  Used for showing the selected table row
        $scope.selectedArtistedId = artistId;
        //  Used for showing the description box
        $scope.showInfo = true;
        $scope.selectedArtist = artistName;
        //  Queries the artist based (requires artistId)
        //  Gets the artist's top tracks in the US
        Spotify.getArtistTopTracks(artistId, 'US').then(function (data) {
            //  Stores artist's top tracks
            $scope.returnTopSongs = data.tracks;
        });
    }
}]);

// Kinda works: return (() || ($scope.formSetup.username.$touched && ));