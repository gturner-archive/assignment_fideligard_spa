app.filter('symbolFilter', function() {
  return function(collection, symbolArg) {
    var finalObj = {};
    if (symbolArg == false || symbolArg === undefined) { return collection }
    for (var symbol in collection) {
      if (symbol.indexOf(symbolArg.toUpperCase()) > -1) {
        finalObj[symbol] = collection[symbol]
      }
    }
    return finalObj;
  }
});
