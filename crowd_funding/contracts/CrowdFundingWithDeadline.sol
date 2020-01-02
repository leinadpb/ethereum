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

  modifier beforeDead(string errorMsg) {
    require(currentTime() < fundingDeadline, errorMsg);
    _;
  }

  modifier afterDead(string errorMsg) {
    require(currentTime() >= fundingDeadline, errorMsg);
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

    function contribute() public payable inState(State.Ongoing) beforeDead("No contributions after deadline!") {
      amounts[msg.sender] += msg.value;
      totalCollected += msg.value;

      if (totalCollected >= targetAmount) {
        collected = true;
      }
    }

    function finishCrowdFunding() public inState(State.Ongoing) afterDead("Cannot finish campaign before a deadline") {
      if (!collected) {
        state = State.Failed;
      } else {
        state = State.Succeeded;
      }
    }

    function collect() public inState(State.Succeeded) {
      if (beneficiary.send(totalCollected)) {
        state = State.PaidOut;
      } else {
        state = State.Failed;
      }
    }

    function withdraw() public inState(State.Failed) {
      require(amounts[msg.sender] > 0, "Nothing was contributed");
      uint contributed = amounts[msg.sender];
      amounts[msg.sender] = 0;

      if (!msg.sender.send(contributed)) {
        amounts[msg.sender] = contributed;
      }
    }
    
    function currentTime() internal view returns(uint) {
        return now;
    }
}