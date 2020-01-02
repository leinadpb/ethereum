pragma solidity ^0.4.25;

contract Voter {
    struct OptionPos {
        uint pos;
        bool exists;
    }
    uint[] public votes;
    string[] public options;
    mapping (address => bool) hasVoted;
    mapping (string => OptionPos) postOfOption;
    bool votingStarted;
    function addOption(string memory _option) public {
      require(!votingStarted, 'Voting has not started yet!');
      options.push(_option);
    }
    function startVoting() public {
      require(!votingStarted, 'Voting has not started yet!!!');
      votes.length = options.length;
      for (uint i = 0; i < options.length; i++) {
        OptionPos memory option = OptionPos(i, true);
        postOfOption[options[i]] = option;
      }
      votingStarted = true;
    }
    function vote(uint _option) public {
        require(0 <= _option && _option < options.length, 'Invalid option');
        require(!hasVoted[msg.sender], 'Account has already voted!!!');
        votes[_option] = votes[_option] + 1;
        hasVoted[msg.sender] = true;
    }
    function vote(string memory optionName) public {
        require(!hasVoted[msg.sender], 'Account has already voted!!!');
        OptionPos memory optionPos = postOfOption[optionName];
        require(optionPos.exists, 'Option does not exists');
        votes[optionPos.pos] = votes[optionPos.pos] + 1;
        hasVoted[msg.sender] = true;
    }
    function getVotes() public view returns (uint[] memory) {
        return votes;
    }
}

