import React, { useState } from "react"; 
import useEscrowContract from "./hooks/useEscrowContract";
import Dashboard from "./Dashboard";
import { ethers } from "ethers";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

function App() {
  const [sellerAddress, setSellerAddress] = useState("");
  const [amount, setAmount] = useState(""); // <-- New: to store ETH amount
  const [dealId, setDealId] = useState(null);
  const [escrowCreated, setEscrowCreated] = useState(false);

  const {
    account,
    escrowStatus,
    createEscrow,
    confirmDelivery,
    refund,
    getDeal
  } = useEscrowContract(contractAddress);

  const handleCreateEscrow = async () => {
    try {
      // Validate the seller address
      if (!ethers.utils.isAddress(sellerAddress)) {
        alert("Invalid seller address");
        return;
      }

      // Validate the amount entered
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        alert("Invalid amount entered");
        return;
      }

      // Convert ETH to Wei
      const parsedAmount = ethers.utils.parseEther(amount); 

      // Call createEscrow with the sellerAddress and parsedAmount
      await createEscrow(sellerAddress, parsedAmount);
      setEscrowCreated(true);
    } catch (error) {
      console.error("Error creating escrow:", error);
      alert(`Error: ${error?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h1 className="mt-10 text-center">Escrow Manager</h1>

      {escrowCreated ? (
        <Dashboard />
      ) : (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-200 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Escrow Creator</h2>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">Account:</label>
            <p className="font-bold bg-gray-100 px-3 py-2 rounded-md text-sm text-blue-700 break-words">{account}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">Seller Address:</label>
            <input
              type="text"
              placeholder="0xABC...123"
              value={sellerAddress}
              onChange={(e) => setSellerAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-1">Amount (ETH):</label>
            <input
              type="number"
              placeholder="e.g. 0.05"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
          </div>

          <button
            onClick={handleCreateEscrow}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Create Escrow
          </button>
        </div>


      )}

    </div>
  );
}

export default App;
