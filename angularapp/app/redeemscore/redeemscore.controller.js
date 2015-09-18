(function() {
	'use strict';

	angular
		.module('app.redeemscore')
		.controller('RedeemScore', RedeemScore);

	function RedeemScore($filter, dataservice) {
		var allrow = [];
		var vm = this;
		vm.tab = 'group-by-user'; // group-by-user/all-row
		vm.tab = 'all-row';
		vm.users = [];
		vm.showAllrow = [];
		vm.allRowFilter = {};
		vm.totalSortOpt = true;

		vm.changeTab = changeTab;
		vm.filterByItemName = filterByItemName;
		vm.filterByName = filterByName;
		vm.toggleTotalSort = toggleTotalSort;

		activate();
		function activate() {
			dataservice.getRedeemScores()
				.then(afterRedeemScore);
		}

		function toggleTotalSort() {
			vm.totalSortOpt = !vm.totalSortOpt;
		}

		function filterByName() {
			var name = vm.allRowFilter.name;
			vm.showAllrow = _.filter(allrow, function(r) {
				return r.nameLower.indexOf(name) > -1;
			});
		}

		function filterByItemName() {
			var itemName = vm.allRowFilter.itemName;
			vm.showAllrow = _.filter(allrow, function(r) {
				return r.itemNameLower.indexOf(itemName) > -1;
			});
		}

		function changeTab(tab) {
			vm.tab = tab;
		}

		function afterRedeemScore(result) {
			// init all row
			allrow = [];
			vm.showAllrow = [];
			_.each(result, function(r) {
				var newData = {
					id: r[0],
					name: r[1],
					nameLower: r[1].toLowerCase(),
					itemName: r[2],
					itemNameLower: r[2].toLowerCase(),
					total: 1
				};

				var index = _.findIndex(allrow, function(d) {
					return d.id === newData.id && d.itemName === newData.itemName;
				});

				if (index > -1) {
					allrow[index].total += 1;
				} else {
					allrow.push(newData);
				}

				return true;
			});

			vm.showAllrow = angular.copy(allrow);

			// init table group-by-user
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
