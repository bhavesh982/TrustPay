import React, { useState } from 'react';
import useEscrowContract from '../hooks/useEscrowContract';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { AiOutlineLock, AiOutlineDollarCircle } from 'react-icons/ai';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

const CreateEscrow = () => {
  const [sellerAddress, setSellerAddress] = useState('');
  const [amount, setAmount] = useState('');
  const { account } = useWallet();
  const { createEscrow } = useEscrowContract(contractAddress);
  const navigate = useNavigate();

  const handleCreateEscrow = async () => {
    if (!ethers.utils.isAddress(sellerAddress)) return alert('Invalid seller address');
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return alert('Invalid amount');

    const parsedAmount = ethers.utils.parseEther(amount);
    try {
      await createEscrow(sellerAddress, parsedAmount);
      navigate('/dashboard');
    } catch (err) {
      console.error('Escrow creation failed:', err);
      alert(err?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl p-10 bg-[#1a202c]/90 text-white rounded-3xl border border-[#00ffe0] shadow-[0_0_25px_#00ffe0] animate-fade-in">

        {/* Signal Bars */}
        <div className="flex justify-center mb-4">
          <div className="flex space-x-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`bg-green-400 rounded w-1 ${
                  level === 1 ? 'h-2' : level === 2 ? 'h-3' : level === 3 ? 'h-4' : 'h-5'
                } animate-pulse`}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-[#00ffe0] mb-10 neon-glow">
          TrustPay Escrow 🧾
        </h2>

        {/* Account Display */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 flex items-center gap-2">
            <AiOutlineLock className="text-blue-400 text-xl" />
            Your Wallet:
          </label>
          <div className="bg-[#2d3748] p-4 rounded-md text-center text-sm text-gray-300 break-all">
            {account}
          </div>
        </div>

        {/* Seller Address Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 flex items-center gap-2">
            <AiOutlineLock className="text-blue-400 text-xl" />
            Seller Address:
          </label>
          <input
            type="text"
            value={sellerAddress}
            onChange={(e) => setSellerAddress(e.target.value)}
            placeholder="0xABC...123"
            className="w-full px-6 py-3 border-2 border-gray-600 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 flex items-center gap-2">
            <AiOutlineDollarCircle className="text-blue-400 text-xl" />
            Amount (ETH):
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 0.05"
            className="w-full px-6 py-3 border-2 border-gray-600 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleCreateEscrow}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
          >
            Create Escrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEscrow;
