// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoCare is Ownable {
    struct DonationCase {
        address payable beneficiary;
        string title;
        string description;
        uint256 targetAmount;
        bool isVerified;
        uint256 totalDonations;
    }

    DonationCase[] public donationCases;
    
    event CaseCreated(uint256 indexed caseId, string title, address beneficiary);
    event DonationMade(uint256 indexed caseId, address donor, uint256 amount);
    event CaseVerified(uint256 indexed caseId);

    constructor() Ownable(msg.sender) {}

    function createCase(
        string memory _title,
        string memory _description,
        uint256 _targetAmount,
        address payable _beneficiary
    ) external onlyOwner returns (uint256) {
        donationCases.push(DonationCase({
            beneficiary: _beneficiary,
            title: _title,
            description: _description,
            targetAmount: _targetAmount,
            isVerified: false,
            totalDonations: 0
        }));

        uint256 newCaseId = donationCases.length - 1;
        emit CaseCreated(newCaseId, _title, _beneficiary);
        return newCaseId;
    }

    function verifyCase(uint256 _caseId) external onlyOwner {
        require(_caseId < donationCases.length, "Case does not exist");
        donationCases[_caseId].isVerified = true;
        emit CaseVerified(_caseId);
    }

    function donate(uint256 _caseId) external payable {
        require(_caseId < donationCases.length, "Case does not exist");
        require(donationCases[_caseId].isVerified, "Case is not verified");
        require(msg.value > 0, "Donation must be greater than 0");

        DonationCase storage donationCase = donationCases[_caseId];
        donationCase.totalDonations += msg.value;
        
        // Transfer the donation directly to the beneficiary
        (bool sent, ) = donationCase.beneficiary.call{value: msg.value}("");
        require(sent, "Failed to send donation");

        emit DonationMade(_caseId, msg.sender, msg.value);
    }

    function getCaseCount() external view returns (uint256) {
        return donationCases.length;
    }

    function getCase(uint256 _caseId) external view returns (
        address beneficiary,
        string memory title,
        string memory description,
        uint256 targetAmount,
        bool isVerified,
        uint256 totalDonations
    ) {
        require(_caseId < donationCases.length, "Case does not exist");
        DonationCase storage donationCase = donationCases[_caseId];
        return (
            donationCase.beneficiary,
            donationCase.title,
            donationCase.description,
            donationCase.targetAmount,
            donationCase.isVerified,
            donationCase.totalDonations
        );
    }
} 