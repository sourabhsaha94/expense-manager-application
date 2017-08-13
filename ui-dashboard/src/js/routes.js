'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('app',{
              abstract:true,
              templateUrl:'templates/dashboard.html'
            })
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('expense', {
                url: '/expense',
                templateUrl: 'templates/expense.html'
            })
            .state('income', {
                url: '/income',
                templateUrl: 'templates/income.html'
            })
            .state('account', {
                url: '/account',
                templateUrl: 'templates/account.html'
            });
    }
]);
