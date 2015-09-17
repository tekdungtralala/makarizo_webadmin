(function() {
	'use strict';

	angular
		.module('app.redeemscore')
		.config(configRoute);

	function configRoute($stateProvider) {
		$stateProvider
			.state('redeemscore', {
				url: '/redeemscore',
				templateUrl: 'app/redeemscore/redeemscore.html',
				controller: 'RedeemScore',
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
