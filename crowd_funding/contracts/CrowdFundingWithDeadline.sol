pragma solidity ^0.4.25;

contract CrowdFundingWithDeadline {
  
  enum State { Ongoing, Failed, Succeeded, PaidOut }
  
  string public name;
  uint public targetAmount;
  uint public fundingDeadline;
  address public beneficiary;
  State public state;
  mapping(address => uint) public amounts;
  bool public collected;
  uint public totalCollected;

  modifier inState(State expectedState) {
    require(state == expectedState, "Invalid state");
    _;
  }

  modifier beforeDead() {
    require(currentTime() < fundingDeadline, "No contributions after deadline!");
    _;
  }
  
  constructor (
      string contractName,
      uint targetAmountEth,
      uint durationInMin,
      address beneficiaryAddress
    ) public {
        name = contractName;
        targetAmount = targetAmountEth * 1 ether;
        fundingDeadline = currentTime() + durationInMin * 1 minutes;
        beneficiary = beneficiaryAddress;
        state = State.Ongoing;
    }

    function contribute() public payable inState(State.Ongoing) beforeDead() {
      amounts[msg.sender] += msg.value;
      totalCollected += msg.value;

      if (totalCollected >= targetAmount) {
        collected = true;
      }
    }
    
    function currentTime() internal view returns(uint) {
        return now;
    }
}