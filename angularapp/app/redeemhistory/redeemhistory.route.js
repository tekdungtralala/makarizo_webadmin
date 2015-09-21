(function() {
	'use strict';

	angular
		.module('app.redeemhistory')
		.config(configRoute);

	function configRoute($stateProvider) {
		$stateProvider
			.state('redeemhistory', {
				url: '/redeemhistory',
				templateUrl: 'app/redeemhistory/redeemhistory.html',
				controller: 'RedeemHistory',
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
