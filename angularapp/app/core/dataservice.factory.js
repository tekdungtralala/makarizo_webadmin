(function() {
	'use strict';

	angular
		.module('app.core')
		.factory('dataservice', Dataservice);

	function Dataservice($q, $http, $rootScope) {
		var getAllPlayersUrl = 'highscore.php';

		var service = {
			getAllPlayers: getAllPlayers
		};

		return service;

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
