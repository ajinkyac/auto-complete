/*
 * Bootstrapping angular application and setting up the config for the app.
 */

'use strict';

var app = angular.module('app', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('home', {
			url: '/',
			templateUrl: './src/components/app/app.html',
			controller: 'AppCtrl'
		});

		$stateProvider.state('404', {
			url: '/404',
			templateUrl: './src/components/app/404.html',
		});

		$urlRouterProvider.when('', '/');
		$urlRouterProvider.otherwise('/404');
	}]);
