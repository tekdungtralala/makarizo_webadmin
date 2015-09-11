(function() {
	'use strict';

	angular.module('app', [
		'ui.router',

		'app.dashboard'
	])
	.config(configRoute);

	function configRoute($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	};

})();
