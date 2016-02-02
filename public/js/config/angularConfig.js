/**
 * Created by syedf on 1/30/2016.
 */
// The Various routes angular handles are written here they are organized as states of the application
angular
    .module('GRIT')
    .config(['$urlRouterProvider','$stateProvider','$locationProvider', function($urlRouterProvider,$stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);
    $urlRouterProvider.when('/movies/page/', '/movies/page/0');
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home',{
            url: '/',
            templateUrl: '/views/home.html',
            controller: 'homeCtrl'
        })
}]);
