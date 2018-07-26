pragma solidity ^0.4.21;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DEC.sol";

contract TestDECToken {
  // Truffle looks for `initialBalance` when it compiles the test suite 
  // and funds this test contract with the specified amount on deployment.
  uint public initialBalance = 10 ether;

  address contractAddress;
  DECToken dec;

  function testInitialBalanceUsingDeployedContract() {
    contractAddress = DeployedAddresses.DECToken();
    dec = DECToken(contractAddress);
    uint expected = 100000000000000000; // dec * decimals

    Assert.equal(dec.balanceOf(tx.origin), expected, "Owner should have 100000000000000000 DECToken initially");
    Assert.equal(dec.balanceOf(contractAddress), 0, "Contract should have 0 DECToken initially");
  }

}