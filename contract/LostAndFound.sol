// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LostFoundAdvanced {

    struct Item {
        uint id;
        string name;
        string category;
        string location;
        string proofHash;
        uint reward;
        address payable owner;
        address payable finder;
        bool found;
        bool approved;
        bool claimed;
        uint createdAt;
    }

    uint public itemCount = 0;

    mapping(uint => Item) public items;

    event LostReported(
        uint id,
        string name,
        uint reward,
        address owner
    );

    event FoundReported(
        uint id,
        address finder
    );

    event RewardApproved(
        uint id
    );

    event RewardClaimed(
        uint id,
        address finder,
        uint amount
    );

    // -----------------------------------
    // REPORT LOST ITEM
    // -----------------------------------
    function reportLost(
        string memory _name,
        string memory _category,
        string memory _location,
        string memory _proofHash
    ) public payable {

        require(msg.value > 0, "Reward required");

        itemCount++;

        items[itemCount] = Item(
            itemCount,
            _name,
            _category,
            _location,
            _proofHash,
            msg.value,
            payable(msg.sender),
            payable(address(0)),
            false,
            false,
            false,
            block.timestamp
        );

        emit LostReported(
            itemCount,
            _name,
            msg.value,
            msg.sender
        );
    }

    // -----------------------------------
    // REPORT FOUND
    // -----------------------------------
    function reportFound(
        uint _id
    ) public {

        require(
            _id > 0 &&
            _id <= itemCount,
            "Invalid ID"
        );

        Item storage item =
            items[_id];

        require(
            item.claimed == false,
            "Already claimed"
        );

        item.finder =
            payable(msg.sender);

        item.found = true;

        emit FoundReported(
            _id,
            msg.sender
        );
    }

    // -----------------------------------
    // OWNER APPROVES REWARD
    // -----------------------------------
    function approveReward(
        uint _id
    ) public {

        Item storage item =
            items[_id];

        require(
            msg.sender ==
            item.owner,
            "Only owner"
        );

        require(
            item.found == true,
            "Not found yet"
        );

        require(
            item.claimed == false,
            "Already claimed"
        );

        item.approved = true;

        emit RewardApproved(_id);
    }

    // -----------------------------------
    // FINDER CLAIMS AFTER APPROVAL
    // -----------------------------------
    function claimReward(
        uint _id,
        string memory enteredHash
    ) public {

        Item storage item =
            items[_id];

        require(
            msg.sender ==
            item.finder,
            "Only finder"
        );

        require(
            item.approved == true,
            "Owner not approved"
        );

        require(
            item.claimed == false,
            "Already claimed"
        );

        require(
            keccak256(
                abi.encodePacked(
                    item.proofHash
                )
            ) ==
            keccak256(
                abi.encodePacked(
                    enteredHash
                )
            ),
            "Wrong proof"
        );

        uint amount =
            item.reward;

        item.claimed = true;

        item.finder.transfer(amount);

        emit RewardClaimed(
            _id,
            msg.sender,
            amount
        );
    }

    // -----------------------------------
    // VIEW ITEM
    // -----------------------------------
    function getItem(
        uint _id
    )
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
        uint
    )
    {
        Item memory item =
            items[_id];

        return(
            item.id,
            item.name,
            item.category,
            item.location,
            item.reward,
            item.owner,
            item.finder,
            item.found,
            item.approved,
            item.claimed,
            item.createdAt
        );
    }

    function getContractBalance()
    public
    view
    returns(uint)
    {
        return address(this).balance;
    }
}