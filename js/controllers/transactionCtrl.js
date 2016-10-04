app.controller('TransactionCtrl', ["$scope", 'transactionService', 'date', function($scope, transactionService, date) {

  $scope.date = date;
  $scope.transactions = transactionService.getIndividualTransactions();

  $scope.$watch('date.index', function() {
    angular.copy(transactionService.getIndividualTransactions(), $scope.transactions);
  });

}]);
