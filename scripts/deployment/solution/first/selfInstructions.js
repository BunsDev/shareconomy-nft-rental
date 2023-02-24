const { ethers } = require('hardhat')
const { constants } = require('../../deployConfig')

async function defaultMethod(contracts) {}

async function nftRentable(contracts) {
    const metadata = [
        'ipfs://QmPhySauhdNkJR1QhXu3oDzqpzBDEJ3JCF6tU8ffAzXbfk',
        'ipfs://QmVeAQztwtaHacNnu5sGitzQoEBhnETWRxZbXB3oSWoEg3',
        'ipfs://QmTH7XEywGfAiJJsQmYNyVvz5TpmA73vHXwV9MBvncgaYv',
        'ipfs://QmYSFYSS3TwodG5RXt9BEqa3W7Q7B1bb91RFpTGFhtsXf8',
    ]

    const Ownable = await ethers.getContractAt(
        'Ownable',
        contracts.Ownable.address
    )
    const owner = await Ownable.owner()

    let tx
    //
    tx = await contracts.NFTRentable.mint(owner, metadata[0])
    await tx.wait()
    tx = await contracts.NFTRentable.mint(owner, metadata[0])
    await tx.wait()
    //
    tx = await contracts.NFTRentable.mint(owner, metadata[1])
    await tx.wait()
    tx = await contracts.NFTRentable.mint(owner, metadata[1])
    await tx.wait()
    //
    tx = await contracts.NFTRentable.mint(owner, metadata[2])
    await tx.wait()
    tx = await contracts.NFTRentable.mint(owner, metadata[2])
    await tx.wait()
    //
    tx = await contracts.NFTRentable.mint(owner, metadata[3])
    await tx.wait()
    tx = await contracts.NFTRentable.mint(owner, metadata[3])
    await tx.wait()
}

async function rentMarket(contracts) {
    let tx
    const collectionAddress = contracts.NFTRentable.address
    const lends = [
        [1, collectionAddress, 60, '1000000000000000000', 10],
        [3, collectionAddress, 60, '2000000000000000000', 20],
        [5, collectionAddress, 60, '3000000000000000000', 30],
        [7, collectionAddress, 60, '4000000000000000000', 40],
    ]

    const NFTRentable = await ethers.getContractAt(
        'NFTRentable',
        contracts.NFTRentable.address
    )
    tx = await NFTRentable.setApprovalForAll(contracts.RentMarket.address, true)
    await tx.wait()

    tx = await contracts.RentMarket.initLend(...lends[0])
    await tx.wait()
    tx = await contracts.RentMarket.initLend(...lends[1])
    await tx.wait()
    tx = await contracts.RentMarket.initLend(...lends[2])
    await tx.wait()
    tx = await contracts.RentMarket.initLend(...lends[3])
    await tx.wait()

    tx = await contracts.RentMarket.setTokenPayment(contracts.ERC20.address)
    await tx.wait()
}

module.exports.defaultMethod = defaultMethod
module.exports.nftRentable = nftRentable
module.exports.rentMarket = rentMarket
