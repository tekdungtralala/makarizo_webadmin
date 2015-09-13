(function() {
	'use strict';

	angular
		.module('app.redeemtype')
		.config(configRoute);

	function configRoute($stateProvider) {
		$stateProvider
			.state('redeemtype', {
				url: '/redeemtype',
				templateUrl: 'app/redeemtype/redeemtype.html',
				controller: 'RedeemType',
				controllerAs: 'vm'
			});
	}

})();
