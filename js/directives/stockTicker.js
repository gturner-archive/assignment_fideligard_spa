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
      scope.thirtyDay = StocksService.thirtyDayDelta(scope.symbol);
      scope.sevenDay = StocksService.sevenDayDelta(scope.symbol);
      scope.singleDay = StocksService.singleDayDelta(scope.symbol);
    });
    scope.currentPrice = StocksService.currentPrice(scope.symbol);
    scope.thirtyDay = StocksService.thirtyDayDelta(scope.symbol);
    scope.sevenDay = StocksService.sevenDayDelta(scope.symbol);
    scope.singleDay = StocksService.singleDayDelta(scope.symbol);
    }
	};
}]);
