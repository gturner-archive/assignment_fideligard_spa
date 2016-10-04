app.controller('TradeCtrl', ['$scope', 'stocks', 'traderService', 'transactionService', function($scope, stocks, traderService, transactionService) {
  $scope.stocks = stocks;
  $scope.currentCash = traderService.getCash();

  $scope.buyOrSell = function() {
    var singleStock = stocks[$scope.name];
    if (singleStock && singleStock[$scope.date] && $scope.quantity) {
      traderService.setCash($scope.transaction, $scope.price, $scope.quantity);
      transactionService.updateTransactions($scope.price, $scope.name, $scope.date, $scope.quantity, $scope.transaction);
      $scope.name = "";
      $scope.quantity = "";
      $scope.date = "";
      $scope.price = "";
      $scope.cost = "";
    }
  }

  $scope.$watch('cost', function(newValue) {
    if (traderService.validOrder(newValue, $scope.transaction, $scope.name)) {
      $scope.validity = "Valid";
    } else {
      $scope.validity = "Invalid";
    }
  });

  $scope.$watchGroup(['name', 'quantity', 'date'], function() {
    if ($scope.name && $scope.date && $scope.quantity) {
      var singleStock = stocks[$scope.name]
      if (singleStock && $scope.date) {
        $scope.price = singleStock[$scope.date].Close;
        $scope.cost = $scope.price * $scope.quantity;
      }
    }
  })

}]);
