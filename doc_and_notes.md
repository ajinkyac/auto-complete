## Autocomplete component using AngularJS

- Documentation for auto-complete component
	* To use the component anywhere in the application just use the tag <auto-complete></auto-complete>, attributes listed below.
	* "data-searchbox-placeholder-text" => Set the placeholder text for the autocomplete textbox.
	* "data-post-autocomplete-emitter" => Name of the emitter function where you want to send the control to after autocomplete suggested item is clicked.
	* "data-api-url" => API URL where you want autocomplete to lookup for suggestions.
	* "data-api-item-lookup-url" => API URL to be passed to data-post-autocomplete-emitter when suggested item is clicked.
	* "data-api-replace-template" => Template placeholder to be replaced from data-api-item-lookup-url API URL.
	* "data-display-key" => Object key where you want autocomplete to find items to show as suggestions. Object is the response to API call.

- TODO's
	* More use of angular's native jqlite or other microlibrary instead of jquery.
	* Instead of datalist which is seamlessly supported by Chrome and Firefox could have added an absolutely positioned div or list and handled the keyboard events separately.
	* With the above approach the need for datalist polyfill could have been avoided.
	* The datalist polyfill [Relevant-Dropdowns](https://github.com/CSS-Tricks/Relevant-Dropdowns) did not work in angular due to following reasons:
		* The polyfill replaces `<datalist>` tag with `<ul>` tag.
		* We put ng-repeat on `<datalist>` tag which got replaced.
		* The `<ul>` tag is empty and autocomplete suggestions are not shown on Safari and IE.
		* Due to lack of time I could not invest more time in getting the polyfill running but I feel with some ng-if on datalist and ul and minor tweaks in load-fallbacks.js we could get it working.
