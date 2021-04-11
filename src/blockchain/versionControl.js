const contractABI = require('../../blockchain/abis/VersionControlABI.json');

async function createAsset(
  web3Instance,
  address,
  id,
  name,
  metadata,
  accessLink
) {
  const contract = new web3Instance.eth.Contract(
    contractABI,
    '0x5F19786237c9D9e0836FFAeD749E6370C8673869'
  );

  contract.methods
    .createAsset(id, name, metadata, accessLink)
    .send({ from: address }, function(err, res) {
      if (err) {
        console.log('Error in versionControl.js =>', err);
        return;
      }
      console.log('Hash of the transaction => ', res);
    });
}

export { createAsset };
