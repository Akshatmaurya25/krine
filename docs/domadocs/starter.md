About Doma Protocol
What is DomainFi
DomainFi represents a new economic paradigm for the domain industry, addressing significant challenges in the current $340B+ domain ecosystem. Traditional domain management faces several critical limitations:

The domain industry has historically maintained high barriers to entry through strict ICANN accreditation requirements

Secondary market trading suffers from opacity and high friction, often requiring intermediary escrow services and long transfer times

Domains lack programmability and standardized developer interfaces

The Doma Protocol revolutionizes this landscape by transforming domains into programmable, blockchain-based assets.

This transformation enables DomainFi through several key innovations:

Trusted Domain Tokenization

Provides a secure onramp for any Registrar or Registry to tokenize domains onto the blockchain

Maintains full compliance with ICANN regulations

Ensures seamless integration with existing domain infrastructure

State Synchronization

Implements bi-directional synchronization between on-chain assets and ICANN registries

Maintains consistent domain metadata and state across web2 and web3 environments

Provides real-time updates for domain state changes

Composable Domain Rights

Enables splitting domains into synthetic tokens representing specific rights and permissions

Facilitates granular control over domain management capabilities

Supports innovative financial instruments based on domain rights

DomainFi Application Infrastructure

 The protocol provides comprehensive APIs and smart contracts enabling developers to build innovative applications such as:

Instant-settlement secondary marketplaces

Fractional domain ownership structures

Domain-collateralized lending platforms

Automated domain rental and leasing systems

On-chain domain parking yield generation

Through these capabilities, DomainFi transforms traditional domains into dynamic, programmable assets that can participate in the broader web3 financial ecosystem.

Why Build on Doma
The Doma Protocol creates substantial value for multiple stakeholders across the domain and blockchain ecosystems:

🏢 For Registrars and Registries:

Secure Tokenization Infrastructure: A fully compliant system for converting traditional domains into blockchain assets, with built-in ICANN requirement handling and automated compliance checks

Multi-Chain Integration: Native support for major Layer1 and Layer2 blockchains, enabling registrars to offer domain tokenization across multiple popular networks without additional infrastructure

Enhanced Revenue Streams: New revenue opportunities through tokenization services, domain rights tokenization, and integration with DomainFi applications

Automated State Management: Streamlined handling of tokenized domains with automated synchronization between blockchain and traditional DNS infrastructure

⛓️ For Blockchain Ecosystems:

Real-World Asset Integration: Direct integration of the $300B+ domain market as on-chain assets, bringing significant real-world value onto blockchain networks

Transaction Volume Growth: Increased network activity through DomainFi transactions, including trading, lending, and permission management

Cross-Chain Opportunities: Enhanced interoperability through standardized domain asset handling across different blockchain networks

DomainFi Ecosystem Expansion: New opportunities for dApps and protocols to incorporate domain-based financial products and services

👩‍💻 For Developers:

Reseller APIs: Enable domain sales through NFT marketplaces and dApps without the need for ICANN accreditation.

Smart Contract Libraries: Pre-built, audited smart contracts for common domain management operations

Flexible Permission System: Programmable domain primitives enabling creative applications of domain rights and permissions

Subgraph Integration: GraphQL-based subgraph for efficient querying of domain metadata and transaction history

Cross-Chain Development Tools: Infrastructure for building applications that work seamlessly across multiple blockchain networks

🤵 For Domain Holders:

Financial Utility: Multiple options for leveraging domain value, including fractional ownership, collateralized lending, and yield generation

Enhanced Liquidity: Instant access to secondary markets without traditional escrow services or lengthy transfer processes

Granular Permission Control: Ability to split domain rights into specific permissions for different use cases while maintaining overall ownership

Web3 Integration: Seamless integration with web3 applications, including use as digital identity and wallet resolution

Revenue Generation: Multiple paths for generating revenue from domain assets through parking, leasing, and permission trading

Ready to unlock the full potential of domains? Explore our protocol overview to start building the future of DomainFi today.

---

Protocol Overview
High Level Architecture

Doma Protocol Components
Domain Tokenization Module
Doma Protocol provides a suite of APIs and smart contracts that enable ICANN Registrars and Registries to tokenize and detokenize domains on the blockchain. When a domain is tokenized, a Domain Ownership Token is minted on the blockchain selected by the Registrant, while Doma blockchain maintains the authoritative record of all tokenized domains. Through signature verification, Doma ensures that domains can only be tokenized only by the hosting Registrar, preventing unauthorized tokenizations.

Domain Fractionalization Module
Doma Protocol provides a fractionalization module that enables partial ownership of tokenized domains by converting them into fungible tokens. Crypto investors can trade these tokens, manage their liquidity like other fungible assets, and gain partial ownership of the domain. For domain investors, this allows access to liquidity without selling their valuable domain assets, thereby improving capital efficiency.

Compliance Module
Doma Protocol provides support for off-chain legal processes, such as UDRP (Uniform Domain-Name Dispute-Resolution Policy), ensuring consistent governance across both traditional and blockchain environments. The Compliance Module provides the following enforcement mechanisms, authorized using keys controlled by Doma Foundation:

Transfer Lock: Immediately prevents transfer of all associated domain tokens across all blockchains during active investigations

Forced Detokenization: Executes controlled burning of all domain tokens across all blockchains, effectively returning full control to the Registrar to implement mandated ownership transfers resulting from dispute resolution

Bridging Module
The Bridging Module provides native bridging of Domain Ownership Tokens and Synthetic Tokens across all supported L1/L2 blockchains. This cross-chain interoperability allows tokenized domains to interact with DomainFi applications throughout the broader blockchain ecosystem. Doma blockchain maintains authoritative records of all tokenized domains as they are bridged, ensuring consistent domain states, ownership, and permissions across blockchains.

Custodian Module
The Custodian Module integrates domain registration capabilities with blockchain tokenization while maintaining ICANN compliance. It provides reseller APIs for non-ICANN accredited entities to register domains and tokenize them on the blockchain, while also offering a unified interface that Registrars can opt-in to for listing availability and pricing. This enables developers to discover optimal pricing for their customers and expands distribution of Registrar inventory through new DomainFi applications.

When a Domain Ownership Token is transferred on-chain, signifying a change in domain ownership, the Custodian Module manages the compliance process. Since blockchain wallets don't inherently provide the valid Registrant contact information required by ICANN, the Registrar is notified of these transfer events and temporarily moves the domain to a Doma Proxy Registrant. This proxy acts as an escrow holder until the new wallet owner completes the claim process. The Module verifies the wallet's ownership of the Domain Ownership Token and securely collects the required Registrant information through off-chain storage. Once this information is verified, it's forwarded to the Registrar, which then completes the final transfer from the Doma Proxy to the new Registrant.

Composer Module
The Composer Module transforms domains into programmable digital assets by enabling the decomposition of Domain Ownership Tokens into multiple Synthetic Tokens. Each System Token represents specific rights to the domain, creating granular control and new utility.

For example, a Domain Ownership Token can be divided into two distinct Synthetic Tokens:

A Synthetic Token granting exclusive rights to control the domain's DNS settings

A Synthetic Token retaining all other domain permissions and rights except NameServer management

When decomposition occurs, the Registrar receives notification of the change in permission structure. The original Registrant's access to the split permissions becomes restricted, and these permissions can only be exercised programmatically through Doma Record Contracts by the respective Synthetic Token holders.

This permission-based architecture enables developers to build innovative DomainFi applications that unlock the underlying value of domains through programmable smart contracts.

Domain Ownership Tokens
Domain Ownership Tokens are initially minted on a target chain specified by the Registrant during the domain tokenization process. These tokens grant the owner full ownership of the domain and transfer of the Ownership Token requires the new owner to go through the claim process specified above. Domain Ownership Tokens can be burned and split into multiple Synthetic Tokens for finer-grained access rights and utility within DomainFi apps.

Domain Synthetic Tokens
Domain Synthetic Tokens represent specific management rights extracted from a Domain Ownership Token through a controlled decomposition process. Each Synthetic Token grants its holder authority over a particular domain function—such as DNS management or subdomain creation—without conferring full ownership. Synthetic Tokens can be independently traded on NFT marketplaces, used within DomainFi applications, or recombined to reconstruct the original Domain Ownership Token. The Doma Protocol maintains records of all Synthetic Tokens derived from each domain, ensuring that permissions remain mutually exclusive and collectively represent full ownership rights of the domain.


---

Domain Infrastructure 101
Domains
A domain (or domain name) is a human-readable address traditionally used to access websites on the internet. However, with the rise of blockchain and web3, domains can also be used as human-readable identifiers for crypto wallet addresses without users having to memorize a complex string of alphanumerics.

Example:

Domain Name: example.com

Resolves to IP Address: 192.0.2.1

Resolves to wallet address: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e

Structure of a Domain Name:

Top-Level Domain (TLD): The extension at the end (e.g., .com, .org, .net, .gov).

Second-Level Domain (SLD): The main part of the domain (e.g., example in example.com).

Subdomain (Optional): A prefix added before the main domain (e.g., blog.example.com).

Domains are purchased and registered through an ICANN-accredited registrar or website using reseller APIs provided by an ICANN-accredited registrar.

Domains can be registered for 1 to 10 years at a time (which the exception of some ccTLDs such as .uk, .de, .ca which have different maximum registration periods). Domains can continue to be renewed indefinitely as long as registration fees are paid.

Registrars are required to collect contacts details of the domain registrant to satisfy ICANN regulations. Contact info typically includes PII such as Full lName, Email Address, Phone Number and Mailing address. Most registrars offers free privacy protection so this contact information is redacted in public records such as WHOIS and RDAP.

Registrants
A registrant is the legal owner of a domain name. This can be an individual, business, or organization that registers and holds the rights to a domain.

Registrant Responsibilities include:

Maintaining Ownership: The registrant must ensure the domain is renewed on time.

Updating Contact Information: Keeping registrant details accurate to avoid suspension.

Managing Domain Settings: Configuring DNS, email, website settings, and wallet mappings.

Transferring or Selling the Domain: The registrant has the right to transfer the domain to another owner or registrar.

Registrars
A registrar is a company accredited to sell, register, and manage domain names on behalf of individuals and businesses. Registrars act as intermediaries between registrants (domain owners) and registries (organizations that manage TLDs like .com or .org).

Role of a Registrar:

Domain Registration: Allows users to search, purchase, and register domain names.

DNS Management: Provides tools to manage domain settings (e.g., pointing a domain to a website).

WHOIS & Privacy Protection: Maintains registrant details and offers privacy protection services.

Renewals & Transfers: Manages domain renewals, transfers between registrars, and expiration reminders.

Registries
A registry is the organization responsible for managing and maintaining a Top-Level Domain (TLD), such as .com, .org, or country-code TLDs like .uk or .ca.

Role of a Registry:

Maintains the official database of all registered domains under its TLD.

Sets policies and pricing for domain registrations.

Provides the infrastructure for domain name resolution (translating domain names to IP addresses).

Works with registrars (like GoDaddy, Namecheap) to sell domains, but does not sell directly to consumers in most cases.

---

How to tokenize a domain
This guides provides a step-by-step guide on how to use Doma Protocol for domain tokenization. Testnet Registrar is provided by D3 to test the protocol. However, registrar-specific steps can be performed on any registrar that supports the Doma Protocol (exact flow may vary between registrars).

Navigate to https://testnet.d3.app and Login/Register.

Search for an .io name:


Add it to cart and purchase. 2 options for purchase are available:

Fiat. Any Stripe test credit card can be used, no real money required. For example, 4242424242424242.

Crypto. Testnet tokens on a supported payment chain are required.


Once the purchase is completed, navigate to a portfolio and tokenize a domain:


Choose a target chain for tokenization:


Sign transaction using your wallet to confirm tokenization. You might need to connect your wallet, if you registered without it. This will initiate tokenization process:


Tokenization process might take several minutes. Once it's tokenized, clicking on Tokenized link will show token on blockchain explorer.



Once name it's tokenized, it can be managed on Doma Dashboard, which shows tokenized names from all registrars on Doma Protocol. First of all, login into dashboard using your email address.


Link wallet that has been used for tokenization on Step 6.


After wallet is linked, tokenized domain will be visible in portfolio:


(Optional) Bridge Name Token to another chain
Name token can be moved to another chain using Doma Dashboard. This is useful to access liquidity or apps that are available only on one of the supported chains.

Select a domain you want to bridge and click a "Bridge" button.


Select target chain and wallet address


Confirm bridge and wait for it to complete. "Bridge In-progress" status will be displayed:


(Optional) Claim Domain after transferring
When name token is transferred on-chain, Domain is put into a temporary custody until a new owner can provide their contacts information. Process of providing this contact information is called a Domain Claim, and is required for obtaining control over a domain on a Registrar app.

To trigger a claim process, simply transfer NFT to another wallet. This can be done manually, or by listing/buying on some NFT marketplace (like OpenSea or MagicEden).

Make sure you have an account on a Registrar app, that's tied to your Doma Dashboard user account email.


Find a domain you want to claim in Portfolio and click a "Claim" button.


Provide your contacts information and sign a transaction.


Wait for the claim request be approved or rejected by a registrar. While in progress, "Claim Requested" status is displayed:

---

Building on Doma
This guide outlines the steps to start building on Doma Protocol:

Tokenize your first domain (this guide will help).

Create API keys using Doma Dashboard Developers section.

Get familiar with Doma APIs (choose the best one for your use case):

Doma Subgraph - easiest way to access Doma Protocol data.

Poll API - if you need to react to events or build your own database.

Doma Marketplace - if you want to trade tokenized domains.

Smart Contracts API - if you need low-level no-middlemen access to a protocol.

Join our Discord to ask questions, provide suggestions, or report bugs.