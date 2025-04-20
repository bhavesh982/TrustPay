// pages/ConnectWalletPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

const ConnectWalletPage = () => {
  const { account, connectWallet } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      navigate('/dashboard'); // Redirect to Dashboard once the wallet is connected
    }
  }, [account, navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-blue-50 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to Escrow DApp</h1>
      <p className="text-lg text-gray-600 mb-6">
        Please connect your wallet to start using the platform.
      </p>
      <button
        onClick={connectWallet}
        className="bg-blue-600 text-white text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWalletPage;
