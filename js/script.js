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
var ngApp = angular.module('spotifyApp', []);

// Creates Controller
ngApp.controller('primary', ['$scope', '$http', function($scope, $http) {
    $scope.userName = false;
    $scope.gameActive = false;

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