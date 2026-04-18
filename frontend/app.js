
let web3;
let contract;
let account;

// -----------------------------------
// CONTRACT SETTINGS
// -----------------------------------
const contractAddress = "0x8F6E5737A655c3ac17F56858BF2258677B0220fd";

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "approveReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "enteredHash",
				"type": "string"
			}
		],
		"name": "claimReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "finder",
				"type": "address"
			}
		],
		"name": "FoundReported",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "LostReported",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "reportFound",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_proofHash",
				"type": "string"
			}
		],
		"name": "reportLost",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "RewardApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "finder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RewardClaimed",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getItem",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "itemCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "items",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "proofHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "finder",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "found",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "claimed",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "createdAt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// -----------------------------------
// CONNECT WALLET
// -----------------------------------
async function connectWallet() {

    if (!window.ethereum) {
        alert("Install MetaMask");
        return;
    }

    web3 = new Web3(window.ethereum);

    await ethereum.request({
        method: "eth_requestAccounts"
    });

    const accounts =
        await web3.eth.getAccounts();

    account = accounts[0];

    contract = new web3.eth.Contract(
        abi,
        contractAddress
    );

    document.getElementById("wallet")
    .innerHTML =
    "Connected: " + shorten(account);

    await showBalance();
    await showContractBalance();
    await loadItems();
}

// -----------------------------------
// USER BALANCE
// -----------------------------------
async function showBalance() {

    const balWei =
        await web3.eth.getBalance(account);

    const balEth =
        web3.utils.fromWei(
            balWei,
            "ether"
        );

    document.getElementById("balance")
    .innerHTML =
    "Balance: " +
    parseFloat(balEth).toFixed(4) +
    " ETH";
}

// -----------------------------------
// CONTRACT BALANCE
// -----------------------------------
async function showContractBalance() {

    const balWei =
        await contract.methods
        .getContractBalance()
        .call();

    const balEth =
        web3.utils.fromWei(
            balWei,
            "ether"
        );

    document.getElementById("contractBal")
    .innerHTML =
    "Contract: " +
    parseFloat(balEth).toFixed(4) +
    " ETH";
}

// -----------------------------------
// REPORT LOST
// -----------------------------------
async function reportLost() {

    const name =
        document.getElementById(
            "itemName"
        ).value;

    const category =
        document.getElementById(
            "category"
        ).value;

    const location =
        document.getElementById(
            "location"
        ).value;

    const proof =
        document.getElementById(
            "proofHash"
        ).value;

    const reward =
        document.getElementById(
            "reward"
        ).value;

    await contract.methods
    .reportLost(
        name,
        category,
        location,
        proof
    )
    .send({
        from: account,
        value:
        web3.utils.toWei(
            reward,
            "ether"
        )
    });

    alert("Lost item added");

    refreshAll();
}

// -----------------------------------
// REPORT FOUND
// -----------------------------------
async function reportFound() {

    const id =
        document.getElementById(
            "foundId"
        ).value;

    await contract.methods
    .reportFound(id)
    .send({
        from: account
    });

    alert("Marked as found");

    refreshAll();
}

// -----------------------------------
// OWNER APPROVES
// -----------------------------------
async function approveReward() {

    const id =
        document.getElementById(
            "approveId"
        ).value;

    await contract.methods
    .approveReward(id)
    .send({
        from: account
    });

    alert("Reward approved");

    refreshAll();
}

// -----------------------------------
// CLAIM REWARD
// -----------------------------------
async function claimReward() {

    const id =
        document.getElementById(
            "claimId"
        ).value;

    const proof =
        document.getElementById(
            "enteredHash"
        ).value;

    await contract.methods
    .claimReward(
        id,
        proof
    )
    .send({
        from: account
    });

    alert("Reward claimed");

    refreshAll();
}

// -----------------------------------
// LOAD TABLE
// -----------------------------------
async function loadItems() {

    const tbody =
    document.getElementById(
        "itemsBody"
    );

    tbody.innerHTML = "";

    const count =
    await contract.methods
    .itemCount()
    .call();

    for (let i = 1; i <= count; i++) {

        const item =
        await contract.methods
        .getItem(i)
        .call();

        let status =
        getStatus(
            item[7],
            item[8],
            item[9]
        );

        let finder =
        item[6] ==
        "0x0000000000000000000000000000000000000000"
        ? "-"
        : shorten(item[6]);

        tbody.innerHTML += `
        <tr>
            <td>${item[0]}</td>
            <td>${item[1]}</td>
            <td>${item[2]}</td>
            <td>${item[3]}</td>
            <td>
            ${web3.utils.fromWei(item[4], "ether")} ETH
            </td>
            <td>${shorten(item[5])}</td>
            <td>${finder}</td>
            <td>${status}</td>
        </tr>
        `;
    }
}

// -----------------------------------
// STATUS BADGES
// -----------------------------------
function getStatus(
    found,
    approved,
    claimed
) {

    if (claimed) {
        return `<span class="badge bg-success badge-big">
        Claimed
        </span>`;
    }

    if (approved) {
        return `<span class="badge bg-info badge-big">
        Approved
        </span>`;
    }

    if (found) {
        return `<span class="badge bg-warning text-dark badge-big">
        Found
        </span>`;
    }

    return `<span class="badge bg-danger badge-big">
    Lost
    </span>`;
}

// -----------------------------------
// HELPERS
// -----------------------------------
function shorten(addr) {

    return addr.substring(0,6)
    + "..."
    + addr.substring(
        addr.length - 4
    );
}

async function refreshAll() {

    await showBalance();
    await showContractBalance();
    await loadItems();
}

// -----------------------------------
// ACCOUNT CHANGE AUTO REFRESH
// -----------------------------------
if (window.ethereum) {

    ethereum.on(
        "accountsChanged",
        () => location.reload()
    );

    ethereum.on(
        "chainChanged",
        () => location.reload()
    );
}