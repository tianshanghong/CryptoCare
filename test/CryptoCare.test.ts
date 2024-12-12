import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from "ethers";
import { CryptoCare } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("CryptoCare", function () {
  let cryptoCare: CryptoCare;
  let owner: HardhatEthersSigner;
  let beneficiary: HardhatEthersSigner;
  let donor: HardhatEthersSigner;

  const testCase = {
    title: "Help Children's Hospital",
    description: "Support medical equipment purchase",
    targetAmount: parseEther("1.0"), // 1 ETH
  };

  beforeEach(async function () {
    [owner, beneficiary, donor] = await ethers.getSigners();
    
    const CryptoCare = await ethers.getContractFactory("CryptoCare");
    cryptoCare = await CryptoCare.deploy();
  });

  describe("Case Management", function () {
    it("should allow owner to create a case", async function () {
      await expect(cryptoCare.createCase(
        testCase.title,
        testCase.description,
        testCase.targetAmount,
        beneficiary.address
      )).to.emit(cryptoCare, "CaseCreated");

      const caseDetails = await cryptoCare.getCase(0);
      expect(caseDetails.title).to.equal(testCase.title);
      expect(caseDetails.beneficiary).to.equal(beneficiary.address);
    });

    it("should not allow non-owner to create a case", async function () {
      await expect(cryptoCare.connect(donor).createCase(
        testCase.title,
        testCase.description,
        testCase.targetAmount,
        beneficiary.address
      )).to.be.revertedWithCustomError(cryptoCare, "OwnableUnauthorizedAccount");
    });

    it("should allow owner to verify a case", async function () {
      await cryptoCare.createCase(
        testCase.title,
        testCase.description,
        testCase.targetAmount,
        beneficiary.address
      );

      await expect(cryptoCare.verifyCase(0))
        .to.emit(cryptoCare, "CaseVerified");

      const caseDetails = await cryptoCare.getCase(0);
      expect(caseDetails.isVerified).to.be.true;
    });
  });

  describe("Donations", function () {
    beforeEach(async function () {
      await cryptoCare.createCase(
        testCase.title,
        testCase.description,
        testCase.targetAmount,
        beneficiary.address
      );
      await cryptoCare.verifyCase(0);
    });

    it("should allow donations to verified cases", async function () {
      const donationAmount = parseEther("0.5");
      const initialBalance = await ethers.provider.getBalance(beneficiary.address);

      await expect(cryptoCare.connect(donor).donate(0, { value: donationAmount }))
        .to.emit(cryptoCare, "DonationMade")
        .withArgs(0, donor.address, donationAmount);

      const finalBalance = await ethers.provider.getBalance(beneficiary.address);
      expect(finalBalance - initialBalance).to.equal(donationAmount);

      const caseDetails = await cryptoCare.getCase(0);
      expect(caseDetails.totalDonations).to.equal(donationAmount);
    });

    it("should not allow donations to unverified cases", async function () {
      await cryptoCare.createCase(
        "Unverified Case",
        "Description",
        parseEther("1.0"),
        beneficiary.address
      );

      await expect(cryptoCare.connect(donor).donate(1, {
        value: parseEther("0.1")
      })).to.be.revertedWith("Case is not verified");
    });
  });

  describe("View Functions", function () {
    it("should return correct case count", async function () {
      expect(await cryptoCare.getCaseCount()).to.equal(0);

      await cryptoCare.createCase(
        testCase.title,
        testCase.description,
        testCase.targetAmount,
        beneficiary.address
      );

      expect(await cryptoCare.getCaseCount()).to.equal(1);
    });
  });
}); 