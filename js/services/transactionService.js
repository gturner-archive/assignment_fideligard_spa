app.factory('transactionService', ['dateService', 'StocksService', '_', function(dateService, StocksService, _) {
  var _individualTransactionsByDate = {};
  var _transactionsBySymbol = {};
  var _totalTransactionsByDate = {};

  var _updateIndividualTransaction = function(cost, symbol, date, quantity, transaction)  {
    if (_individualTransactionsByDate[date]) {
      _individualTransactionsByDate[date].push({symbol: symbol, cost: cost, quantity: quantity, transaction: transaction, date: date});
    } else {
      _individualTransactionsByDate[date] = [{symbol: symbol, cost: cost, quantity: quantity, transaction: transaction, date: date}];
    }
  };

  var _updateTransactionBySymbol = function(cost, symbol, date, quantity, transaction) {
    if (_transactionsBySymbol[symbol]) {
      if (_transactionsBySymbol[symbol][date]) {
        if (transaction === 'buy') {
          _transactionsBySymbol[symbol][date].quantity += quantity;
        } else {
          _transactionsBySymbol[symbol][date].quantity -= quantity;
        }
      } else {
        if (transaction === 'buy') {
          _transactionsBySymbol[symbol][date] = {quantity: quantity, cost: cost};
        }
      }

    } else {
      if (transaction === 'buy') {
        _transactionsBySymbol[symbol] = {};
        _transactionsBySymbol[symbol][date] = {quantity: quantity, cost: cost};
      }
    }
  };

  var _updateTotalTransaction = function(cost, symbol, date, quantity, transaction) {
    if (_totalTransactionsByDate[date]) {
      if (_totalTransactionsByDate[date][symbol]) {
        if (transaction === "buy") {
          _totalTransactionsByDate[date][symbol].quantity += quantity;
        } else {
          _totalTransactionsByDate[date][symbol].quantity -= quantity;
        }
      } else {
        if (transaction === "buy") {
          _totalTransactionsByDate[date][symbol] = {quantity: quantity, cost: cost}
        }
      }
    } else {
      if (transaction === "buy") {
        _totalTransactionsByDate[date] = {};
        _totalTransactionsByDate[date][symbol] = {quantity: quantity, cost: cost};
      }
    }
  }

  var updateTransactions = function(cost, symbol, date, quantity, transaction) {
    _updateIndividualTransaction(cost, symbol, date, quantity, transaction);
    _updateTransactionBySymbol(cost, symbol, date, quantity, transaction);
    _updateTotalTransaction(cost, symbol, date, quantity, transaction);
  };

  var getIndividualTransactions = function() {
    var finalArr = [];
    for (var date in _individualTransactionsByDate) {
      if (date <= StocksService.getDateCollection()[dateService.getDate().index]) {
        finalArr.push(_individualTransactionsByDate[date])
      }
    }
    return _.flatten(finalArr);
  };

  var getTotalTransactions = function() {
    return _.filter(_totalTransactionsByDate, function(stock, date) {
      return date <= StocksService.getDateCollection()[dateService.getDate().index]
    });
  };

  var getSymbolTransactions = function() {
    var newObj = {};
    for (var symbol in _transactionsBySymbol) {
      var dates = _.filter(_transactionsBySymbol[symbol], function(info, date) {
        return date <= StocksService.getDateCollection()[dateService.getDate().index]
      });
      if (dates[0]) {
        newObj[symbol] = dates;
      }
    }
    return newObj;
  }

  return {
    updateTransactions: updateTransactions,
    getIndividualTransactions: getIndividualTransactions,
    getTotalTransactions: getTotalTransactions,
    getSymbolTransactions: getSymbolTransactions
  }

}]);
