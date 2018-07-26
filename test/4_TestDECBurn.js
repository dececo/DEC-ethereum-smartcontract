var DEC = artifacts.require("DECToken");

contract('4. DEC Burn', function(accounts) {
  it("should empty at first", function() {
    var account = accounts[3]
    return DEC.deployed().then(function(instance) {
      return instance.balanceOf.call(account);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "account's balance is not 0");
    });
  });
  it("should burn DEC from itself", function() {
    var dec;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[3];

    var starting_balance;
    var ending_balance;

    var amount = 4;

    return DEC.deployed().then(function(instance) {
      dec = instance;
      return dec.transfer(account_two, amount, {from: account_one});
    }).then(function() {
      return dec.balanceOf.call(account_two);
    }).then(function(balance) {
      starting_balance = balance.toNumber();
      return dec.burn(amount, {from: account_two});
    }).then(function() {
      return dec.balanceOf.call(account_two);      
    }).then(function(balance) {
      ending_balance = balance.toNumber();

      assert.equal(starting_balance, amount, "should have `amount` DEC before burn");
      assert.equal(ending_balance, starting_balance - amount, "Amount wasn't correctly burn");
      assert.equal(ending_balance, 0, "should have no DEC after burn");
    });
  });
  it("should burn DEC from her father", function() {
    var dec;

    var account_one = accounts[0];
    var account_two = accounts[3];

    var starting_balance;
    var ending_balance;

    var amount = 44;

    return DEC.deployed().then(function(instance) {
      dec = instance;
      return dec.approve(account_two, amount, {from: account_one});
    }).then(function() {
      return dec.balanceOf.call(account_one);
    }).then(function(balance) {
      starting_balance = balance.toNumber();
      return dec.burnFrom(account_one, amount, {from: account_two});
    }).then(function() {
      return dec.balanceOf.call(account_one);      
    }).then(function(balance) {
      ending_balance = balance.toNumber();

      assert.equal(ending_balance, starting_balance - amount, "Amount wasn't correctly burn");
    });
  });
});
