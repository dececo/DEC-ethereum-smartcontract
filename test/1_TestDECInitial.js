var DEC = artifacts.require("DECToken");

contract('1. DEC Initialization', function(accounts) {
  it("should put 100000000000000000 DEC in the first account", function() {
    return DEC.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 100000000000000000, "100000000000000000 wasn't in the first account");
    });
  });
  it("should have empty buy/sell price", function() {
    var buyPrice;
    var sellPrice;

    return DEC.deployed().then(function(instance) {
      dec = instance;
      return dec.buyPrice.call();
    }).then(function(outBuyPrice) {
      buyPrice = outBuyPrice.toNumber();
      return dec.sellPrice.call();
    }).then(function(outSellPrice) {
      sellPrice = outSellPrice.toNumber();
    }).then(function() {
      assert.equal(buyPrice, 0, "buyPrice should be 0 initially");
      assert.equal(sellPrice, 0, "sellPrice should be 0 initially");
    });
  });
});
