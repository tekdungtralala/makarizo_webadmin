(function() {
	'use strict';

	angular
		.module('app.core')
		.factory('dataservice', Dataservice);

	function Dataservice($q, $http, $rootScope, $state) {
		var getAllPlayersUrl = 'highscore.php';
		var getRedeemTypeUrl = 'redeemtype.php';
		var getSaveRTUrl = 'postredeemtype.php';
		var getDeleteRTUrl = 'deleteRedeemType.php';
		var getIsLoginUrl = 'isLogin.php';

		var service = {
			getAllPlayers: getAllPlayers,
			getRedeemType: getRedeemType,
			saveRedeemType: saveRedeemType,
			deleteRedeemType: deleteRedeemType,
			chekAdminLogin: chekAdminLogin
		};

		return service;

		function chekAdminLogin() {
			if (!$rootScope.isLogin) {
				$rootScope.promise = $http.get(generateUrl(getIsLoginUrl))
					.then(isAdminLogged);

				function isAdminLogged(result) {
					if (result.data !== 'true') $state.go('signin');
				}
			}
		}

		function deleteRedeemType(id) {
			var url = generateUrl(getDeleteRTUrl) + '?id=' + id;

			$rootScope.promise = $http.get(url)
				.then(getData)
				.catch(function(message) {
			});

			return $rootScope.promise;
		}

		function saveRedeemType(data, isNew) {
			var url = generateUrl(getSaveRTUrl);
			url = url + '?name=' + data[1] + '&score=' + data[2];

			if (!isNew && data[0]) {
				url = url + '&id=' + data[0];
			}

			$rootScope.promise = $http.get(url)
				.then(getData)
				.catch(function(message) {
			});

			return $rootScope.promise;
		}

		function getRedeemType() {
			$rootScope.promise = $http.get(generateUrl(getRedeemTypeUrl))
				.then(getData)
				.catch(function(message) {
			});

			return $rootScope.promise;
		}

		function getAllPlayers() {
			$rootScope.promise = $http.get(generateUrl(getAllPlayersUrl))
				.then(getData)
				.catch(function(message) {
			});

			return $rootScope.promise;
		}

		function getData(result) {
			return result.data;
		}

		function generateUrl(url) {
			return '../rest/' + url;
		}

	}
})();
