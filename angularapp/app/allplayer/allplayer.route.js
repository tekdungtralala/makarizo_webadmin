(function() {
	'use strict';

	angular
		.module('app.allplayer')
		.config(configRoute);

	function configRoute($stateProvider) {
		$stateProvider
			.state('allplayer', {
				url: '/allplayer',
				templateUrl: 'app/allplayer/allplayer.html',
				controller: 'AllPlayer',
				controllerAs: 'vm',
				onEnter: onEnter
			});

		function onEnter($state, $rootScope, dataservice) {
			if (!$rootScope.isLogin) {
				dataservice.chekAdminLogin();
			}
		}

	}

})();
