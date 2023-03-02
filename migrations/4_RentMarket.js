let Ownable = artifacts.require('Ownable')
let RentMarket = artifacts.require('RentMarket')

module.exports = function (deployer) {
    deployer.deploy(RentMarket, Ownable.address)
}
