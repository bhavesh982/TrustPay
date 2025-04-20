import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import DealRow from '../components/DealRow';

const contractABI = [
  "function getDeal(uint dealId) public view returns (address seller, uint amount, uint status, uint8)",
  "function confirmDelivery(uint dealId) public",
  "function refund(uint dealId) public",
  "function dealCounter() public view returns (uint256)"
];

const Dashboard = () => {
  const [deals, setDeals] = useState([]);
  const [contract, setContract] = useState(null);

  const fetchDeals = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
      const escrowContract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(escrowContract);

      const totalDeals = await escrowContract.dealCounter();
      const dealList = [];

      for (let dealId = 1; dealId <= totalDeals; dealId++) {
        const deal = await escrowContract.getDeal(dealId);
        dealList.push({
          dealId,
          seller: deal.seller,
          amount: ethers.utils.formatEther(deal.amount),
          status: Number(deal.status),
        });
      }

      setDeals(dealList);
    } catch (err) {
      console.error('Failed to fetch deals:', err);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 py-12 flex flex-col items-center">
      {/* Signal Bars */}
      <div className="flex justify-center mb-2">
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
      <h1 className="text-5xl font-extrabold text-center text-white mb-10 neon-glow tracking-wide">
        TrustPay Dashboard
      </h1>

      {/* Table */}
      <div className="w-full max-w-6xl backdrop-blur-md bg-[#1f2937]/60 border border-[#00ffe0] rounded-3xl p-8 shadow-[0_0_30px_#00ffe0] animate-fade-in">
        <table className="min-w-full table-auto text-sm md:text-base text-white">
          <thead>
            <tr className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white uppercase text-sm font-bold tracking-wide">
              <th className="px-6 py-4 rounded-tl-2xl">Deal ID</th>
              <th className="px-6 py-4">Seller</th>
              <th className="px-6 py-4">Amount (ETH)</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 rounded-tr-2xl">Actions</th>
            </tr>
          </thead>
          <tbody className="backdrop-blur-sm">
            {deals.length > 0 ? (
              deals.map((deal) => (
                <DealRow
                  key={deal.dealId}
                  deal={deal}
                  contract={contract}
                  fetchDeals={fetchDeals}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400 italic">
                  No escrow deals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
