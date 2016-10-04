app.controller('PortfolioCtrl', ["$scope", 'transactionService', 'date', function($scope, transactionService, date) {

  $scope.date = date;
  $scope.portfolio = transactionService.getSymbolTransactions();

  $scope.$watch('date.index', function() {
    $scope.portfolio = transactionService.getSymbolTransactions();
    console.log($scope.portfolio, " PORT");
  });

}]);
