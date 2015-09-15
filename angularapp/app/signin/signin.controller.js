(function() {
	'use strict';

	angular
		.module('app.signin')
		.controller('SignIn', SignIn);

	function SignIn() {
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

		}
	}

})();
