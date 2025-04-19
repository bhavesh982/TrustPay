import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } else {
      alert("MetaMask not detected");
    }
  };

  return (
    <div className="p-4">
      {walletAddress ? (
        <p className="text-green-500">Connected: {walletAddress}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
