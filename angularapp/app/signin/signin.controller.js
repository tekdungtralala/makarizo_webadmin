(function() {
	'use strict';

	angular
		.module('app.signin')
		.controller('SignIn', SignIn);

	function SignIn($rootScope, $state, dataservice) {
		var vm = this;

		vm.username = null;
		vm.password = null;
		vm.errorMsg = [];

		vm.preSubmit = preSubmit;

		function preSubmit() {
			var hasError = false;
			vm.errorMsg = [];
			if (!vm.username) {
				vm.errorMsg.username = 'has-error';
				hasError = true;
			}

			if (!vm.password) {
				vm.errorMsg.password = 'has-error';
				hasError = true;
			}

			if (!hasError) {
				dataservice.adminLogin(vm.username, vm.password)
					.then(afterSubmit)
					.catch(afterSubmit);
			}
		}

		function afterSubmit(result) {
			console.log(result.data)
			if (result.data === 'true') {
				$rootScope.isLogin = true;
				$state.go('dashboard');
			}
		}
	}

})();
