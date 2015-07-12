var debugMode = false;

// Debug Function
var debugMsg = function(msg) {
    if (debugMode)
        console.log("<<<|DEBUG|>>> " + msg);
};

if (debugMode)
    debugMsg('Debug Mode Active!')

// Shuffle Function - Knuth-Yates shuffle (http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
var shuffle = function(array) {
    debugMsg("shuffle run!");
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

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
    $scope.setupGame = function() {
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
            $scope.dispArtistList = [];
            var truncatedList = [];
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

    // Select Artist
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

    // Start Game
    $scope.startGame = function() {
        $scope.gameState = 'active';
        shuffle($scope.returnTopSongs);
    }

    $scope.buttonId = function(id) {
        debugMsg(id.substring(0,5))
        return id.substring(0,5);
    }

    $scope.audioObject = {}

    $scope.playSong = function(song, id) {
        var buttonId = '#button-' + id;
        debugMsg(buttonId);
        $(buttonId).attr('disabled', true);
        if($scope.currentSong == song) {
            $scope.audioObject.pause()
            $scope.currentSong = false
            return
        }
        else {
            if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
            $scope.audioObject = new Audio(song);
            $scope.audioObject.play()
            $scope.currentSong = song
        }
    }

    $scope.checkAnswers = function() {
        $scope.gameState = 'end';
        var idArray = [];
        var answerList = {};
        $(".gameAnswer").css('display', 'initial');
        for(song in $scope.returnTopSongs) {
            var songId = $scope.returnTopSongs[song].id;
            $('#input-' + songId).prop('readonly', true);
            var userAnswer = $('#input-' + songId).val();
            var corAnswer = $scope.returnTopSongs[song].name;
            var correct = evalAnswer(userAnswer, corAnswer);
            if (correct)
                $('#formG-' + songId).addClass('has-success');
            else
                $('#formG-' + songId).addClass('has-error');
        }
    }

    $scope.reset = function() {
        $scope.inputArtist = '';
        $scope.dispArtistList = [];
        $scope.selectedArtist = '';
        $scope.showInfo = false;
        $(".gameAnswer").css('display', 'none');
        $scope.gameState = 'setup';
    }
}]);

var evalAnswer = function(str, ans) {
    var filterStr = str.replace(/[^A-Za-z]+/g, "").toLowerCase();
    var filterAns = ans.replace(/[^A-Za-z]+/g, "").toLowerCase();
    debugMsg(filterStr);
    debugMsg(filterAns);

    return filterStr == filterAns;
}

// Kinda works: return (() || ($scope.formSetup.username.$touched && ));