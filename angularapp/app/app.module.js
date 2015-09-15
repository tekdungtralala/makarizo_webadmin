(function() {
	'use strict';

	var myApp = angular.module('app', [
		'ui.router',
		'ui.bootstrap',

		'app.core',
		'app.signin',
		'app.dashboard',
		'app.allplayer',
		'app.redeemtype'
	])
	.config(configRoute)
	.run(appRun);

	function configRoute($urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	};

	function appRun($rootScope, $state, dataservice) {
		$rootScope.adminLogout = adminLogout;

		function adminLogout() {
			dataservice.adminLogin(null, null);
			$rootScope.isLogin = false;
			$state.go('signin');
		}
	}

})();
