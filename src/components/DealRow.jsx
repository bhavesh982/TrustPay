import React from 'react';

const DealRow = ({ deal, contract, fetchDeals }) => {
  const handleConfirm = async () => {
    try {
      const tx = await contract.confirmDelivery(deal.dealId);
      await tx.wait();
      alert(`Confirmed delivery for Deal ID ${deal.dealId}`);
      fetchDeals();
    } catch (err) {
      console.error(err);
      alert('Transaction failed');
    }
  };

  const handleRefund = async () => {
    try {
      const tx = await contract.refund(deal.dealId);
      await tx.wait();
      alert(`Refunded Deal ID ${deal.dealId}`);
      fetchDeals();
    } catch (err) {
      console.error(err);
      alert('Refund failed');
    }
  };

  const statusText = (status) => {
    if (status === 1) return 'Delivered';
    if (status === 2) return 'Refunded';
    return 'Pending';
  };

  return (
    <tr>
      <td className="px-4 py-2">{deal.dealId}</td>
      <td className="px-4 py-2">{deal.seller}</td>
      <td className="px-4 py-2">{deal.amount}</td>
      <td className="px-4 py-2">{statusText(deal.status)}</td>
      <td className="px-4 py-2">
        {deal.status === 0 && (
          <>
            <button onClick={handleConfirm} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Confirm</button>
            <button onClick={handleRefund} className="bg-red-500 text-white px-3 py-1 rounded">Refund</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default DealRow;
