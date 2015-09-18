(function() {
	'use strict';

	angular
		.module('app.signin')
		.config(configRoute);

	function configRoute($stateProvider) {
		$stateProvider
			.state('signin', {
				url: '/signin',
				templateUrl: 'app/signin/signin.html',
				controller: 'SignIn',
				controllerAs: 'vm'
			});
	}

})();
