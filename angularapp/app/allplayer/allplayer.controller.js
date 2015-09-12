(function() {
	'use strict';

	angular
		.module('app.allplayer')
		.controller('AllPlayer', AllPlayer);

	function AllPlayer(dataservice) {
		var vm = this;
		vm.allPlayers = [];
		vm.filteredPlayers = [];
		vm.showPlayers = [];
		vm.scoreFilterMode = true;
		vm.errorMsgs = [];
		vm.scoreFilter = {};
		vm.scoreFilter.min = null;
		vm.scoreFilter.max = null;
		vm.maxRow = 10;
		vm.offset = 0;

		vm.changeScoreFilterMode = changeScoreFilterMode;
		vm.filterPlayer = filterPlayer;
		vm.resetPlayer = resetPlayer;
		vm.changeMaxRow = changeMaxRow;
		vm.changePage = changePage;

		activate();
		function activate() {
			dataservice.getAllPlayers()
				.then(afterGetAllPlayers);
		}

		function changePage(newOffset) {
			vm.offset = newOffset;
			generateShowPlayers(vm.maxRow, vm.offset);
		}

		function changeMaxRow(newMaxRow) {
			vm.offset = 0;
			vm.maxRow = newMaxRow;
			generateShowPlayers(vm.maxRow, vm.offset);
		}

		function resetPlayer() {
			vm.offset = 0;
			vm.scoreFilter = {};
			generateShowPlayers(vm.maxRow, vm.offset);
		}

		function isValidFilter(index) {
			if (index == 0) {
				return !!vm.scoreFilter.min && !(parseInt(vm.scoreFilter.min) < 0) &&
					!isNaN(vm.scoreFilter.min);
			}

			if (index == 1) {
				return !!vm.scoreFilter.max && !(parseInt(vm.scoreFilter.max) < 0) &&
					!isNaN(vm.scoreFilter.max);
			}

			if (index == 2) {
				return parseInt(vm.scoreFilter.max) >= parseInt(vm.scoreFilter.min);
			}
		}

		function filterPlayer() {
			vm.errorMsgs = [];
			var hasError = false;
			if (!isValidFilter(0)) {
				vm.errorMsgs.minScore = 'has-error';
				hasError = true;
			}

			if (!isValidFilter(1)) {
				vm.errorMsgs.maxScore = 'has-error';
				hasError = true;
			}

			if (hasError) return;

			if (isValidFilter(2)) {
				vm.offset = 0;
				generateShowPlayers(vm.maxRow, vm.offset);
			} else {
				vm.errorMsgs.maxScore = 'has-error';
				vm.errorMsgs.minScore = 'has-error';
			}
		}

		function changeScoreFilterMode() {
			vm.scoreFilterMode = !vm.scoreFilterMode;
		}

		function afterGetAllPlayers(result) {
			vm.allPlayers = result;

			var tmpPlayers = [];
			_.each(vm.allPlayers, function(d, i) {
				for (var i = 0; i < 8; i++) {
					var tmp = angular.copy(d);
					tmp[0] = tmp[0] + ' ' + randNumber();
					tmp[1] = parseInt(tmp[1]) + randNumber();
					tmpPlayers.push(tmp);
				}
			});

			vm.allPlayers = tmpPlayers;

			generateShowPlayers(vm.maxRow, vm.offset);
		}

		function generateShowPlayers(maxRow, offset) {
			vm.filteredPlayers = vm.allPlayers;

			if (isValidFilter(0) && isValidFilter(1) && isValidFilter(2)) {
				vm.filteredPlayers = _.filter(vm.allPlayers, function(n) {
					return n[1] >= parseInt(vm.scoreFilter.min) && n[1] <= parseInt(vm.scoreFilter.max);
				});
			}

			var min = offset * maxRow;
			var max = min + maxRow;
			vm.showPlayers = [];
			var index = 1;
			_.each(vm.filteredPlayers, function(d, i) {
				var filter = (index > min) && (index <= max);
				if (filter) {
					var tmp = angular.copy(d);
					tmp.push(index);
					vm.showPlayers.push(tmp);
				}

				index++;
				return true;
			});
		}

		function randNumber() {
			return Math.floor(Math.random() * 200) + 1;
		}
	}
})();
