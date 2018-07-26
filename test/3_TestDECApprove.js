var DEC = artifacts.require("DECToken");

contract('3. DEC Approve', function(accounts) {
  it("should have 0 DEC allowance at first", function() {
    var dec;

    var account_one = accounts[0];
    var account_two = accounts[2];

    var allowance_before_approve;
    var allowance_after_approve;

    var amount = 10;

    return DEC.deployed().then(function(instance) {
      dec = instance;
      return dec.allowance.call(account_one, account_two);
    }).then(function(outAllowanceBeforeApprove) {
      allowance_before_approve = outAllowanceBeforeApprove.toNumber();
      return dec.approve(account_two, amount, {from: account_one});
    }).then(function() {
      return dec.allowance.call(account_one, account_two);
    }).then(function(outAllowanceAfterApprove) {
      allowance_after_approve = outAllowanceAfterApprove.toNumber();

      assert.equal(allowance_before_approve, 0, "Amount wasn't 0 before approve");
      assert.equal(allowance_after_approve, amount, "Amount wasn't `amount` after approve");
      assert.equal(allowance_before_approve + amount, allowance_after_approve, "Amount wasn't correctly approve from the sender");
    });
  });
  it("should send coin correctly", function() {
    var dec;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];
    var account_three = accounts[2];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;


    var starting_allowance;
    var ending_allowance;

    var amount = 9;

    return DEC.deployed().then(function(instance) {
      dec = instance;
      return dec.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return dec.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return dec.allowance.call(account_one, account_three);
    }).then(function(balance){
      starting_allowance = balance.toNumber();
      return dec.transferFrom(account_one, account_two, amount, {from: account_three});
    }).then(function() {
      return dec.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return dec.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();
      return dec.allowance.call(account_one, account_three);
    }).then(function(balance) {
      ending_allowance = balance.toNumber();
      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");      
      assert.equal(starting_allowance, ending_allowance + amount, "Allowance wasn't correctly update to the receiver");      
    });
  });
});
