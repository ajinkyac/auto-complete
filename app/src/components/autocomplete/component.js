/*
 * autocomplete/component.js
 * Autocomplete component
 *
 * Based on the description in the problem statement, created a component for autocomplete.
 * The below practices were incorporated from scotch.io angularjs coponent tutorial series.
 * autoComplete translates to auto-complete tag/component
 */

'use strict';
app.component('autoComplete', {
	// URL of autocomplete template, it is part of component's folder structure
	templateUrl: '../src/components/autocomplete/template.html',

	/*
		Controller for the component. So far the autocomplete code is independent of any application using it. More configs can be added as
		data attributes.
	*/
	controller: ['$scope', '$rootScope', '$attrs', function($scope, $rootScope, $attrs) {
		var vm = this;
		vm.isDebounced = false;

		// Resetting model values
		$scope.searchTerm = '';
		$scope.isFormValid = true;

		// Caching DOM elements to avoid frequent lookups
		var dataListInput = $('input');

		// Setting placeholder text
		dataListInput.attr('placeholder', $attrs.searchboxPlaceholderText);

		if (dataListInput) {
			dataListInput.bind('input', function() {
				var inputValue = $('input').val(),
					i = 0,
					dataListOptions = $('.data-list-options'),
					dataListOptionsLength = dataListOptions.length;

				// Purpose of using for over .forEach was to break out when option value matches autocomplete search text.
				// To break out of .forEach is to throw an exception and catch it to continue execution which is a bad usage.
				for (; i < dataListOptionsLength; i++) {
					if (dataListOptions[i].value === inputValue) {
						$scope.searchTerm = inputValue;
						vm.autoCompleteItemSelectAction();
						vm.isDebounced = false;
						break;
					}
				}
			});
		}

		/*
		 * The method is invoked as part of onInput select/enter on textbox bound to datalist while selecting suggested item.
		 * Looks up the searchTerm typed by the user and emits the result function provided in data-post-autocomplete-emitter
		 * @param	NONE
		 */
		vm.autoCompleteItemSelectAction = function() {
			if (!$attrs.apiItemLookupUrl) {
				return;
			}
			var searchTerm = $scope.searchTerm,
				api = $attrs.apiItemLookupUrl,
				placeHolderToReplace = $attrs.apiReplaceTemplate,
				query = api.replace(new RegExp(placeHolderToReplace, 'g'), searchTerm);

			/*
				This is a basic level of validation, by default the search button will remain disabled if search box is empty.
				If someone tries to inspect and remove disabled="disabled", then $scope.isFormValid will throw an error.
			*/
			if (searchTerm.length > 0) {
				$scope.isFormValid = true;
				$rootScope.$emit($attrs.postAutocompleteEmitter, query);
			}
			else {
				$scope.isFormValid = false;
			}
		};

		/*
		 * The method is invoked as part of onkeyup on textbox.
		 * It sets isDebounced flag, this helps in looking up for suggestions or stopping multiple lookups.
		 * @param	NONE
		 */
		vm.setDebounceFlag = function() {
			vm.isDebounced = true;
			$scope.errorMessage = '';

			if ($.trim($('input').val()).length === 0) {
				$scope.suggestions = [];
			}
		};

		/*
		 * The method is invoked as part of ng-model searchTerm change.
		 * It looks up for suggestions with user's typed characters.
		 *
		 * @param	{String}	newValue
		 * @param	{String}	oldValue
		 */
		$scope.$watch('searchTerm', function (newValue, oldValue) {
			if (!newValue || newValue.length == 0) {
				return 0;
			}

			// If the textbox has newly typed value and the watcher is debounced then only fetch the data.
			if (newValue.length && newValue !== oldValue && vm.isDebounced) {
				var searchTerm = $scope.searchTerm,
					api = $attrs.apiUrl,
					query = api + searchTerm;

				$rootScope.$emit('getSuggestions', query);
			}
		});

		/*
		 * The method is emitted by app/controller.js
		 * It displays the fetched autocomplete suggestions in the datalist.
		 *
		 * @param	{Event}		event
		 * @param	{Object}	suggestions
		 */
		$rootScope.$on('showSuggestions', function(event, suggestions) {
			$scope.suggestions = [];

			if (!suggestions.items) {
				$scope.errorMessage = 'No matching user found.';
			}

			// Set data-display-key so that the component will look into the given key in the response object.
			if (suggestions[$attrs.displayKey] instanceof Array) {
				if (suggestions[$attrs.displayKey].length) {
					$scope.errorMessage = '';
					$scope.suggestions = suggestions[$attrs.displayKey];
				}
				else {
					// Error message in case of no suggestions are found.
					$scope.errorMessage = 'No matching suggestions found.';
				}
			}
		});
	}]
});
