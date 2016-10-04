"use strict";
var app = angular.module('stocks', ['ui.router']);

//lodash
app.factory('_', ['$window', function($window){
  return $window._;
}]);

//routes
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/fideligard');

	$stateProvider
		.state('main', {
			url: '/fideligard',
			views: {
				'stocksTicker':{
					templateUrl: 'js/templates/stocksTicker.html',
					controller: "StocksCtrl"
				},
				'dateSlider':{
					templateUrl: 'js/templates/dateSlider.html',
					controller: "DateCtrl"
				},
				'mainContent':{
					templateUrl: 'js/templates/mainContent.html'
				}
			},
      resolve: {
        date: function(dateService) {
          return dateService.getDate();
        },
        stocks: function(StocksService) {
          return StocksService.all();
        },
        dates: ['stocks', 'StocksService', function(stocks, StocksService) {
          return StocksService.getDateCollection();
        }]
      }

		})
		.state('main.portfolio', {
			url: '/portfolio',
			templateUrl: 'js/templates/portfolio.html',
			controller: 'PortfolioCtrl'
		})
		.state('main.trade', {
			url: '/trade',
			templateUrl: 'js/templates/trade.html',
			controller: 'TradeCtrl'
		})
		.state('main.transactions', {
			url: '/transactions',
			templateUrl: 'js/templates/transactions.html',
			controller: 'TransactionCtrl'
		});

}]);
