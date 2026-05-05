// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LostFoundAdvanced {

    struct Item {
        uint id;
        string name;
        string category;
        string location;

        uint reward;

        address payable owner;
        address payable finder;

        bool found;
        bool ownerVerified;   // ✅ NEW (form verification result)
        bool approved;
        bool claimed;

        uint createdAt;
    }

    uint public itemCount = 0;

    mapping(uint => Item) public items;

    // EVENTS
    event LostReported(uint id, string name, uint reward, address owner);
    event FoundReported(uint id, address finder);
    event OwnerVerified(uint id); // ✅ NEW
    event RewardApproved(uint id);
    event RewardClaimed(uint id, address finder, uint amount);

    // -----------------------------------
    // REPORT LOST ITEM
    // -----------------------------------
    function reportLost(
        string memory _name,
        string memory _category,
        string memory _location
    ) public payable {

        require(msg.value > 0, "Reward required");

        itemCount++;

        items[itemCount] = Item(
            itemCount,
            _name,
            _category,
            _location,
            msg.value,
            payable(msg.sender),
            payable(address(0)),
            false,
            false, // ownerVerified
            false,
            false,
            block.timestamp
        );

        emit LostReported(itemCount, _name, msg.value, msg.sender);
    }

    // -----------------------------------
    // REPORT FOUND
    // -----------------------------------
    function reportFound(uint _id) public {

        require(_id > 0 && _id <= itemCount, "Invalid ID");

        Item storage item = items[_id];

        require(!item.claimed, "Already claimed");

        item.finder = payable(msg.sender);
        item.found = true;

        emit FoundReported(_id, msg.sender);
    }

    // -----------------------------------
    // FINDER VERIFIES OWNER (FORM RESULT)
    // -----------------------------------
    function verifyOwner(uint _id) public {

        Item storage item = items[_id];

        require(msg.sender == item.finder, "Only finder can verify");
        require(item.found == true, "Item not marked found");

        item.ownerVerified = true;

        emit OwnerVerified(_id);
    }

    // -----------------------------------
    // OWNER APPROVES REWARD
    // -----------------------------------
    function approveReward(uint _id) public {

        Item storage item = items[_id];

        require(msg.sender == item.owner, "Only owner");
        require(item.found == true, "Not found yet");
        require(item.ownerVerified == true, "Owner not verified"); // ✅ NEW
        require(!item.claimed, "Already claimed");

        item.approved = true;

        emit RewardApproved(_id);
    }

    // -----------------------------------
    // FINDER CLAIMS REWARD
    // -----------------------------------
    function claimReward(uint _id) public {

        Item storage item = items[_id];

        require(msg.sender == item.finder, "Only finder");
        require(item.approved == true, "Not approved");
        require(item.ownerVerified == true, "Not verified"); // ✅ EXTRA SAFETY
        require(!item.claimed, "Already claimed");

        uint amount = item.reward;

        item.claimed = true;

        item.finder.transfer(amount);

        emit RewardClaimed(_id, msg.sender, amount);
    }

    // -----------------------------------
    // VIEW ITEM
    // -----------------------------------
    function getItem(uint _id)
    public
    view
    returns(
        uint,
        string memory,
        string memory,
        string memory,
        uint,
        address,
        address,
        bool,
        bool,
        bool,
        bool,
        uint
    )
    {
        Item memory item = items[_id];

        return(
            item.id,
            item.name,
            item.category,
            item.location,
            item.reward,
            item.owner,
            item.finder,
            item.found,
            item.ownerVerified, // ✅ NEW
            item.approved,
            item.claimed,
            item.createdAt
        );
    }

    // -----------------------------------
    // CONTRACT BALANCE
    // -----------------------------------
    function getContractBalance()
    public
    view
    returns(uint)
    {
        return address(this).balance;
    }
}