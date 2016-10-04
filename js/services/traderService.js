app.factory('traderService', [function() {

  var _cash = {total: 1000000};

  var validOrder = function(amount, transaction, symbol, date) {
      amount = Number(amount);
      if (transaction === 'buy') {
        return amount <= _cash.total;
      } else if (transaction === 'sell') {
        amount <= transactionService.getTotalTransactions()[date][symbol].quantity
      }

  };

  var getCash = function() {
    return _cash;
  };

  var setCash = function(transaction, cost, quantity) {
    if (transaction === 'buy') {
      angular.copy({total: _cash.total -= cost * quantity})
    } else if (transaction === 'sell') {
      angular.copy({total: _cash.total += cost * quantity})
    }
  }

  return {
    getCash: getCash,
    validOrder: validOrder,
    setCash: setCash
  }



}]);
