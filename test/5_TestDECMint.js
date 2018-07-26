var DEC = artifacts.require("DECToken");

contract('5. DEC Mint', function(accounts) {
  it("should put 100000000000000000 DEC in the first account", function() {
    return DEC.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 100000000000000000, "100000000000000000 wasn't in the first account");
    });
  });
  it("should mint coin correctly", function() {
    var dec;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;
    var starting_total_supply;
    var ending_total_supply;

    var amount = 10;

    return DEC.deployed().then(function(instance) {
      dec = instance;
      return dec.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return dec.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return dec.totalSupply.call();
    }).then(function(balance) {
      starting_total_supply = balance.toNumber();
      return dec.mintToken(account_two, amount, {from: account_one});
    }).then(function() {
      return dec.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return dec.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();
      return dec.totalSupply.call();
    }).then(function(balance) {
      ending_total_supply = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance, "owner's account shouldn't be increase");
      assert.equal(ending_total_supply, starting_total_supply + amount, "total supply wasn't increased correctly");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "target account wasn't increased correctly");
    });
  });
});
