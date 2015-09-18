(function() {
	'use strict';

	angular
		.module('app.redeemscore')
		.controller('RedeemScore', RedeemScore);

	function RedeemScore($filter, dataservice, $scope) {
		var allrow = [];
		var vm = this;
		vm.tab = 'group-by-user'; // group-by-user/all-row
		vm.tab = 'all-row';
		vm.users = [];
		vm.allRowInTable = [];
		vm.rowInPage = [];
		vm.allRowFilter = {};
		vm.totalSortOpt = true;

		vm.pageOpt = {};
		vm.pageOpt.currentPage = 1;
		vm.pageOpt.maxSize = 5;
		vm.pageOpt.itemPerPage = 15;

		vm.changeTab = changeTab;
		vm.filterByItemName = filterByItemName;
		vm.filterByName = filterByName;
		vm.toggleTotalSort = toggleTotalSort;
		vm.changePage = changePage;
		vm.resetFilter = resetFilter;

		activate();
		function activate() {
			dataservice.getRedeemScores()
				.then(afterRedeemScore);
		}

		function resetFilter() {
			vm.allRowFilter.name = '';
			vm.allRowFilter.itemName = '';
			filterByName();
		}

		function changePage() {
			updateRowInPage();
		}

		function updatePagOpt() {
			vm.pageOpt.totalItems = vm.allRowInTable.length;
			vm.pageOpt.currentPage = 1;
			updateRowInPage();
		}

		function updateRowInPage() {
			var itemPerPage = vm.pageOpt.itemPerPage;
			var totalItems = vm.allRowInTable.length;
			var start = (vm.pageOpt.currentPage * itemPerPage) - itemPerPage;
			var end = (vm.pageOpt.currentPage * itemPerPage);
			end = totalItems < end ? totalItems : end;

			vm.rowInPage = _.slice(vm.allRowInTable, start, end);
		}

		function toggleTotalSort() {
			vm.totalSortOpt = !vm.totalSortOpt;
			var tmp = _.sortBy(vm.allRowInTable, function(d) {
				return d.total * (vm.totalSortOpt ? 1 : -1);
			});

			vm.allRowInTable = tmp;
			updateRowInPage();
		}

		function filterByName() {
			vm.allRowFilter.itemName = '';
			var name = vm.allRowFilter.name;
			vm.allRowInTable = _.filter(allrow, function(r) {
				return r.nameLower.indexOf(name) > -1;
			});

			updatePagOpt();
		}

		function filterByItemName() {
			vm.allRowFilter.name = '';
			var itemName = vm.allRowFilter.itemName;
			vm.allRowInTable = _.filter(allrow, function(r) {
				return r.itemNameLower.indexOf(itemName) > -1;
			});

			updatePagOpt();
		}

		function changeTab(tab) {
			vm.tab = tab;
		}

		function afterRedeemScore(result) {
			// var length = result.length;
			// for(var j=0;j<9;j++)	{
			// 	for(var i=0;i<length;i++) {
			// 		var r = angular.copy(result[i]);
			// 		r[0] = i+j;
			// 		r[1] += ' - ' + i;
			// 		result.push(r);
			// 	}
			// }

			// init all row
			allrow = [];
			vm.allRowInTable = [];
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

			vm.allRowInTable = angular.copy(allrow);
			updatePagOpt();

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
