(function() {
	'use strict';

	angular
		.module('app.redeemtype')
		.controller('RedeemType', RedeemType);

	function RedeemType(dataservice, $modal, $scope) {
		var vm = this;
		var modalInstance = null;

		vm.modalAttr = {};
		vm.errorMsg = [];
		vm.openModal = openModal;
		vm.closeModal = closeModal;
		vm.saveData = saveData;
		vm.deleteConfirm = deleteConfirm;
		vm.deleteData = deleteData;

		activate();
		function activate() {
			dataservice.getRedeemType()
				.then(afterGetRedeemType);
		}

		function deleteData() {
			modalInstance.dismiss();
			dataservice.deleteRedeemType(vm.modalAttr.val[0])
				.then(afterSave);
		}

		function deleteConfirm(val) {
			vm.modalAttr.val = angular.copy(val);
			modalInstance = $modal.open({
				templateUrl: 'deleteConfirm.html',
				size: 'sm',
				scope: $scope,
				backdrop: 'static'
			});
		}

		function saveData() {
			vm.errorMsg = {};
			var hasError = false;

			if (!vm.modalAttr.val[1]) {
				vm.errorMsg.name = 'has-error';
				hasError = true;
			}

			var validScore = !!vm.modalAttr.val[2] &&
				!(parseInt(vm.modalAttr.val[2]) < 0) &&
				!isNaN(vm.modalAttr.val[2]);

			if (!validScore) {
				vm.errorMsg.score = 'has-error';
				hasError = true;
			} else {
				dataservice.saveRedeemType(vm.modalAttr.val, vm.modalAttr.isNew)
					.then(afterSave);
			}
		}

		function afterSave(data) {
			afterGetRedeemType(data);
			modalInstance.dismiss();
		}

		function openModal(val) {
			if (val) {
				vm.modalAttr.val = angular.copy(val);
				vm.modalAttr.isNew = false;
			} else {
				vm.modalAttr.val = {};
				vm.modalAttr.isNew = true;
			}

			modalInstance = $modal.open({
				templateUrl: 'myModalContent.html',
				scope: $scope,
				backdrop: 'static'
			});
		}

		function closeModal() {
			modalInstance.dismiss();
		}

		function afterGetRedeemType(result) {
			vm.redeemtypes = result;
		}

	}
})();
