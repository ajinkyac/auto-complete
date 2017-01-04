exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: [
		'tests/e2e/l0_search_for_repositories.spec.js',
		'tests/e2e/l0_search_no_repositories_found.spec.js'
	]
};
