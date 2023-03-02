let Ownable = artifacts.require('Ownable')
let NFTRentable = artifacts.require('NFTRentable')

module.exports = function (deployer) {
    deployer.deploy(NFTRentable, 'NFTRentable', 'NFT', Ownable.address)
}
