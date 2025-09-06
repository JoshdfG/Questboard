# QuestBoard

QuestBoard is a decentralized platform built on **Base (L2 Ethereum)** that empowers African creators — such as farmers, content creators, and artisans — to form public or private communities with shared **ENS names**, mint **QuestBoard NFTs** (free or paid) for membership, complete tasks for rewards from **ENS-named community purses**, and showcase their profiles and earnings.

The name **QuestBoard** reflects a vibrant, task-driven hub where creators embark on *quests* (tasks) to earn rewards, fostering financial inclusion, trust, and community coordination.

---

## 📖 Table of Contents
- [Project Overview](#project-overview)
- [Unique Selling Proposition](#unique-selling-proposition)
- [Hackathon Alignment](#hackathon-alignment)
- [Features](#features)
- [Use Cases](#use-cases)
- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Smart Contracts](#smart-contracts)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Demo](#demo)
- [Submission Details](#submission-details)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Contact](#contact)

---

## 🚀 Project Overview
QuestBoard enables African creators to build communities (e.g., `accracreators.eth`) where members mint NFTs to join, undertake tasks (e.g., deliver crops, post content), and earn rewards from community-managed purses.  

It leverages:
- **ENS** for human-readable identities,  
- **Base** for low-cost transactions,  
- **NFTs** for verified access,  

to create a culturally resonant platform tailored for African creators and global supporters.

---

## 🌟 Unique Selling Proposition
**Empowering African Creators with Task-Driven Communities and Onchain Rewards.**

QuestBoard combines ENS for unified community identities, NFTs for verified membership, and task-based rewards from multi-sig purses. This creates a mobile-first, African-inspired ecosystem that eliminates intermediaries and fosters trust and creativity.

---

## 🎯 Hackathon Alignment
- **ENS Everywhere**  
  - ENS for community names (e.g., `accracreators.eth`),  
  - ENS subnames (e.g., `kofi.accracreators.eth`),  
  - ENS text records for profiles (e.g., `role: farmer`),  
  - ENS-named multi-sig purses.

- **Base Bounty**  
  - Addresses African challenges like high remittance fees and lack of trust,  
  - Uses Base’s low-cost transactions,  
  - Leverages **Base Account** for onboarding,  
  - Integrates **Base Pay** for fiat-to-crypto access.

---

## ⚙️ Features
- **Wallet Onboarding**  
  - Connect/create Base smart wallet via Base Account SDK.  
  - Register ENS subname (e.g., `kofi.accracreators.eth`).  

- **Community Creation**  
  - Create public/private communities with ENS names and NFT membership (free/paid).  
  - Deploy multi-sig purse (e.g., `accracreators.eth`) for rewards.  

- **QuestBoard NFT**  
  - ERC-721 NFT minting for verified membership.  
  - Admin verification using ENS text records (e.g., `verified: true`).  

- **Task System**  
  - Admins create tasks with rewards (ETH/USDC).  
  - Creators submit proof (via ENS text records).  
  - Admins approve → multi-sig purse releases rewards.  

- **Community Purse**  
  - ENS-named **multi-sig wallet (2-of-3)** for deposits and payouts.  
  - Supports ETH/USDC.  
  - Fiat access via Base Pay.  

- **Creator Profile**  
  - ENS name + text records for role, earnings, and history.  
  - NFT + completed tasks displayed.  

- **Tipping**  
  - Send tips to creators or purses (NFT-gated).  

- **Dashboard**  
  - Manage communities, tasks, purse transactions, NFTs, and profiles.  

---

## 🌍 Use Cases
- **Ghanaian Cocoa Farmers**  
  - Community: `accrafarmers.eth` (public, free NFT).  
  - Task: Deliver 10kg cocoa, submit proof.  
  - Reward: 0.01 ETH.  

- **Nigerian Content Creators**  
  - Community: `lagoscreators.eth` (private, 0.01 ETH NFT).  
  - Task: Upload YouTube video.  
  - Reward: $5 USDC tipped by fans.  

- **Kenyan Artisans**  
  - Community: `nairobiartisans.eth` (public, free NFT).  
  - Task: Submit beadwork.  
  - Reward: 0.005 ETH.  

---

## 🛠️ Tech Stack
- **Blockchain:** Base (Sepolia for testing, Mainnet for deployment)  
- **Smart Contracts:**
- **Frontend:** Next.js (React), deployed on Vercel  
- **Libraries:**  
  - ENS.js → ENS integration  
  - Onchainkit → Base UI components  
  - viem / ethers.js → Contract interaction  
  - Base Account SDK → Wallet onboarding  
  - Base Pay SDK → Fiat-to-crypto  
  - Gnosis Safe SDK → Multi-sig purse  
  - OpenZeppelin → ERC-721 templates  
- **Testing:** Hardhat, Remix  
- **Storage:** ENS records (onchain), IPFS for optional NFT metadata  

---

## ⚡ Installation and Setup
### Prerequisites
- Node.js v16+  
- MetaMask with Base Sepolia configured  
- Base Sepolia ETH (via [Base Faucet](https://www.base.org/faucet))  
- Git  

### Steps
```bash
# Clone repo
git clone https://github.com/JoshdfG/Questboard
cd questboard

# Install dependencies
npm install

# Start frontend
npm run dev