/*
 * app/controller.js
 * The applications main controller
 * Captures the application level emits and propogates to the given methods in the DataProvider.
 */

'use strict';
app.controller('AppCtrl', ['DataProvider', '$rootScope', function(DataProvider, $rootScope) {
	// Separate handlers for autocomplete and the results. The autocomplete feature can be reused anywhere in the application.

	// getSuggestions is emitted from autocomplete/controller::$scope.$watch
	$rootScope.$on('getSuggestions', function(event, query) {
		DataProvider.get(query)
			.then(function(suggestions) {
				$rootScope.$emit('showSuggestions', suggestions);
			});
	});

	// searchGitRepo is emitted from autocomplete/controller.js but the name of emitter is passed as a config param to auto-complete tag (data-post-autocomplete-emitter)
	$rootScope.$on('searchGitRepo', function(event, data) {
		DataProvider.get(data)
			.then(function(result) {
				$rootScope.$emit('showResult', result);
			});
	});
}]);
