import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const contractABI = [
  "function getDeal(uint dealId) public view returns (address seller, uint amount, uint status, uint8)",
  "function confirmDelivery(uint dealId) public",
  "function refund(uint dealId) public",
  "function dealCounter() public view returns (uint256)"
];

const Dashboard = () => {
  const [deals, setDeals] = useState([]);
  const [contract, setContract] = useState(null);
  const [dealCounter, setDealCounter] = useState(0);

  const getStatusText = (status) => {
    if (status === 1) return 'Delivered';
    if (status === 2) return 'Refunded';
    return 'Pending';
  };

  const fetchDeals = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
      const escrowContract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(escrowContract);

      const totalDeals = await escrowContract.dealCounter();
      setDealCounter(totalDeals.toNumber());

      const dealData = [];
      for (let dealId = 1; dealId <= totalDeals; dealId++) {
        const deal = await escrowContract.getDeal(dealId);
        dealData.push({
          dealId,
          seller: deal.seller,
          amount: ethers.utils.formatEther(deal.amount),
          status: parseInt(deal.status),
        });
      }

      setDeals(dealData);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const confirmDeal = async (dealId) => {
    if (contract) {
      try{
        const tx = await contract.confirmDelivery(dealId);
        await tx.wait();
        alert(`Confirmed delivery for deal ID ${dealId}`);
        fetchDeals();
      }
      catch(error){
        console.error("Transaction failed: ", error);
        alert("Transaction failed");
      }
    }
  };

  const refundDeal = async (dealId) => {
    if (contract) {
      try{
        const tx = await contract.refund(dealId);
        await tx.wait();
        alert(`Refunded deal ID ${dealId}`);
        fetchDeals();
      }
      catch(error){
        console.error("Refund failed: ", error);
        alert("Refund failed");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Escrow Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Deal ID</th>
              <th className="px-4 py-2 text-left">Seller</th>
              <th className="px-4 py-2 text-left">Amount (ETH)</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.dealId}>
                <td className="px-4 py-2">{deal.dealId}</td>
                <td className="px-4 py-2">{deal.seller}</td>
                <td className="px-4 py-2">{deal.amount}</td>
                <td className="px-4 py-2">{getStatusText(deal.status)}</td>
                <td className="px-4 py-2">
                  {deal.status === 0 && (
                    <>
                      <button
                        onClick={() => confirmDeal(deal.dealId)}
                        className="bg-green-500 text-white py-1 px-4 rounded mr-2"
                      >
                        Confirm Delivery
                      </button>
                      <button
                        onClick={() => refundDeal(deal.dealId)}
                        className="bg-red-500 text-white py-1 px-4 rounded"
                      >
                        Request Refund
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
