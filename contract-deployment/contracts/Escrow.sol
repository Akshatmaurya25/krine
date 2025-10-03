// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Escrow
 * @dev Simple escrow contract for domain trading on Krine platform
 */
contract Escrow {
    struct EscrowDeposit {
        address buyer;
        address seller;
        string domain;
        uint256 amount;
        bool isReleased;
        bool isRefunded;
        uint256 createdAt;
    }

    // Mapping from escrowId to EscrowDeposit
    mapping(uint256 => EscrowDeposit) public escrows;
    uint256 public escrowCount;

    // Events
    event Deposited(
        uint256 indexed escrowId,
        address indexed buyer,
        address indexed seller,
        string domain,
        uint256 amount
    );

    event Released(
        uint256 indexed escrowId,
        address indexed seller,
        uint256 amount
    );

    event Refunded(
        uint256 indexed escrowId,
        address indexed buyer,
        uint256 amount
    );

    /**
     * @dev Deposit funds into escrow
     * @param seller Address of the domain seller
     * @param domain Domain name being purchased
     */
    function deposit(
        address seller,
        string calldata domain
    ) external payable returns (uint256) {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        require(seller != address(0), "Invalid seller address");
        require(seller != msg.sender, "Buyer and seller cannot be the same");

        uint256 escrowId = escrowCount++;

        escrows[escrowId] = EscrowDeposit({
            buyer: msg.sender,
            seller: seller,
            domain: domain,
            amount: msg.value,
            isReleased: false,
            isRefunded: false,
            createdAt: block.timestamp
        });

        emit Deposited(escrowId, msg.sender, seller, domain, msg.value);

        return escrowId;
    }

    /**
     * @dev Release funds to seller (only buyer can call)
     * @param escrowId ID of the escrow deposit
     */
    function release(uint256 escrowId) external {
        EscrowDeposit storage escrowDeposit = escrows[escrowId];

        require(escrowDeposit.buyer == msg.sender, "Only buyer can release funds");
        require(!escrowDeposit.isReleased, "Funds already released");
        require(!escrowDeposit.isRefunded, "Funds already refunded");
        require(escrowDeposit.amount > 0, "No funds in escrow");

        escrowDeposit.isReleased = true;

        (bool success, ) = escrowDeposit.seller.call{value: escrowDeposit.amount}("");
        require(success, "Transfer to seller failed");

        emit Released(escrowId, escrowDeposit.seller, escrowDeposit.amount);
    }

    /**
     * @dev Refund funds to buyer (only seller can call, or buyer after 30 days)
     * @param escrowId ID of the escrow deposit
     */
    function refund(uint256 escrowId) external {
        EscrowDeposit storage escrowDeposit = escrows[escrowId];

        require(!escrowDeposit.isReleased, "Funds already released");
        require(!escrowDeposit.isRefunded, "Funds already refunded");
        require(escrowDeposit.amount > 0, "No funds in escrow");

        // Seller can refund anytime, or buyer can refund after 30 days
        bool isSeller = escrowDeposit.seller == msg.sender;
        bool isBuyerAfter30Days = escrowDeposit.buyer == msg.sender &&
                                   block.timestamp >= escrowDeposit.createdAt + 30 days;

        require(
            isSeller || isBuyerAfter30Days,
            "Only seller can refund, or buyer after 30 days"
        );

        escrowDeposit.isRefunded = true;

        (bool success, ) = escrowDeposit.buyer.call{value: escrowDeposit.amount}("");
        require(success, "Transfer to buyer failed");

        emit Refunded(escrowId, escrowDeposit.buyer, escrowDeposit.amount);
    }

    /**
     * @dev Get escrow details
     * @param escrowId ID of the escrow deposit
     */
    function getEscrow(uint256 escrowId) external view returns (
        address buyer,
        address seller,
        string memory domain,
        uint256 amount,
        bool isReleased,
        bool isRefunded,
        uint256 createdAt
    ) {
        EscrowDeposit memory escrowDeposit = escrows[escrowId];
        return (
            escrowDeposit.buyer,
            escrowDeposit.seller,
            escrowDeposit.domain,
            escrowDeposit.amount,
            escrowDeposit.isReleased,
            escrowDeposit.isRefunded,
            escrowDeposit.createdAt
        );
    }
}
