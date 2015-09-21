(function() {
	'use strict';

	angular
		.module('app.redeemhistory')
		.controller('RedeemHistory', RedeemHistory);

	function RedeemHistory(dataservice) {
		var vm = this;
		vm.periods = [];
		vm.userWins = [];
		vm.selectedUserWins = [];

		vm.selectedPeriod = null;

		vm.selectPeriode = selectPeriode;

		activate();
		function activate() {
			dataservice.getRedeemHistory()
				.then(afterRedeemHistory);
		}

		function selectPeriode(pId, pName) {
			vm.selectedPeriod = pName;
			vm.selectedUserWins = _.filter(vm.userWins, function(u) {
				return u[3] === pId;
			});
		}

		function afterRedeemHistory(result) {
			vm.periods = result.periods;
			vm.userWins = result.userWins;
			console.log(vm.userWins);
		}

	}

})();
