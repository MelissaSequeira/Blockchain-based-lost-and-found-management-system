let web3;
let contract;
let account;

// -----------------------------------
// CONTRACT SETTINGS
// -----------------------------------
const contractAddress = "0x814062F78ce1b9d796a11B9437546264D407BFef";

const abi = 
[
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
		"name": "AnswersSubmitted",
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
			}
		],
		"name": "LostReported",
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
			}
		],
		"name": "QuestionsAdded",
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
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RewardClaimed",
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
				"internalType": "bool",
				"name": "accepted",
				"type": "bool"
			}
		],
		"name": "VerificationDone",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string[]",
				"name": "_questions",
				"type": "string[]"
			}
		],
		"name": "addQuestions",
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
			}
		],
		"name": "claimReward",
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
			}
		],
		"name": "getAnswers",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getQuestions",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
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
		"name": "getVerificationStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
				"name": "location",
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
				"internalType": "string",
				"name": "ownerEmail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "finderEmail",
				"type": "string"
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
				"name": "_finderEmail",
				"type": "string"
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
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ownerEmail",
				"type": "string"
			}
		],
		"name": "reportLost",
		"outputs": [],
		"stateMutability": "payable",
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
				"internalType": "string[]",
				"name": "_answers",
				"type": "string[]"
			}
		],
		"name": "submitAnswers",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "verifications",
		"outputs": [
			{
				"internalType": "bool",
				"name": "submitted",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "accepted",
				"type": "bool"
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
			},
			{
				"internalType": "bool",
				"name": "_accepted",
				"type": "bool"
			}
		],
		"name": "verifyOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];


// --- CONNECTION ---
async function connectWallet() {
    if (!window.ethereum) return alert("Install MetaMask");

    web3 = new Web3(window.ethereum);
    await ethereum.request({ method: "eth_requestAccounts" });

    const accounts = await web3.eth.getAccounts();
    account = accounts[0];

    contract = new web3.eth.Contract(abi, contractAddress);

    document.getElementById("wallet").innerHTML = "Connected: " + shorten(account);

    refreshAll();
}

// --- LOST / FOUND ---
async function reportLost() {
    const name = document.getElementById("itemName").value;
    const location = document.getElementById("location").value;
    const reward = document.getElementById("reward").value;
    const email = document.getElementById("ownerEmail").value;

    if (!name || !location || !reward || !email) {
        alert("Fill all fields");
        return;
    }

    await contract.methods.reportLost(name, location, email).send({
        from: account,
        value: web3.utils.toWei(reward, "ether")
    });

    refreshAll();
}
async function reportFound() {
    const id = foundId.value;
    const email = finderEmail.value;

    if (!id || !email) return alert("Enter ID & Email");

    await contract.methods.reportFound(id, email).send({ from: account });
    refreshAll();
}

// --- REWARD ---
async function approveReward() {
    const id = approveId.value;
    await contract.methods.approveReward(id).send({ from: account });
    refreshAll();
}

async function claimReward() {
    const id = claimId.value;
    await contract.methods.claimReward(id).send({ from: account });
    refreshAll();
}

// --- VERIFICATION ---
async function acceptVerification(id) {
    await contract.methods.verifyOwner(id, true).send({ from: account });
    refreshAll();
}

async function rejectVerification(id) {
    await contract.methods.verifyOwner(id, false).send({ from: account });
    refreshAll();
}

// --- TABLE ---
async function loadItems() {
    const tbody = document.getElementById("itemsBody");
    tbody.innerHTML = "";

    const count = await contract.methods.itemCount().call();

    for (let i = 1; i <= count; i++) {
        const item = await contract.methods.getItem(i).call();

        const finder = item[5] === "0x0000000000000000000000000000000000000000"
            ? "-"
            : shorten(item[5]);

        tbody.innerHTML += `
        <tr>
            <td>${item[0]}</td>
            <td><b>${item[1]}</b><br>${item[2]}</td>
            <td>${web3.utils.fromWei(item[3], "ether")} ETH</td>
            <td>${shorten(item[4])}</td>
            <td>${item[6]}</td>
            <td>${finder}</td>
            <td>${item[7]}</td>
            <td>${getStatus(item[8], item[9], item[10])}</td>
        </tr>`;
    }
}

// --- ADD QUESTIONS (ON-CHAIN) ---
async function saveForm() {
    const id = modalItemId.value;

    const questions = [q1.value, q2.value, q3.value].filter(q => q.trim() !== "");

    if (!id || questions.length === 0) return alert("Fill all fields");

    await contract.methods.addQuestions(id, questions).send({ from: account });

    alert("Questions saved!");
    refreshAll();
}

// --- OWNER ANSWERS ---
async function loadOwnerForms() {
    const container = document.getElementById("ownerFormsContainer");
    container.innerHTML = "";

    const count = await contract.methods.itemCount().call();
    let found = false;

    for (let i = 1; i <= count; i++) {
        const item = await contract.methods.getItem(i).call();

        const questions = await contract.methods.getQuestions(i).call();
        const status = await contract.methods.getVerificationStatus(i).call();
        const submitted = status[0];

        if (
            item[4].toLowerCase() === account.toLowerCase() &&
            questions.length > 0 &&
            !submitted
        ) {
            found = true;

            let html = `<div class="card p-3 mb-2"><h6>Item #${i}</h6>`;

            questions.forEach((q, idx) => {
                html += `
                <label>${q}</label>
                <input id="ans-${i}-${idx}" class="form-control mb-2">`;
            });

            html += `<button class="btn btn-warning btn-sm"
                onclick="submitOwnerAnswers(${i}, ${questions.length})">
                Submit
            </button></div>`;

            container.innerHTML += html;
        }
    }

    ownerFormsSection.style.display = found ? "block" : "none";
}

async function submitOwnerAnswers(id, len) {
    const ans = [];

    for (let i = 0; i < len; i++) {
        ans.push(document.getElementById(`ans-${id}-${i}`).value);
    }

    await contract.methods.submitAnswers(id, ans).send({ from: account });

    alert("Answers submitted!");
    refreshAll();
}

// --- FINDER VIEW ---
async function loadFinderResponses() {
    const container = document.getElementById("finderResponsesContainer");
    container.innerHTML = "";

    const count = await contract.methods.itemCount().call();
    let found = false;

    for (let i = 1; i <= count; i++) {
        const item = await contract.methods.getItem(i).call();

        const questions = await contract.methods.getQuestions(i).call();
        const answers = await contract.methods.getAnswers(i).call();
        const status = await contract.methods.getVerificationStatus(i).call();

        const submitted = status[0];
        const accepted = status[1];

        if (
            item[5].toLowerCase() === account.toLowerCase() &&
            submitted &&
            !accepted
        ) {
            found = true;

            let html = `<div class="card p-3 mb-2"><h6>Item #${i}</h6>`;

            questions.forEach((q, idx) => {
                html += `<p><b>Q:</b> ${q}<br><b>A:</b> ${answers[idx]}</p>`;
            });

            html += `
            <button class="btn btn-success btn-sm me-2"
                onclick="acceptVerification(${i})">Accept</button>

            <button class="btn btn-danger btn-sm"
                onclick="rejectVerification(${i})">Reject</button>
            </div>`;

            container.innerHTML += html;
        }
    }

    finderResponsesSection.style.display = found ? "block" : "none";
}

// --- EXPORT / IMPORT ---
function exportFormData() {
    const id = prompt("Item ID:");
    const data = { id };
    transferBox.value = btoa(JSON.stringify(data));
}

function importFormData() {
    alert("Not needed anymore (on-chain system)");
}

// --- EMAIL ---
function sendViaEmail() {
    const id = prompt("Item ID:");
    const body = encodeURIComponent(`Verification for Item #${id}`);
    window.open(`https://mail.google.com/mail/?view=cm&su=Verification&body=${body}`, "_blank");
}

// --- STATUS ---
function getStatus(found, approved, claimed) {
    if (claimed) return "Claimed";
    if (approved) return "Approved";
    if (found) return "Found";
    return "Lost";
}

// --- BALANCE ---
async function showBalance() {
    const b = await web3.eth.getBalance(account);
    balance.innerHTML = "Balance: " + web3.utils.fromWei(b, "ether") + " ETH";
}

async function showContractBalance() {
    const b = await contract.methods.getContractBalance().call();
    contractBal.innerHTML = "Contract: " + web3.utils.fromWei(b, "ether") + " ETH";
}

// --- REFRESH ---
async function refreshAll() {
    if (!contract) return;

    await showBalance();
    await showContractBalance();
    await loadItems();
    await loadOwnerForms();
    await loadFinderResponses();
}

// --- HELPERS ---
function shorten(a) {
    return a.substring(0, 6) + "..." + a.slice(-4);
}

// --- LISTENERS ---
if (window.ethereum) {
    ethereum.on("accountsChanged", () => location.reload());
    ethereum.on("chainChanged", () => location.reload());
}