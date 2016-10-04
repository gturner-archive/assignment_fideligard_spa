app.directive('transactionList', [function() {
	return {
		restrict: "A",
		templateUrl: 'js/templates/transactionList.html',
		scope: {
			transaction: "=",
		}
	};
}]);
