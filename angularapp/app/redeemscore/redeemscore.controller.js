(function() {
	'use strict';

	angular
		.module('app.redeemscore')
		.controller('RedeemScore', RedeemScore);

	function RedeemScore(dataservice) {
		var vm = this;
		vm.users = [];

		activate();
		function activate() {
			dataservice.getRedeemScores()
				.then(afterRedeemScore);
		}

		function afterRedeemScore(result) {
			vm.users = [];
			var user = [];
			_.each(result, function(r) {
				if (user.id !== r[0]) {

					addingNewUser(user);

					user = {};
					user.id = r[0];
					user.name = r[1];
					user.products = [];

					addingNewProduct(user, r[2]);
				} else {
					var finded = false;
					_.each(user.products, function(p) {
						if (p.name == r[2]) {
							p.total++;
							finded = true;
						}

						return true;
					});

					if (!finded) {
						addingNewProduct(user, r[2]);
					}

				}

				return true;
			});

			addingNewUser(user);
		}

		function addingNewProduct(user, productName) {
			user.products.push({
				name: productName,
				total: 1
			});
		}

		function addingNewUser(user) {
			if (user && user.id) {
				vm.users.push(user);
			}
		}
	}

})();
