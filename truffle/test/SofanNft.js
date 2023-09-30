const SofanNft = artifacts.require("../contracts/SofanNft.sol");
const FiatTokenV2_1 = artifacts.require("../contracts/FiatTokenV2_1.sol");
const FiatTokenProxy = artifacts.require("../contracts/FiatTokenProxy.sol");
const {
  BN,
  expectRevert,
  expectEvent,
} = require("../node_modules/@openzeppelin/test-helpers");
const { expect } = require("../node_modules/chai");
// const { Console } = require('')
/* 
    // string memory _collectionName,
    // string memory _collectionSymbol,
    // string memory _collectionBaserURI,
    // uint256 _limitByWallet,
    // uint256 _collectionLimit,
    // uint256 _launchpadTime,
    // uint256 _price,
    bool _isAbleChangeMaxLimitCollection,
    address _splitterAddress,
    uint96 _percentInBips // 2.5% = 250 
*/
// Before running test, make sur to set all SofanNft variable to public in order for them to be called
contract("SofanNft", (accounts) => {
  const owner = accounts[0];
  const second = accounts[1]; // Proxy deployer
  const third = accounts[2]; // Athlete Wallet
  const fourth = accounts[3]; // Sofan Wallet
  const fifth = accounts[4]; // Random user wallet
  let SofanNftInstance;
  let FiatTokenV2_1Instance;
  let FiatTokenProxyInstance;
  let FiatTokenV2_1ViaProxy;

  describe("getter after constructor when everything != 0 or false ", () => {
    beforeEach(async function () {
      SofanNftInstance = await SofanNft.new(
        ["CollectionName", "CollectionSymbol", "https://url.com/"],
        [3, 100, 10, 1000000],
        true,
        "0xd9145CCE52D386f254917e481eB44e9943F39138",
        250,
        { from: owner }
      );
    });
    describe("Check all constructor variables", () => {
      it("...should get collection name as CollectionName", async () => {
        const storedData = await SofanNftInstance.name({ from: owner });
        expect(storedData).equal("CollectionName");
      });
      it("...should get symbol as CollectionName", async () => {
        const storedData = await SofanNftInstance.symbol({ from: owner });
        expect(storedData).equal("CollectionSymbol");
      });
      it("...should get uri === https://url.com/", async () => {
        const storedData = await SofanNftInstance.uri({ from: owner });
        expect(storedData).to.equal("https://url.com/");
      });
      it("...should get limitByWallet === 3", async () => {
        const storedData = await SofanNftInstance.limitByWallet({
          from: owner,
        });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(3));
      });
      it("...should get collectionLimit === 100", async () => {
        const storedData = await SofanNftInstance.collectionLimit({
          from: owner,
        });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(100));
      });
      it("...should get launchpadTime === 10", async () => {
        const storedData = await SofanNftInstance.launchpadTime({
          from: owner,
        });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(10));
      });
      it("...should get price === 1000000", async () => {
        const storedData = await SofanNftInstance.price({ from: owner });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(1000000));
      });
      it("...should get isAbleChangeMaxLimitCollection === true", async () => {
        const storedData =
          await SofanNftInstance.isAbleChangeMaxLimitCollection({
            from: owner,
          });
        expect(storedData).to.equal(true);
      });
      // ERC2921 L30 reset to private
      it("...should get royalty info receiver === 0xd9145CCE52D386f254917e481eB44e9943F39138 ", async () => {
        const storedData = await SofanNftInstance._defaultRoyaltyInfo({
          from: owner,
        });
        expect(storedData.receiver).to.equal(
          "0xd9145CCE52D386f254917e481eB44e9943F39138"
        );
      });
      it("...should get royalty info royaltyFraction === 250 ", async () => {
        const storedData = await SofanNftInstance._defaultRoyaltyInfo({
          from: owner,
        });
        expect(new BN(storedData.royaltyFraction)).to.be.bignumber.equal(
          new BN(250)
        );
      });
    });
    describe("Check other variables and standard getter", () => {
      it("...should get isLimitByWallet === true ", async () => {
        const storedData = await SofanNftInstance.isLimitByWallet({
          from: owner,
        });
        expect(storedData).to.equal(true);
      });
      it("...should get SofanWallet ===  0x0000000000000000000000000000000000000000", async () => {
        const storedData = await SofanNftInstance.SofanWallet({ from: owner });
        expect(storedData).to.equal(
          "0x0000000000000000000000000000000000000000"
        );
      });
      it("...should get AthleteWallet ===  0x0000000000000000000000000000000000000000", async () => {
        const storedData = await SofanNftInstance.AthleteWallet({
          from: owner,
        });
        expect(storedData).to.equal(
          "0x0000000000000000000000000000000000000000"
        );
      });
      it("...should get usdc ===  0x0000000000000000000000000000000000000000", async () => {
        const storedData = await SofanNftInstance.usdc({ from: owner });
        expect(storedData).to.equal(
          "0x0000000000000000000000000000000000000000"
        );
      });
      it("...should get owner ===  owner", async () => {
        const storedData = await SofanNftInstance.owner({ from: owner });
        expect(storedData).to.equal(owner);
      });
      it("...should get totalSupply ===  0", async () => {
        const storedData = await SofanNftInstance.totalSupply({ from: owner });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(0));
      });
    });
    // describe('custom getter', () => {
    // })
  });
  describe("getter after constructor when everything = 0", () => {
    it("...should revert if no royalty address === 0x0", async () => {
      await expectRevert(
        SofanNft.new(
          ["", "", ""],
          [0, 0, 0, 0],
          false,
          "0x0000000000000000000000000000000000000000",
          0,
          { from: owner }
        ),
        "invalid receiver"
      );
    });
    beforeEach(async function () {
      SofanNftInstance = await SofanNft.new(
        ["", "", ""],
        [0, 0, 0, 0],
        false,
        "0xd9145CCE52D386f254917e481eB44e9943F39138",
        0,
        { from: owner }
      );
    });
    describe("Check all constructor variables", () => {
      it("...should get collection name === ''", async () => {
        const storedData = await SofanNftInstance.name({ from: owner });
        expect(storedData).equal("");
      });
      it("...should get symbol === ''", async () => {
        const storedData = await SofanNftInstance.symbol({ from: owner });
        expect(storedData).equal("");
      });
      it("...should get uri === ''", async () => {
        const storedData = await SofanNftInstance.uri({ from: owner });
        expect(storedData).to.equal("");
      });
      it("...should get limitByWallet === 0", async () => {
        const storedData = await SofanNftInstance.limitByWallet({
          from: owner,
        });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(0));
      });
      it("...should get collectionLimit === 0", async () => {
        const storedData = await SofanNftInstance.collectionLimit({
          from: owner,
        });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(0));
      });
      it("...should get launchpadTime === 0", async () => {
        const storedData = await SofanNftInstance.launchpadTime({
          from: owner,
        });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(0));
      });
      it("...should get price === 0", async () => {
        const storedData = await SofanNftInstance.price({ from: owner });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(0));
      });
      it("...should get isAbleChangeMaxLimitCollection === false", async () => {
        const storedData =
          await SofanNftInstance.isAbleChangeMaxLimitCollection({
            from: owner,
          });
        expect(storedData).to.equal(false);
      });
      // ERC2921 L30 reset to private
      it("...should get royalty info receiver === 0xd9145CCE52D386f254917e481eB44e9943F39138 ", async () => {
        const storedData = await SofanNftInstance._defaultRoyaltyInfo({
          from: owner,
        });
        expect(storedData.receiver).to.equal(
          "0xd9145CCE52D386f254917e481eB44e9943F39138"
        );
      });
      it("...should get royalty info royaltyFraction === 0 ", async () => {
        const storedData = await SofanNftInstance._defaultRoyaltyInfo({
          from: owner,
        });
        expect(new BN(storedData.royaltyFraction)).to.be.bignumber.equal(
          new BN(0)
        );
      });
    });
    describe("Check other variables and standard getter", () => {
      it("...should get isLimitByWallet === false ", async () => {
        const storedData = await SofanNftInstance.isLimitByWallet({
          from: owner,
        });
        expect(storedData).to.equal(false);
      });
      it("...should get SofanWallet ===  0x0000000000000000000000000000000000000000", async () => {
        const storedData = await SofanNftInstance.SofanWallet({ from: owner });
        expect(storedData).to.equal(
          "0x0000000000000000000000000000000000000000"
        );
      });
      it("...should get AthleteWallet ===  0x0000000000000000000000000000000000000000", async () => {
        const storedData = await SofanNftInstance.AthleteWallet({
          from: owner,
        });
        expect(storedData).to.equal(
          "0x0000000000000000000000000000000000000000"
        );
      });
      it("...should get usdc ===  0x0000000000000000000000000000000000000000", async () => {
        const storedData = await SofanNftInstance.usdc({ from: owner });
        expect(storedData).to.equal(
          "0x0000000000000000000000000000000000000000"
        );
      });
      it("...should get owner ===  owner", async () => {
        const storedData = await SofanNftInstance.owner({ from: owner });
        expect(storedData).to.equal(owner);
      });
      it("...should get totalSupply ===  0", async () => {
        const storedData = await SofanNftInstance.totalSupply({ from: owner });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(0));
      });
      it("...should get balanceOf owner ===  0", async () => {
        const storedData = await SofanNftInstance.balanceOf(owner, {
          from: owner,
        });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(0));
      });
    });
  });
  context("mint process", () => {
    describe("when condition are satisfied", () => {
      beforeEach(async () => {
        // simulate usdc contract
        FiatTokenV2_1Instance = await FiatTokenV2_1.new({ from: second });
        FiatTokenProxyInstance = await FiatTokenProxy.new(
          FiatTokenV2_1Instance.address,
          { from: second }
        );
        FiatTokenV2_1ViaProxy = await FiatTokenV2_1.at(
          FiatTokenProxyInstance.address
        );
        await FiatTokenV2_1ViaProxy.initialize(
          "FiatTokenV1",
          "USD//C (USDC)",
          "usdc",
          6,
          owner,
          owner,
          owner,
          owner,
          { from: owner }
        );
        await FiatTokenV2_1ViaProxy.configureMinter(owner, 100000000, {
          from: owner,
        });
        await FiatTokenV2_1ViaProxy.mint(owner, 10000000, { from: owner });
        // create collection, set USDC Address, set Athlete wallet, approve
        SofanNftInstance = await SofanNft.new(
          ["CollectionName", "CollectionSymbol", "https://url.com/"],
          [3, 100, 10, 1000000],
          true,
          "0xd9145CCE52D386f254917e481eB44e9943F39138",
          250,
          { from: owner }
        );
        await SofanNftInstance.setAthleteWallet(third, { from: owner });
        await SofanNftInstance.setSofanWallet(fourth, { from: owner });
        await SofanNftInstance.setUsdcAddress(FiatTokenV2_1ViaProxy.address, {
          from: owner,
        });
        await FiatTokenV2_1ViaProxy.approve(
          SofanNftInstance.address,
          100000000,
          { from: owner }
        );
      });
      it("...should get usdc address", async () => {
        const storedData = await SofanNftInstance.usdc({ from: owner });
        expect(storedData).to.equal(FiatTokenV2_1ViaProxy.address);
      });
      it("...should mint 1 nft", async () => {
        const storedData = await SofanNftInstance.mint(owner, 1, 1000000, {
          from: owner,
        });
        expect(storedData.receipt.status).to.equal(true);
      });
      it("...should mint 3 nft", async () => {
        const storedData = await SofanNftInstance.mint(owner, 3, 3000000, {
          from: owner,
        });
        expect(storedData.receipt.status).to.equal(true);
      });
      it("...should increment total supply 1 nft", async () => {
        await SofanNftInstance.mint(owner, 1, 1000000, { from: owner });
        const storedData = await SofanNftInstance.totalSupply({ from: owner });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(1));
      });
      it("...should have balance of 1 nft", async () => {
        await SofanNftInstance.mint(owner, 1, 1000000, { from: owner });
        const storedData = await SofanNftInstance.balanceOf(owner, {
          from: owner,
        });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(1));
      });
      it("...should get tokenURI of nft 0", async () => {
        await SofanNftInstance.mint(owner, 1, 1000000, { from: owner });
        const storedData = await SofanNftInstance.tokenURI(0, { from: owner });
        expect(storedData).to.equal("https://url.com/0.json");
      });
      it("...should get royaltyInfo of nft 0", async () => {
        await SofanNftInstance.mint(owner, 1, 1000000, { from: owner });
        const storedData = await SofanNftInstance.royaltyInfo(0, 1000000, {
          from: owner,
        });
        expect(storedData[0]).to.equal(
          "0xd9145CCE52D386f254917e481eB44e9943F39138"
        );
        expect(new BN(storedData[1])).to.be.bignumber.equal(new BN(25000));
      });
      it("...should get tokenURI of nft 0", async () => {
        await SofanNftInstance.mint(owner, 1, 1000000, { from: owner });
        const storedData = await SofanNftInstance.tokenURI(0, { from: owner });
        expect(storedData).to.equal("https://url.com/0.json");
      });
      it("...should get owner of nft 0", async () => {
        await SofanNftInstance.mint(owner, 1, 1000000, { from: owner });
        const storedData = await SofanNftInstance.ownerOf(0, { from: owner });
        expect(storedData).to.equal(owner);
      });
      it("...should get athlete wallet", async () => {
        const storedData = await SofanNftInstance.AthleteWallet({
          from: owner,
        });
        expect(storedData).to.equal(third);
      });
      it("...should balance of athlete wallet increase", async () => {
        await SofanNftInstance.mint(owner, 1, 1000000, { from: owner });
        const storedData = await FiatTokenV2_1ViaProxy.balanceOf(third, {
          from: owner,
        });
        expect(new BN(storedData)).to.be.bignumber.equal(
          new BN((1000000 * 80) / 100)
        );
      });
      it("...should get sofan wallet", async () => {
        const storedData = await SofanNftInstance.SofanWallet({ from: owner });
        expect(storedData).to.equal(fourth);
      });
      it("...should balance of sofan wallet increase", async () => {
        await SofanNftInstance.mint(owner, 1, 1000000, { from: owner });
        const storedData = await FiatTokenV2_1ViaProxy.balanceOf(fourth, {
          from: owner,
        });
        expect(new BN(storedData)).to.be.bignumber.equal(
          new BN((1000000 * 20) / 100)
        );
      });
    });
    describe("when condition are not satisfied", () => {
      beforeEach(async () => {
        // simulate usdc contract
        FiatTokenV2_1Instance = await FiatTokenV2_1.new({ from: second });
        FiatTokenProxyInstance = await FiatTokenProxy.new(
          FiatTokenV2_1Instance.address,
          { from: second }
        );
        FiatTokenV2_1ViaProxy = await FiatTokenV2_1.at(
          FiatTokenProxyInstance.address
        );
        await FiatTokenV2_1ViaProxy.initialize(
          "FiatTokenV1",
          "USD//C (USDC)",
          "usdc",
          6,
          owner,
          owner,
          owner,
          owner,
          { from: owner }
        );
        await FiatTokenV2_1ViaProxy.configureMinter(owner, 100000000, {
          from: owner,
        });
        await FiatTokenV2_1ViaProxy.mint(owner, 100000000, { from: owner });
      });
      it("...should not mint : Limit of collection NFT reached or too much NFTs asked", async () => {
        SofanNftInstance = await SofanNft.new(
          ["CollectionName", "CollectionSymbol", "https://url.com/"],
          [0, 2, 0, 1000000],
          true,
          "0xd9145CCE52D386f254917e481eB44e9943F39138",
          250,
          { from: owner }
        );
        await SofanNftInstance.setAthleteWallet(third, { from: owner });
        await SofanNftInstance.setSofanWallet(fourth, { from: owner });
        await SofanNftInstance.setUsdcAddress(FiatTokenV2_1ViaProxy.address, {
          from: owner,
        });
        await FiatTokenV2_1ViaProxy.approve(SofanNftInstance.address, 3000000, {
          from: owner,
        });
        await expectRevert(
          SofanNftInstance.mint(owner, 3, 3000000, { from: owner }),
          "Limit of collection NFT reached or too much NFTs asked"
        );
      });
      it("...should not mint : Limit of owned NFT reached or too much NFTs asked", async () => {
        SofanNftInstance = await SofanNft.new(
          ["CollectionName", "CollectionSymbol", "https://url.com/"],
          [1, 100, 0, 1000000],
          true,
          "0xd9145CCE52D386f254917e481eB44e9943F39138",
          250,
          { from: owner }
        );
        await SofanNftInstance.setAthleteWallet(third, { from: owner });
        await SofanNftInstance.setSofanWallet(fourth, { from: owner });
        await SofanNftInstance.setUsdcAddress(FiatTokenV2_1ViaProxy.address, {
          from: owner,
        });
        await FiatTokenV2_1ViaProxy.approve(SofanNftInstance.address, 3000000, {
          from: owner,
        });
        await expectRevert(
          SofanNftInstance.mint(owner, 2, 2000000, { from: owner }),
          "Limit of owned NFT reached or too much NFTs asked"
        );
      });
      it("...should not mint : Timestamp > = block.timestamp", async () => {
        SofanNftInstance = await SofanNft.new(
          ["CollectionName", "CollectionSymbol", "https://url.com/"],
          [0, 100, 1705063360, 1000000],
          true,
          "0xd9145CCE52D386f254917e481eB44e9943F39138",
          250,
          { from: owner }
        );
        await SofanNftInstance.setAthleteWallet(third, { from: owner });
        await SofanNftInstance.setSofanWallet(fourth, { from: owner });
        await SofanNftInstance.setUsdcAddress(FiatTokenV2_1ViaProxy.address, {
          from: owner,
        });
        await FiatTokenV2_1ViaProxy.approve(SofanNftInstance.address, 3000000, {
          from: owner,
        });
        await expectRevert(
          SofanNftInstance.mint(owner, 1, 1000000, { from: owner }),
          "Cannot mint. Check Launchpad date !"
        );
      });
      it("...should not mint : user doesn't have approve enough ETH", async () => {
        SofanNftInstance = await SofanNft.new(
          ["CollectionName", "CollectionSymbol", "https://url.com/"],
          [0, 100, 0, 1000000],
          true,
          "0xd9145CCE52D386f254917e481eB44e9943F39138",
          250,
          { from: owner }
        );
        await SofanNftInstance.setAthleteWallet(third, { from: owner });
        await SofanNftInstance.setSofanWallet(fourth, { from: owner });
        await SofanNftInstance.setUsdcAddress(FiatTokenV2_1ViaProxy.address, {
          from: owner,
        });
        await FiatTokenV2_1ViaProxy.approve(SofanNftInstance.address, 1000000, {
          from: owner,
        });
        await expectRevert(
          SofanNftInstance.mint(owner, 2, 2000000, { from: owner }),
          "Please make sure you have approve enough USDC !"
        );
      });
      it("...should not mint : user doesn't send enough ETH", async () => {
        SofanNftInstance = await SofanNft.new(
          ["CollectionName", "CollectionSymbol", "https://url.com/"],
          [0, 100, 0, 1000000],
          true,
          "0xd9145CCE52D386f254917e481eB44e9943F39138",
          250,
          { from: owner }
        );
        await SofanNftInstance.setAthleteWallet(third, { from: owner });
        await SofanNftInstance.setSofanWallet(fourth, { from: owner });
        await SofanNftInstance.setUsdcAddress(FiatTokenV2_1ViaProxy.address, {
          from: owner,
        });
        await FiatTokenV2_1ViaProxy.approve(SofanNftInstance.address, 2000000, {
          from: owner,
        });
        await expectRevert(
          SofanNftInstance.mint(owner, 2, 1000000, { from: owner }),
          "Not enough USDC sent; check price!"
        );
      });
      it("...should mint 1 but not transfer usdc", async () => {
        SofanNftInstance = await SofanNft.new(["CollectionName", "CollectionSymbol", "https://url.com/"],[0, 100, 0, 0],true,"0xd9145CCE52D386f254917e481eB44e9943F39138",250,{ from: owner });
        await SofanNftInstance.setAthleteWallet(third, { from: owner });
        await SofanNftInstance.setSofanWallet(fourth, { from: owner });
        await SofanNftInstance.setUsdcAddress(FiatTokenV2_1ViaProxy.address, {from: owner,});
        await SofanNftInstance.mint(owner, 1, 0, { from: owner });
        const storedData = await SofanNftInstance.balanceOf(owner, {from: owner,});
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(1));
      });
      it("...should mint 2 but not transfer usdc", async () => {
        SofanNftInstance = await SofanNft.new(
          ["CollectionName", "CollectionSymbol", "https://url.com/"],
          [0, 100, 0, 0],
          true,
          "0xd9145CCE52D386f254917e481eB44e9943F39138",
          250,
          { from: owner }
        );
        await SofanNftInstance.setAthleteWallet(third, { from: owner });
        await SofanNftInstance.setSofanWallet(fourth, { from: owner });
        await SofanNftInstance.setUsdcAddress(FiatTokenV2_1ViaProxy.address, {
          from: owner,
        });
        await SofanNftInstance.mint(owner, 2, 0, { from: owner });
        const storedData = await SofanNftInstance.balanceOf(owner, {
          from: owner,
        });
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(2));
      });
    });
    context("setter and modifier", () => {
      describe("setter", () => {
        beforeEach(async () => {
          // simulate usdc contract
          FiatTokenV2_1Instance = await FiatTokenV2_1.new({ from: second });
          FiatTokenProxyInstance = await FiatTokenProxy.new(
            FiatTokenV2_1Instance.address,
            { from: second }
          );
          FiatTokenV2_1ViaProxy = await FiatTokenV2_1.at(
            FiatTokenProxyInstance.address
          );
          await FiatTokenV2_1ViaProxy.initialize(
            "FiatTokenV1",
            "USD//C (USDC)",
            "usdc",
            6,
            owner,
            owner,
            owner,
            owner,
            { from: owner }
          );
          await FiatTokenV2_1ViaProxy.configureMinter(owner, 100000000, {
            from: owner,
          });
          await FiatTokenV2_1ViaProxy.mint(owner, 10000000, { from: owner });
          // create collection, set USDC Address, set Athlete wallet, approve
          SofanNftInstance = await SofanNft.new(
            ["CollectionName", "CollectionSymbol", "https://url.com/"],
            [3, 100, 10, 1000000],
            true,
            "0xd9145CCE52D386f254917e481eB44e9943F39138",
            250,
            { from: owner }
          );
          await SofanNftInstance.setAthleteWallet(third, { from: owner });
          await SofanNftInstance.setSofanWallet(fourth, { from: owner });
          await SofanNftInstance.setUsdcAddress(FiatTokenV2_1ViaProxy.address, {
            from: owner,
          });
          await FiatTokenV2_1ViaProxy.approve(
            SofanNftInstance.address,
            3000000,
            { from: owner }
          );
        });
        it("...should set usdc address to null", async () => {
          const storedData = await SofanNftInstance.usdc({ from: owner });
          expect(storedData).to.equal(FiatTokenV2_1ViaProxy.address);
          await SofanNftInstance.setUsdcAddress(
            "0x0000000000000000000000000000000000000000"
          );
          const storedData2 = await SofanNftInstance.usdc({ from: owner });
          expect(storedData2).to.equal(
            "0x0000000000000000000000000000000000000000"
          );
        });
        it("...should set athlete wallet to null", async () => {
          const storedData = await SofanNftInstance.AthleteWallet({
            from: owner,
          });
          expect(storedData).to.equal(third);
          await SofanNftInstance.setAthleteWallet(
            "0x0000000000000000000000000000000000000000"
          );
          const storedData2 = await SofanNftInstance.AthleteWallet({
            from: owner,
          });
          expect(storedData2).to.equal(
            "0x0000000000000000000000000000000000000000"
          );
        });
        it("...should set sofan wallet to null", async () => {
          const storedData = await SofanNftInstance.SofanWallet({
            from: owner,
          });
          expect(storedData).to.equal(fourth);
          await SofanNftInstance.setSofanWallet(
            "0x0000000000000000000000000000000000000000"
          );
          const storedData2 = await SofanNftInstance.SofanWallet({
            from: owner,
          });
          expect(storedData2).to.equal(
            "0x0000000000000000000000000000000000000000"
          );
        });
        it("...should withdraw rounded or excess amount of usdc", async () => {
          await FiatTokenV2_1ViaProxy.allowance(
            owner,
            SofanNftInstance.address,
            { from: owner }
          );
          await FiatTokenV2_1ViaProxy.transfer(
            SofanNftInstance.address,
            1000000,
            { from: owner }
          );
          const storedData = await FiatTokenV2_1ViaProxy.balanceOf(owner, {
            from: owner,
          });
          expect(new BN(storedData)).to.be.bignumber.equal(
            new BN(10000000 - 1000000)
          );
          const storedData2 = await FiatTokenV2_1ViaProxy.balanceOf(
            SofanNftInstance.address,
            { from: owner }
          );
          expect(new BN(storedData2)).to.be.bignumber.equal(new BN(1000000));
          await SofanNftInstance.withdrawUSDC({ from: owner });
          const storedData3 = await FiatTokenV2_1ViaProxy.balanceOf(
            SofanNftInstance.address,
            { from: owner }
          );
          expect(new BN(storedData3)).to.be.bignumber.equal(new BN(0));
          const storedData4 = await FiatTokenV2_1ViaProxy.balanceOf(owner, {
            from: owner,
          });
          expect(new BN(storedData4)).to.be.bignumber.equal(new BN(10000000));
        });
        it("...should be able to mint after active manually", async () => {
          let tempSofanInstance = await SofanNft.new(
            ["CollectionName", "CollectionSymbol", "https://url.com/"],
            [3, 100, 1705063360, 1000000],
            true,
            "0xd9145CCE52D386f254917e481eB44e9943F39138",
            250,
            { from: owner }
          );
          await tempSofanInstance.setAthleteWallet(third, { from: owner });
          await tempSofanInstance.setSofanWallet(fourth, { from: owner });
          await tempSofanInstance.setUsdcAddress(
            FiatTokenV2_1ViaProxy.address,
            { from: owner }
          );
          await FiatTokenV2_1ViaProxy.approve(
            tempSofanInstance.address,
            2000000,
            { from: owner }
          );
          await expectRevert(
            tempSofanInstance.mint(owner, 1, 1000000, { from: owner }),
            "Cannot mint. Check Launchpad date !"
          );
          await tempSofanInstance.activeMintManually({ from: owner });
          await tempSofanInstance.mint(owner, 1, 1000000, { from: owner });
          const storedData = await tempSofanInstance.ownerOf(0, {
            from: owner,
          });
          expect(storedData).to.equal(owner);
        });
        it("...should be able to set limit by wallet", async () => {
          await SofanNftInstance.setLimitWallet(0, { from: owner });
          const storedData = await SofanNftInstance.isLimitByWallet({
            from: owner,
          });
          expect(storedData).to.equal(false);
          await SofanNftInstance.mint(owner, 1, 1000000, { from: owner });
          await SofanNftInstance.setLimitWallet(1, { from: owner });
          const storedData2 = await SofanNftInstance.isLimitByWallet({
            from: owner,
          });
          expect(storedData2).to.equal(true);
          const storedData3 = await SofanNftInstance.limitByWallet({
            from: owner,
          });
          expect(new BN(storedData3)).to.be.bignumber.equal(new BN(1));
          await expectRevert(
            SofanNftInstance.mint(owner, 2, 2000000),
            "Limit of owned NFT reached or too much NFTs asked"
          );
        });
        it("...should change max limit", async () => {
          await SofanNftInstance.changeLimitOfMaxCollection(0, { from: owner });
          const storedData = await SofanNftInstance.collectionLimit({
            from: owner,
          });
          expect(new BN(storedData)).to.be.bignumber.equal(new BN(0));
        });
        it("...should change base URI", async () => {
          await SofanNftInstance.setBaseURI("https://notsameurl.com/", {
            from: owner,
          });
          const storedData = await SofanNftInstance.uri({ from: owner });
          expect(storedData).to.equal("https://notsameurl.com/");
        });
      });
      describe("modifier and revert", () => {
        beforeEach(async () => {
          // simulate usdc contract
          FiatTokenV2_1Instance = await FiatTokenV2_1.new({ from: second });
          FiatTokenProxyInstance = await FiatTokenProxy.new(
            FiatTokenV2_1Instance.address,
            { from: second }
          );
          FiatTokenV2_1ViaProxy = await FiatTokenV2_1.at(
            FiatTokenProxyInstance.address
          );
          await FiatTokenV2_1ViaProxy.initialize(
            "FiatTokenV1",
            "USD//C (USDC)",
            "usdc",
            6,
            owner,
            owner,
            owner,
            owner,
            { from: owner }
          );
          await FiatTokenV2_1ViaProxy.configureMinter(owner, 100000000, {
            from: owner,
          });
          await FiatTokenV2_1ViaProxy.mint(owner, 10000000, { from: owner });
          // create collection, set USDC Address, set Athlete wallet, approve
          SofanNftInstance = await SofanNft.new(
            ["CollectionName", "CollectionSymbol", "https://url.com/"],
            [3, 100, 10, 1000000],
            false,
            "0xd9145CCE52D386f254917e481eB44e9943F39138",
            250,
            { from: owner }
          );
          await SofanNftInstance.setAthleteWallet(third, { from: owner });
          await SofanNftInstance.setSofanWallet(fourth, { from: owner });
          await SofanNftInstance.setUsdcAddress(FiatTokenV2_1ViaProxy.address, {
            from: owner,
          });
          await FiatTokenV2_1ViaProxy.approve(
            SofanNftInstance.address,
            3000000,
            { from: owner }
          );
        });
        it("...should not withdraw USDC : no usdc to withdraw", async () => {
          await expectRevert(
            SofanNftInstance.withdrawUSDC({ from: owner }),
            "No USDC in the contract"
          );
        });
        it("...should not be able to change max collection limit : not authorized by the contract", async () => {
          await expectRevert(
            SofanNftInstance.changeLimitOfMaxCollection(0, { from: owner }),
            "Cannot Change Limit"
          );
        });
        it("...should not set new usdc address", async () => {
          await expectRevert(
            SofanNftInstance.setUsdcAddress(fifth, { from: fifth }),
            "Ownable: caller is not the owner"
          );
        });
        it("...should not set new athlete wallet", async () => {
          await expectRevert(
            SofanNftInstance.setAthleteWallet(fifth, { from: fifth }),
            "Ownable: caller is not the owner"
          );
        });
        it("...should not set new sofan wallet", async () => {
          await expectRevert(
            SofanNftInstance.setSofanWallet(fifth, { from: fifth }),
            "Ownable: caller is not the owner"
          );
        });
        it("...should not withdraw usdc", async () => {
          await FiatTokenV2_1ViaProxy.transfer(
            SofanNftInstance.address,
            1000000,
            { from: owner }
          );
          await expectRevert(
            SofanNftInstance.withdrawUSDC({ from: fifth }),
            "Ownable: caller is not the owner"
          );
        });
        it("...should not active mint manually", async () => {
          await expectRevert(
            SofanNftInstance.activeMintManually({ from: fifth }),
            "Ownable: caller is not the owner"
          );
        });
        it("...should not set new limit for wallet", async () => {
          await expectRevert(
            SofanNftInstance.setLimitWallet(5, { from: fifth }),
            "Ownable: caller is not the owner"
          );
        });
        it("...should not set new collection limit", async () => {
          await expectRevert(
            SofanNftInstance.changeLimitOfMaxCollection(5, { from: fifth }),
            "Ownable: caller is not the owner"
          );
        });
        it("...should not set new collection limit", async () => {
          await expectRevert(
            SofanNftInstance.setBaseURI("https://HAcKhaCK.com/", {
              from: fifth,
            }),
            "Ownable: caller is not the owner"
          );
        });
      });
    });
  });
});