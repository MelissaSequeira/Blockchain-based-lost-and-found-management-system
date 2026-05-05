# 📦 Blockchain-Based Lost & Found System

## 📌 Overview
The Blockchain-Based Lost & Found System is a decentralized application (DApp) that ensures secure, transparent, and trustless management of lost and found items using blockchain technology.

The system introduces a **mutual verification mechanism** where both the finder and the owner verify each other before the reward is released, preventing fraud and ensuring correct ownership.

---

## 🎯 Objectives
- Build a decentralized lost & found platform  
- Ensure trust between unknown users  
- Prevent fake ownership claims  
- Automate reward distribution using smart contracts  
- Enhance security using dual verification  

---

## 🏗️ System Architecture

The system consists of the following components:

### 1. Frontend (User Interface)
- Built using HTML, CSS, Bootstrap, JavaScript  
- Allows users to:
  - Report lost items  
  - Report found items  
  - Answer verification questions  
  - View item details and balances  

### 2. MetaMask Wallet
- Used for authentication  
- Signs blockchain transactions  
- Stores user Ethereum address  

### 3. Web3.js Layer
- Connects frontend to blockchain  
- Uses ABI and RPC calls  
- Enables smart contract interaction  

### 4. Smart Contract
- Written in Solidity  
- Handles item registration, verification, and reward transfer  

### 5. Blockchain Network
- Ganache (for local testing)  
- Ethereum / Polygon (for deployment)  

---

## 🔁 Workflow (Core Logic)

1. Owner reports a lost item and locks reward in smart contract  
2. Finder reports a found item  
3. Finder creates a **custom verification form/question**  
4. Owner answers the verification questions  
5. Finder verifies the owner based on answers  
6. Owner verifies the finder and confirms item return  
7. Smart contract releases reward to finder  

---

## 🔐 Mutual Verification Mechanism

### 🔹 Finder → Verifies Owner
- Finder asks custom questions (e.g., unique item details)  
- Ensures item is not given to the wrong person  

### 🔹 Owner → Verifies Finder
- Owner confirms item authenticity  
- Approves reward via smart contract  

👉 This creates a **two-way trust system**, preventing fraud.

---

## ⚙️ Smart Contract Functions

### reportLost()
- Registers lost item  
- Locks reward in contract  

### reportFound()
- Finder submits item details  

### approveReward()
- Owner verifies finder and approves reward  

### claimReward()
- Transfers reward to finder  

---

## 🔐 Security Features

- Cryptographic hashing (SHA)  
- Immutable smart contracts  
- Wallet-based authentication (MetaMask)  
- Escrow-based reward locking  
- Dual verification system  

---

## 🧪 Development Tools

- Remix IDE (Smart Contract Development)  
- Ganache (Local Blockchain Testing)  
- VS Code (Frontend Development)  
- MetaMask (Wallet Integration)  

---

## 🚀 Deployment

### Steps:
1. Compile smart contract using Remix  
2. Deploy using MetaMask  
3. Switch to Ethereum/Polygon network  
4. Update contract address in frontend  
5. Host frontend (Netlify / GitHub Pages / Vercel)  

---

## ⚠️ Limitations

- Gas fees required for transactions  
- Requires crypto wallet knowledge  
- Smart contracts are immutable  
- Frontend may still be centralized  

---

## 🔮 Future Enhancements

- Mobile application integration  
- AI-based item matching  
- IPFS for decentralized storage  
- Notification system  
- Multi-language support  

---

## 📊 Tech Stack

| Layer           | Technology Used            |
|----------------|--------------------------|
| Frontend       | HTML, CSS, Bootstrap, JS |
| Blockchain     | Ethereum / Polygon       |
| Smart Contract | Solidity                 |
| Tools          | Remix, Ganache, MetaMask |
| Integration    | Web3.js                  |

---

## 🎯 Key Features

- Decentralized system  
- Transparent transactions  
- Secure reward mechanism  
- Dual verification (Finder + Owner)  
- No central authority  
- Real-time blockchain interaction  

---

## 👩‍💻 Team Members

- Melissa Sequeira  
- Akshayya Sawant  
- Anushka Sawant  

---

## 📜 License
This project is developed for academic and educational purposes only.

---

## ⭐ Conclusion
This project demonstrates how blockchain can be used to build a secure and transparent system with enhanced trust using a dual verification mechanism, ensuring that lost items are returned only to the rightful owner.
