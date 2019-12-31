pragma solidity >=0.4.22 <= 0.6.0;
pragma experimental ABIEncoderV2;

contract MultiSigWallet {
    uint minApprovers;
    
    address payable beneficiary;
    address payable owner;
    
    mapping (address => bool) approvedBy;
    mapping (address => bool) isApprover;
    uint approvalsNum;
    
    constructor(
        address[] memory _approvers,
        uint _minApprovers,
        address _beneficiary
    ) public payable {
        require (_minApprovers <= _approvers.length, "Number of approvers should be less or equal than the quantity of approvers.");
        
        minApprovers = _minApprovers;
        beneficiary = address(uint160(_beneficiary));
        owner = address(uint160(msg.sender));
        
        for (uint i = 0; i < _approvers.length; i++) {
            isApprover[_approvers[i]] = true;
        }
    }
    
    function approve() public {
        require (isApprover[msg.sender], "Not an approver.");
        if (!approvedBy[msg.sender]) {
            approvalsNum++;
            approvedBy[msg.sender] = true;
        }
        if (approvalsNum == minApprovers) {
            beneficiary.send(address(this).balance);
            selfdestruct(owner);
        }
    }
    
    function reject() public {
        require (isApprover[msg.sender], "Not an approver.");
        selfdestruct(address(uint160(msg.sender)));
    }
    
}
