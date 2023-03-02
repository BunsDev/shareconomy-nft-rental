let factoryOwnable = artifacts.require('Ownable')
let factoryERC20 = artifacts.require('ERC20')
let factoryNFTRentable = artifacts.require('NFTRentable')
let factoryRentMarket = artifacts.require('RentMarket')

async function main() {
    let Ownable = await factoryOwnable.deployed()
    let ERC20 = await factoryERC20.deployed()
    let NFTRentable = await factoryNFTRentable.deployed()
    let RentMarket = await factoryRentMarket.deployed()

    const owner = await Ownable.owner()

    const metadata = [
        'ipfs://QmPhySauhdNkJR1QhXu3oDzqpzBDEJ3JCF6tU8ffAzXbfk',
        'ipfs://QmVeAQztwtaHacNnu5sGitzQoEBhnETWRxZbXB3oSWoEg3',
        'ipfs://QmTH7XEywGfAiJJsQmYNyVvz5TpmA73vHXwV9MBvncgaYv',
        'ipfs://QmYSFYSS3TwodG5RXt9BEqa3W7Q7B1bb91RFpTGFhtsXf8',
    ]

    await NFTRentable.mint(owner, metadata[0])
    await NFTRentable.mint(owner, metadata[0])
    await NFTRentable.mint(owner, metadata[1])
    await NFTRentable.mint(owner, metadata[1])
    await NFTRentable.mint(owner, metadata[2])
    await NFTRentable.mint(owner, metadata[2])
    await NFTRentable.mint(owner, metadata[3])
    await NFTRentable.mint(owner, metadata[3])

    const collectionAddress = NFTRentable.address
    const lends = [
        [1, collectionAddress, 3600, '1000000000000000000', 100],
        [3, collectionAddress, 3600, '2000000000000000000', 100],
        [5, collectionAddress, 3600, '3000000000000000000', 100],
        [7, collectionAddress, 60, '4000000000000000000', 40000],
    ]

    await NFTRentable.setApprovalForAll(RentMarket.address, true)

    await RentMarket.initLend(...lends[0])
    await RentMarket.initLend(...lends[1])
    await RentMarket.initLend(...lends[2])
    await RentMarket.initLend(...lends[3])

    await RentMarket.setTokenPayment(ERC20.address)
}
module.exports = function (deployer) {
    main()
}
