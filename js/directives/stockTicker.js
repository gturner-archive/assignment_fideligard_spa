"use strict";
app.directive('stockTicker', ['StocksService', 'dateService', function(StocksService, dateService) {
	return{
		restrict: "A",
		templateUrl: 'js/templates/stockTicker.html',
		scope: {
			stock: "=",
      symbol: "="
		},
    link: function(scope) {
    scope.currentDate = dateService.getDate();
    scope.$watch('currentDate.index', function(){
    	scope.currentPrice = StocksService.currentPrice(scope.symbol);
      scope.thirtyDay = StocksService.thirtyDayAverage(scope.symbol);
      scope.sevenDay = StocksService.sevenDayAverage(scope.symbol);
    });
    scope.currentPrice = StocksService.currentPrice(scope.symbol);
    scope.thirtyDay = StocksService.thirtyDayAverage(scope.symbol);
    scope.sevenDay = StocksService.sevenDayAverage(scope.symbol);
    }
	};
}]);
