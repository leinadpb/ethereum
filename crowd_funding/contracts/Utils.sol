pragma solidity ^0.4.25;

library Utils {
  function etherToWei(uint sumInEth) public pure returns(uint) {
    return sumInEth * 1 ether;
  }

  function minutesToSeconds(uint timInMin) public pure returns(uint) {
    return timInMin * 1 minutes;
  }
}