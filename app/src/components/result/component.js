/*
 * result/component.js
 * Results component
 *
 * Based on the description in the problem statement, created a live demo by consuming autocomplete component.
 * The below practices were incorporated from scotch.io angularjs coponent tutorial series.
 * result translates to result tag/component
 */
'use strict';
app.component('result', {
	// URL of result template, it is part of component's folder structure
	templateUrl: '../src/components/result/template.html',

	controller: ['$scope', '$rootScope', function($scope, $rootScope) {

		/*
		 * The method is emitted by app/controller.js
		 * It displays the results fetched based on autocomplete's search term and query.
		 *
		 * @param	{Event}	event
		 * @param	{Object}	results
		 */
		$rootScope.$on('showResult', function(event, results) {
			if (results instanceof Array) {
				if (results.length) {
					$scope.errorMessage = '';
					$scope.results = results;
				}
				else {
					// For some searches when the username is valid but does not have/return any repositories
					$scope.errorMessage = 'No repositories found for your search.';
					$scope.results = [];
				}
			}
			else {
				var resultStatus = results['status'];
				if (resultStatus) {
					if (resultStatus == '404') {
						$scope.errorMessage = 'No repositories found for your search.';
						$scope.results = [];
					}
				}
			}
		});
	}]
});
