app.directive('portfolioList', ['StocksService', 'dateService', function(StocksService, dateService) {
	return {
		restrict: "A",
		templateUrl: 'js/templates/portfolioList.html',
		scope: {
			stock: "=",
      symbol: "="
		},
    link: function(scope) {
      scope.currentPrice = StocksService.currentPrice(scope.symbol);
      scope.totalQuantity = 0;
      scope.costBasis = 0;
      scope.date = dateService.getDate();

      (function() {
        for (var date in scope.stock) {
          scope.totalQuantity += Number(scope.stock[date].quantity)
        }
      })();

      scope.currentValue = scope.totalQuantity * scope.currentPrice;

      (function() {
        for (var date in scope.stock) {
          scope.costBasis += Number(scope.stock[date].quantity * scope.stock[date].cost);
        }
        scope.costBasis = scope.currentValue - scope.costBasis;
      })();

      scope.$watch('date.index', function() {
        scope.currentPrice = StocksService.currentPrice(scope.symbol);
        scope.totalQuantity = 0;
        scope.costBasis = 0;
        (function() {
          for (var date in scope.stock) {
            scope.totalQuantity += Number(scope.stock[date].quantity)
          }
        })();

        scope.currentValue = scope.totalQuantity * scope.currentPrice;

        (function() {
          for (var date in scope.stock) {
            scope.costBasis += Number(scope.stock[date].quantity * scope.stock[date].cost);
          }
          scope.costBasis = scope.currentValue - scope.costBasis;
        })();
      })

    }
	};
}]);
