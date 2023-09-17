const SofanNft = artifacts.require("../contracts/SofanNft.sol");
const FiatTokenV2_1 = artifacts.require("../contracts/FiatTokenV2_1.sol")
const FiatTokenProxy = artifacts.require("../contracts/FiatTokenProxy.sol")
const { BN, expectRevert, expectEvent } = require('../node_modules/@openzeppelin/test-helpers');
const { expect } = require('../node_modules/chai');
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
contract('SofanNft', accounts => {
    const owner = accounts[0];
    const second = accounts[1];
    const third = accounts[2];
    let SofanNftInstance;
    let FiatTokenV2_1Instance;
    let FiatTokenProxyInstance;
    let FiatTokenV2_1ViaProxy;
    
    // describe('getter after constructor when everything != 0 or false ', () => {
    //     beforeEach(async function() {
    //         SofanNftInstance = await SofanNft.new(["CollectionName", "CollectionSymbol", "https://url.com/"], [3,100,10,1000000], true, "0xd9145CCE52D386f254917e481eB44e9943F39138", 250, {from:owner});
    //     })
    //     describe('Check all constructor variables', () => {
    //         it("...should get collection name as CollectionName", async () => {
    //             const storedData = await SofanNftInstance.name({from:owner});           
    //             expect(storedData).equal("CollectionName"); 
    //         })
    //         it("...should get symbol as CollectionName", async () => {
    //             const storedData = await SofanNftInstance.symbol({from:owner});           
    //             expect(storedData).equal("CollectionSymbol"); 
    //         })       
    //         it("...should get uri === https://url.com/", async () => {
    //             const storedData = await SofanNftInstance.uri({from:owner});           
    //             expect(storedData).to.equal("https://url.com/"); 
    //         })
    //         it("...should get limitByWallet === 3", async () => {
    //             const storedData = await SofanNftInstance.limitByWallet({from:owner});           
    //             expect(new BN(storedData)).to.be.bignumber.equal(new BN(3)); 
    //         })
    //         it("...should get collectionLimit === 100", async () => {
    //             const storedData = await SofanNftInstance.collectionLimit({from:owner});           
    //             expect(new BN(storedData)).to.be.bignumber.equal(new BN(100)); 
    //         })
    //         it("...should get launchpadTime === 10", async () => {
    //             const storedData = await SofanNftInstance.launchpadTime({from:owner});           
    //             expect(new BN(storedData)).to.be.bignumber.equal(new BN(10)); 
    //         })
    //         it("...should get price === 1000000", async () => {
    //             const storedData = await SofanNftInstance.price({from:owner});           
    //             expect(new BN(storedData)).to.be.bignumber.equal(new BN(1000000)); 
    //         })
    //         it("...should get isAbleChangeMaxLimitCollection === true", async () => {
    //             const storedData = await SofanNftInstance.isAbleChangeMaxLimitCollection({from:owner});           
    //             expect(storedData).to.equal(true); 
    //         })
    //         // ERC2921 L30 reset to private
    //         it("...should get royalty info receiver === 0xd9145CCE52D386f254917e481eB44e9943F39138 ", async () => {
    //             const storedData = await SofanNftInstance._defaultRoyaltyInfo({from:owner});           
    //             expect(storedData.receiver).to.equal("0xd9145CCE52D386f254917e481eB44e9943F39138"); 
    //         })
    //         it("...should get royalty info royaltyFraction === 250 ", async () => {
    //             const storedData = await SofanNftInstance._defaultRoyaltyInfo({from:owner});           
    //             expect(new BN(storedData.royaltyFraction)).to.be.bignumber.equal(new BN(250)); 
    //         })
    //     })
    //     describe('Check other variables and standard getter', () => {
    //         it("...should get isLimitByWallet === true ", async () => {
    //             const storedData = await SofanNftInstance.isLimitByWallet({from:owner});           
    //             expect(storedData).to.equal(true); 
    //         })
    //         it("...should get SofanWallet ===  0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", async () => {
    //             const storedData = await SofanNftInstance.SofanWallet({from:owner});           
    //             expect(storedData).to.equal("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"); 
    //         })
    //         it("...should get AthleteWallet ===  0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", async () => {
    //             const storedData = await SofanNftInstance.AthleteWallet({from:owner});           
    //             expect(storedData).to.equal("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"); 
    //         })
    //         it("...should get usdc ===  0x07865c6E87B9F70255377e024ace6630C1Eaa37F", async () => {
    //             const storedData = await SofanNftInstance.usdc({from:owner});           
    //             expect(storedData).to.equal("0x07865c6E87B9F70255377e024ace6630C1Eaa37F"); 
    //         })
    //         it("...should get owner ===  owner", async () => {
    //             const storedData = await SofanNftInstance.owner({from:owner});           
    //             expect(storedData).to.equal(owner); 
    //         })
    //         it("...should get totalSupply ===  0", async () => {
    //             const storedData = await SofanNftInstance.totalSupply({from:owner});           
    //             expect(new BN(storedData)).to.be.bignumber.equal(new BN(0));  
    //         })
    //     })
    //     // describe('custom getter', () => {
    //     // })
    // })
    // describe('getter after constructor when everything = 0', () => {
    //     it("...should revert if no royalty address === 0x0", async () => {
    //         await expectRevert(SofanNft.new(["", "", ""], [0,0,0,0], false, "0x0000000000000000000000000000000000000000", 0, {from:owner}), "intrinsic gas too low");
    //     })
    //     beforeEach(async function() {
    //         SofanNftInstance = await SofanNft.new(["", "", ""], [0,0,0,0], false, "0xd9145CCE52D386f254917e481eB44e9943F39138", 0, {from:owner});
    //     })
    //     describe('Check all constructor variables', () => {
    //         it("...should get collection name === ''", async () => {
    //             const storedData = await SofanNftInstance.name({from:owner});           
    //             expect(storedData).equal(""); 
    //         })
    //         it("...should get symbol === ''", async () => {
    //             const storedData = await SofanNftInstance.symbol({from:owner});           
    //             expect(storedData).equal(""); 
    //         })       
    //         it("...should get uri === ''", async () => {
    //             const storedData = await SofanNftInstance.uri({from:owner});           
    //             expect(storedData).to.equal(""); 
    //         })
    //         it("...should get limitByWallet === 0", async () => {
    //             const storedData = await SofanNftInstance.limitByWallet({from:owner});           
    //             expect(new BN(storedData)).to.be.bignumber.equal(new BN(0)); 
    //         })
    //         it("...should get collectionLimit === 0", async () => {
    //             const storedData = await SofanNftInstance.collectionLimit({from:owner});           
    //             expect(new BN(storedData)).to.be.bignumber.equal(new BN(0)); 
    //         })
    //         it("...should get launchpadTime === 0", async () => {
    //             const storedData = await SofanNftInstance.launchpadTime({from:owner});           
    //             expect(new BN(storedData)).to.be.bignumber.equal(new BN(0)); 
    //         })
    //         it("...should get price === 0", async () => {
    //             const storedData = await SofanNftInstance.price({from:owner});           
    //             expect(new BN(storedData)).to.be.bignumber.equal(new BN(0)); 
    //         })
    //         it("...should get isAbleChangeMaxLimitCollection === false", async () => {
    //             const storedData = await SofanNftInstance.isAbleChangeMaxLimitCollection({from:owner});           
    //             expect(storedData).to.equal(false); 
    //         })
    //         // ERC2921 L30 reset to private
    //         it("...should get royalty info receiver === 0xd9145CCE52D386f254917e481eB44e9943F39138 ", async () => {
    //             const storedData = await SofanNftInstance._defaultRoyaltyInfo({from:owner});           
    //             expect(storedData.receiver).to.equal("0xd9145CCE52D386f254917e481eB44e9943F39138"); 
    //         })
    //         it("...should get royalty info royaltyFraction === 0 ", async () => {
    //             const storedData = await SofanNftInstance._defaultRoyaltyInfo({from:owner});           
    //             expect(new BN(storedData.royaltyFraction)).to.be.bignumber.equal(new BN(0)); 
    //         })
    //     })
    //     describe('Check other variables and standard getter', () => {
    //         it("...should get isLimitByWallet === false ", async () => {
    //             const storedData = await SofanNftInstance.isLimitByWallet({from:owner});           
    //             expect(storedData).to.equal(false); 
    //         })
    //         it("...should get SofanWallet ===  0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", async () => {
    //             const storedData = await SofanNftInstance.SofanWallet({from:owner});           
    //             expect(storedData).to.equal("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"); 
    //         })
    //         it("...should get AthleteWallet ===  0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", async () => {
    //             const storedData = await SofanNftInstance.AthleteWallet({from:owner});           
    //             expect(storedData).to.equal("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"); 
    //         })
    //         it("...should get usdc ===  0x07865c6E87B9F70255377e024ace6630C1Eaa37F", async () => {
    //             const storedData = await SofanNftInstance.usdc({from:owner});           
    //             expect(storedData).to.equal("0x07865c6E87B9F70255377e024ace6630C1Eaa37F"); 
    //         })
    //         it("...should get owner ===  owner", async () => {
    //             const storedData = await SofanNftInstance.owner({from:owner});           
    //             expect(storedData).to.equal(owner); 
    //         })
    //         it("...should get totalSupply ===  0", async () => {
    //             const storedData = await SofanNftInstance.totalSupply({from:owner});           
    //             expect(new BN(storedData)).to.be.bignumber.equal(new BN(0));  
    //         })
    //     })
    // })
    describe('mint process', () => {
      // simulate usdc contract
      beforeEach(async function() {
        FiatTokenV2_1Instance = await FiatTokenV2_1.new({from:second})
        FiatTokenProxyInstance = await FiatTokenProxy.new(FiatTokenV2_1Instance.address, {from:second});
        FiatTokenV2_1ViaProxy = await FiatTokenV2_1.at(FiatTokenProxyInstance.address)
        await FiatTokenV2_1ViaProxy.initialize("FiatTokenV1","USD//C (USDC)", "usdc", 6, owner, owner, owner, owner,{from:owner})
        await FiatTokenV2_1ViaProxy.configureMinter(owner, 100000000, {from:owner})
        await FiatTokenV2_1ViaProxy.mint(owner, 10000000, {from:owner})
        // await FiatTokenV2_1ViaProxy.approve(FiatTokenV2_1ViaProxy.address, 10000000, {from:owner})
      })
      it("...should mint 1 nft", async () => {
        await FiatTokenV2_1ViaProxy.approve(FiatTokenV2_1ViaProxy.address, 100000000, {from:owner})
        const storedData = await FiatTokenV2_1ViaProxy.allowance(owner, FiatTokenV2_1ViaProxy.address, {from:owner})
        expect(new BN(storedData)).to.be.bignumber.equal(new BN(100000000));
      })
    })

})