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
      <h1>Escrow Manager</h1>

      {escrowCreated ? (
        <Dashboard />
      ) : (
        <div>
          <h2>Account: {account}</h2>
          <input
            type="text"
            placeholder="Enter Seller Address"
            value={sellerAddress}
            onChange={(e) => setSellerAddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Amount (ETH)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleCreateEscrow}>Create Escrow</button>
        </div>
      )}
      
    </div>
  );
}

export default App;
