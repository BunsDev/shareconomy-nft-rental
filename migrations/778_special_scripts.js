let factoryOwnable = artifacts.require('Ownable')
let factoryERC20 = artifacts.require('ERC20')
let factoryNFTRentable = artifacts.require('NFTRentable')
let factoryRentMarket = artifacts.require('RentMarket')

async function main() {
    let Ownable = await factoryOwnable.deployed()
    let ERC20 = await factoryERC20.deployed()
    let NFTRentable = await factoryNFTRentable.deployed()
    let RentMarket = await factoryRentMarket.deployed()

    console.log(await RentMarket.getAvailableLends())
}
module.exports = function (deployer) {
    main()
}
