(function() {
	'use strict';

	angular.module('app', [
		'ui.router',

		'app.core',
		'app.dashboard',
		'app.allplayer'
	])
	.config(configRoute);

	function configRoute($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	};

})();
