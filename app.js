var app = angular.module('gottaBeYourApp', [
    'ngRoute', 
    'ngMaterial',
    "firebase",
])


//Making the checkboxes Burgundy in AngularMaterial
.config(function($mdThemingProvider) {
    var burgundyButtonColor = $mdThemingProvider.extendPalette('amber', {
        '900': 'ffcc00'
    });
    $mdThemingProvider.definePalette('amber', burgundyButtonColor);
    $mdThemingProvider.theme('default')
    .primaryPalette('amber', {
        'default': '900'
    })
    .accentPalette('amber', {
        'default': '900'
    });
});


//Controls initial landing page
app.controller('mainController', function($scope, $http, $location) {
        $scope.changeview = function(path) {
        $location.path(path);
    }

    $scope.showPetition = false;
    $scope.showDiscussion = false;
    $scope.showEvent = false;

    $scope.petitionForm = {
        title: '',
        link: '',
        description: '',

    };

    $scope.actionTypes = [
        {name: 'Petitions', icon:"fa fa-pencil-square-o", link:'petitions.html'},
        {name: 'Discussions', icon:"fa fa-commenting-o"},
        {name: 'Events', icon:"fa fa-star"},
        {name: 'Pending Actions', icon:"fa fa-hand-rock-o"},
    ];

    $scope.petitions = [];
    $scope.discussions = [];
    $scope.events = [];

    $scope.pushPetitions = function() {
        $scope.petitions.push($scope.petitionForm);
        $scope.petitionForm.title = '';
        $scope.petitionForm.link = '';
        $scope.petitionForm.description = '';
    };
});

//Switches between pages/views
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'main.html',
        controller: 'mainController',
    }).
    when('/Petitions', {
        reloadOnSearch: false,
        templateUrl: 'petitions.html',
    }).
    when('/Events', {
        templateUrl: 'events.html',
    }).
    when('/Discussions', {
        templateUrl: 'discussions.html',
    }).
    otherwise({
        redirectTo: '/'
    });
}]);


exports = app;