export const contractABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "seller", "type": "address" }
    ],
    "name": "createEscrow",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "deals",
    "outputs": [
      { "internalType": "address", "name": "buyer", "type": "address" },
      { "internalType": "address", "name": "seller", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "bool", "name": "isConfirmed", "type": "bool" },
      { "internalType": "bool", "name": "isReleased", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "dealCounter",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "dealId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "buyer", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "seller", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "DealCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "dealId", "type": "uint256" }
    ],
    "name": "DealConfirmed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "dealId", "type": "uint256" }
    ],
    "name": "FundsReleased",
    "type": "event"
  }
];

// ✅ For Vite:
export const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

// ❗ If you're using Create React App (CRA) instead:
// export const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
