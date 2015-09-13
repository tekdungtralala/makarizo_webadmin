(function() {
	'use strict';

	angular.module('app', [
		'ui.router',
		'ui.bootstrap',

		'app.core',
		'app.dashboard',
		'app.allplayer',
		'app.redeemtype'
	])
	.config(configRoute);

	function configRoute($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	};

})();
