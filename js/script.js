var debugMode = true;

// Debug Function
var debugMsg = function(msg) {
    if (debugMode)
        console.log("<<<|DEBUG|>>> " + msg);
};

if (debugMode)
    debugMsg('Debug Mode Active!')

// Global Vars
var userName;
var gameActive;

// Create Angular App
var ngApp = angular.module('spotifyApp', []);

// Creates Controller
ngApp.controller('primary', ['$scope', function($scope) {
    $scope.userName = false;
    $scope.gameActive = false;

    // When game start is clicked
    $scope.startGame = function() {
        $scope.gameActive = true;
        $scope.userName = $scope.inputName;
    };

    $scope.checkUserValid = function() {
        return ($scope.formSetup.username.$error.minlength || ($scope.formSetup.username.$touched && !$scope.formSetup.username.$dirty));
    }
}]);