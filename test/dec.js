var DEC = artifacts.require("DECToken");

contract('DEC', function(accounts) {
  it("should put 100000000000000000 DEC in the first account", function() {
    return DEC.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 100000000000000000, "100000000000000000 wasn't in the first account");
    });
  });
  it("should send coin correctly", function() {
    var dec;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return DEC.deployed().then(function(instance) {
      dec = instance;
      return dec.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return dec.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return dec.transfer(account_two, amount, {from: account_one});
    }).then(function() {
      return dec.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return dec.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
  it("should call a function that depends on a linked library", function() {
    var dec;
    var decBalance;
    var decEthBalance;

    return DEC.deployed().then(function(instance) {
      dec = instance;
      return dec.balanceOf.call(accounts[0]);
    }).then(function(outCoinBalance) {
      decBalance = outCoinBalance.toNumber();
      return dec.balanceOf.call(accounts[0]);
    }).then(function(outCoinBalanceEth) {
      decEthBalance = 2 * outCoinBalanceEth.toNumber();
    }).then(function() {
      assert.equal(decEthBalance, 2 * decBalance, "Library function returned unexpected function, linkage may be broken");
    });
  });
});
