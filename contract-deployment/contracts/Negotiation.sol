// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Negotiation
 * @dev Manages domain negotiations and messaging on Krine platform
 */
contract Negotiation {
    enum NegotiationStatus {
        Active,
        Accepted,
        Rejected,
        Closed
    }

    struct NegotiationData {
        uint256 id;
        address buyer;
        address seller;
        string domain;
        uint256 initialOffer;
        uint256 currentOffer;
        NegotiationStatus status;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct Message {
        address sender;
        string content;
        uint256 timestamp;
        uint256 offerAmount; // 0 if not an offer
    }

    // Storage
    mapping(uint256 => NegotiationData) public negotiations;
    mapping(uint256 => Message[]) public messages;
    mapping(address => uint256[]) public userNegotiations; // Track negotiations per user
    uint256 public negotiationCount;

    // Events
    event NegotiationStarted(
        uint256 indexed negotiationId,
        address indexed buyer,
        address indexed seller,
        string domain,
        uint256 initialOffer
    );

    event MessageSent(
        uint256 indexed negotiationId,
        address indexed sender,
        string content,
        uint256 offerAmount,
        uint256 timestamp
    );

    event OfferAccepted(
        uint256 indexed negotiationId,
        uint256 amount,
        uint256 timestamp
    );

    event NegotiationClosed(
        uint256 indexed negotiationId,
        NegotiationStatus status
    );

    /**
     * @dev Start a new negotiation
     * @param seller Address of the domain seller
     * @param domain Domain name being negotiated
     * @param initialOffer Initial offer amount in wei
     */
    function startNegotiation(
        address seller,
        string calldata domain,
        uint256 initialOffer
    ) external returns (uint256) {
        require(seller != address(0), "Invalid seller address");
        require(seller != msg.sender, "Cannot negotiate with yourself");
        require(bytes(domain).length > 0, "Domain cannot be empty");

        uint256 negotiationId = negotiationCount++;

        negotiations[negotiationId] = NegotiationData({
            id: negotiationId,
            buyer: msg.sender,
            seller: seller,
            domain: domain,
            initialOffer: initialOffer,
            currentOffer: initialOffer,
            status: NegotiationStatus.Active,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        // Track negotiation for both buyer and seller
        userNegotiations[msg.sender].push(negotiationId);
        userNegotiations[seller].push(negotiationId);

        // Add initial message
        messages[negotiationId].push(Message({
            sender: msg.sender,
            content: string(abi.encodePacked("Negotiation started for ", domain)),
            timestamp: block.timestamp,
            offerAmount: initialOffer
        }));

        emit NegotiationStarted(
            negotiationId,
            msg.sender,
            seller,
            domain,
            initialOffer
        );

        emit MessageSent(
            negotiationId,
            msg.sender,
            string(abi.encodePacked("Negotiation started for ", domain)),
            initialOffer,
            block.timestamp
        );

        return negotiationId;
    }

    /**
     * @dev Send a message in a negotiation
     * @param negotiationId ID of the negotiation
     * @param content Message content
     * @param offerAmount Offer amount (0 if not an offer)
     */
    function sendMessage(
        uint256 negotiationId,
        string calldata content,
        uint256 offerAmount
    ) external {
        NegotiationData storage negotiation = negotiations[negotiationId];

        require(
            negotiation.buyer == msg.sender || negotiation.seller == msg.sender,
            "Not part of this negotiation"
        );
        require(
            negotiation.status == NegotiationStatus.Active,
            "Negotiation is not active"
        );

        // Update current offer if this is an offer message
        if (offerAmount > 0) {
            negotiation.currentOffer = offerAmount;
        }

        negotiation.updatedAt = block.timestamp;

        messages[negotiationId].push(Message({
            sender: msg.sender,
            content: content,
            timestamp: block.timestamp,
            offerAmount: offerAmount
        }));

        emit MessageSent(
            negotiationId,
            msg.sender,
            content,
            offerAmount,
            block.timestamp
        );
    }

    /**
     * @dev Accept the current offer (seller only)
     * @param negotiationId ID of the negotiation
     */
    function acceptOffer(uint256 negotiationId) external {
        NegotiationData storage negotiation = negotiations[negotiationId];

        require(negotiation.seller == msg.sender, "Only seller can accept");
        require(
            negotiation.status == NegotiationStatus.Active,
            "Negotiation is not active"
        );

        negotiation.status = NegotiationStatus.Accepted;
        negotiation.updatedAt = block.timestamp;

        messages[negotiationId].push(Message({
            sender: msg.sender,
            content: "Offer accepted! Proceed with escrow deposit.",
            timestamp: block.timestamp,
            offerAmount: 0
        }));

        emit OfferAccepted(
            negotiationId,
            negotiation.currentOffer,
            block.timestamp
        );

        emit MessageSent(
            negotiationId,
            msg.sender,
            "Offer accepted! Proceed with escrow deposit.",
            0,
            block.timestamp
        );
    }

    /**
     * @dev Close a negotiation
     * @param negotiationId ID of the negotiation
     * @param rejected True if rejected, false if just closing
     */
    function closeNegotiation(
        uint256 negotiationId,
        bool rejected
    ) external {
        NegotiationData storage negotiation = negotiations[negotiationId];

        require(
            negotiation.buyer == msg.sender || negotiation.seller == msg.sender,
            "Not part of this negotiation"
        );
        require(
            negotiation.status == NegotiationStatus.Active,
            "Negotiation is not active"
        );

        negotiation.status = rejected ? NegotiationStatus.Rejected : NegotiationStatus.Closed;
        negotiation.updatedAt = block.timestamp;

        string memory statusMsg = rejected ? "Negotiation rejected" : "Negotiation closed";

        messages[negotiationId].push(Message({
            sender: msg.sender,
            content: statusMsg,
            timestamp: block.timestamp,
            offerAmount: 0
        }));

        emit NegotiationClosed(negotiationId, negotiation.status);

        emit MessageSent(
            negotiationId,
            msg.sender,
            statusMsg,
            0,
            block.timestamp
        );
    }

    /**
     * @dev Get negotiation details
     * @param negotiationId ID of the negotiation
     */
    function getNegotiation(uint256 negotiationId) external view returns (
        uint256 id,
        address buyer,
        address seller,
        string memory domain,
        uint256 initialOffer,
        uint256 currentOffer,
        NegotiationStatus status,
        uint256 createdAt,
        uint256 updatedAt
    ) {
        NegotiationData memory negotiation = negotiations[negotiationId];
        return (
            negotiation.id,
            negotiation.buyer,
            negotiation.seller,
            negotiation.domain,
            negotiation.initialOffer,
            negotiation.currentOffer,
            negotiation.status,
            negotiation.createdAt,
            negotiation.updatedAt
        );
    }

    /**
     * @dev Get all messages in a negotiation
     * @param negotiationId ID of the negotiation
     */
    function getMessages(uint256 negotiationId) external view returns (Message[] memory) {
        return messages[negotiationId];
    }

    /**
     * @dev Get message count for a negotiation
     * @param negotiationId ID of the negotiation
     */
    function getMessageCount(uint256 negotiationId) external view returns (uint256) {
        return messages[negotiationId].length;
    }

    /**
     * @dev Get all negotiation IDs for a user
     * @param user Address of the user
     */
    function getUserNegotiations(address user) external view returns (uint256[] memory) {
        return userNegotiations[user];
    }
}
