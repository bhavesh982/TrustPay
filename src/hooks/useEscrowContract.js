import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useEscrowContract = (contractAddress) => {
  const [account, setAccount] = useState(null);
  const [escrowStatus, setEscrowStatus] = useState("");
  const [contract, setContract] = useState(null);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  useEffect(() => {
    const init = async () => {
      const contractABI = [
        // Include your contract ABI here
        "function createEscrow(address sellerAddress) external payable",
        "function confirmDelivery(uint dealId) external",
        "function refund(uint dealId) external",
        "function getDeal(uint dealId) external view returns (address buyer, address seller, uint amount, uint status)"
      ];

      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contractInstance);

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    };

    init();
  }, [contractAddress]);

  const createEscrow = async (sellerAddress, value) => {
    if (!contract) throw new Error("Contract not initialized.");
    if (!ethers.utils.isAddress(sellerAddress)) throw new Error("Invalid seller address.");

    if (sellerAddress.toLowerCase() === account?.toLowerCase()) {
      throw new Error("Buyer and seller cannot be the same.");
    }

    try {
      const gasEstimate = await contract.estimateGas.createEscrow(sellerAddress, {
        value: value.toString(), // Ensure value is a string (in Wei)
      });

      console.log("Gas estimate:", gasEstimate.toString());

      // Create escrow with provided value
      const tx = await contract.createEscrow(sellerAddress, {
        value: value.toString(), // in Wei
        gasLimit: 1000000, // You can increase this if necessary
      });
      

      await tx.wait();
      setEscrowStatus(`Escrow created for seller ${sellerAddress}`);
    } catch (err) {
      console.error("createEscrow failed:", err.reason || err);
      setEscrowStatus(`Error: ${err.reason || err.message}`);
      throw err;
    }
  };

  const confirmDelivery = async (dealId) => {
    if (!contract) throw new Error("Contract not initialized.");
    try {
      const tx = await contract.confirmDelivery(dealId);
      await tx.wait();
      setEscrowStatus(`Delivery confirmed for deal ${dealId}`);
    } catch (err) {
      console.error("confirmDelivery failed:", err.reason || err);
      setEscrowStatus(`Error: ${err.reason || err.message}`);
    }
  };

  const refund = async (dealId) => {
    if (!contract) throw new Error("Contract not initialized.");
    try {
      const tx = await contract.refund(dealId);
      await tx.wait();
      setEscrowStatus(`Refund issued for deal ${dealId}`);
    } catch (err) {
      console.error("refund failed:", err.reason || err);
      setEscrowStatus(`Error: ${err.reason || err.message}`);
    }
  };

  const getDeal = async (dealId) => {
    if (!contract) throw new Error("Contract not initialized.");
    try {
      const deal = await contract.getDeal(dealId);
      console.log("Deal details:", deal);
      setEscrowStatus(`Deal info: Buyer: ${deal[0]}, Seller: ${deal[1]}, Amount: ${ethers.utils.formatEther(deal[2])} ETH`);
    } catch (err) {
      console.error("getDeal failed:", err.reason || err);
      setEscrowStatus(`Error: ${err.reason || err.message}`);
    }
  };

  return {
    account,
    escrowStatus,
    createEscrow,
    confirmDelivery,
    refund,
    getDeal
  };
};

export default useEscrowContract;
