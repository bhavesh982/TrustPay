// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EscrowManager {
    enum Status { Pending, Delivered, Refunded }

    struct Deal {
        address buyer;
        address seller;
        uint amount;
        Status status;
    }

    mapping(uint => Deal) public deals;
    uint public dealCounter;

    // Create escrow
    function createEscrow(address seller) public payable returns (uint) {
        require(seller != msg.sender, "Buyer and seller cannot be the same address.");
        require(msg.value > 0, "Escrow amount must be greater than zero.");
        dealCounter++;
        deals[dealCounter] = Deal({
            buyer: msg.sender,
            seller: seller,
            amount: msg.value,
            status: Status.Pending
        });
        return dealCounter;
    }

    // Confirm delivery
    function confirmDelivery(uint dealId) public {
        require(deals[dealId].buyer == msg.sender, "Only buyer can confirm delivery.");
        require(deals[dealId].status == Status.Pending, "Deal already completed.");
        deals[dealId].status = Status.Delivered;
        payable(deals[dealId].seller).transfer(deals[dealId].amount);
    }

    // Refund
    function refund(uint dealId) public {
        require(deals[dealId].seller == msg.sender, "Only seller can issue a refund.");
        require(deals[dealId].status == Status.Pending, "Deal already completed.");
        deals[dealId].status = Status.Refunded;
        payable(deals[dealId].buyer).transfer(deals[dealId].amount);
    }

    // Get deal details
    function getDeal(uint dealId) public view returns (address, uint, uint, Status) {
        Deal memory deal = deals[dealId];
        return (deal.seller, deal.amount, uint(deal.status), deal.status);
    }
}
