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
            .state('expense.addNewExpense',{
              url:'/:addNewExpense',
              templateUrl:'templates/expense.html',
              params:{
                addNewExpense:null
              }
            })
            .state('income', {
                url: '/income',
                templateUrl: 'templates/income.html'
            })
            .state('account', {
                url: '/account',
                templateUrl: 'templates/account.html'
            })
            .state('account.addNewAccount',{
              url:'/:addNewAccount',
              templateUrl:'templates/account.html',
              params:{
                addNewAccount:null
              }
            });
    }
]);
