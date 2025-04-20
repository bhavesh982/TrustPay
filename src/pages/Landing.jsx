// pages/Landing.jsx
import React from 'react';
import { useWallet } from '../context/WalletContext';

const Landing = () => {
  const { connectWallet } = useWallet();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Escrow DApp</h1>
      <p className="text-gray-600 mb-6">Secure your deals with smart contracts.</p>
      <button
        onClick={connectWallet}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default Landing;
