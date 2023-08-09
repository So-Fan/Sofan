const SofanNftTemplate = artifacts.require("SofanNftTemplate");
const SofanSplitter = artifacts.require("SofanSplitter");

module.exports = function (deployer) {

  // const splitter =  await deployer.deploy(SofanSplitter, ["0xd423DCBd697164e282717009044312fDBC6C04f0"], ["1"]);
  // console.log(splitter);
  const _collectionData2 = ["Marina passe", "Monaco", "https://cards.collecttrumpcards.com/data/0/"];
  const _collectionData = [0, 45000, 0, 1000000];
  const _isAbleChangeMaxLimitCollection = true; 
  const _splitterAddress=  "0x5BE776a6706c79C358BDA575304C33e92A0922d0";
  const _percentInBips = 250;
  deployer.deploy(SofanNftTemplate, _collectionData2, _collectionData, _isAbleChangeMaxLimitCollection, _splitterAddress, _percentInBips);
  console.log('bonjour all');
};
