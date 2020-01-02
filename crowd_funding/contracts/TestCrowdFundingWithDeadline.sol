pragma solidity ^0.4.25;
import "./CrowdFundingWithDeadline.sol";

contract TestCrowdFundingWithDeadline is CrowdFundingWithDeadline {

  uint time;

  constructor (
      string contractName,
      uint targetAmountEth,
      uint durationInMin,
      address beneficiaryAddress
    ) CrowdFundingWithDeadline(contractName, targetAmountEth, durationInMin, beneficiaryAddress) public {}

  function currentTime() internal view returns(uint) {
    return time;
  }

  function setTime(uint newTime) public {
    time = newTime;
  }
  
}