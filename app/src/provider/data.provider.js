/*
 * Factory provider to get data from remote endpoint.
 * Assuming CORS will be enabled on the server, not using jsonp or setting client-side request attributes.
 */

'use strict';
app.factory('DataProvider', ['$http', '$q', function($http, $q) {
	return {
		get: function(query) {
			var deferred = $q.defer();

			$http({
				method: 'GET',
				url: query
			})
			.then(
				function successCallback(response) {
					deferred.resolve(response.data);
				},
				function errorCallback(response) {
					deferred.resolve(response);
				}
			);

			return deferred.promise;
      	}
    };
}]);
