const { ethers } = require('hardhat')
const { constants } = require('../../deployConfig')
const sleep = require('../../../sleep')

async function defaultMethod(contracts) {}

async function nftCollection(contract, contracts) {
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
    tx = await contract.mint(owner, metadata[0])
    await tx.wait()
    await sleep(1000)
    tx = await contract.mint(owner, metadata[0])
    await tx.wait()
    await sleep(1000)
    //
    tx = await contract.mint(owner, metadata[1])
    await tx.wait()
    await sleep(1000)
    tx = await contract.mint(owner, metadata[1])
    await tx.wait()
    await sleep(1000)
    //
    tx = await contract.mint(owner, metadata[2])
    await tx.wait()
    await sleep(1000)
    tx = await contract.mint(owner, metadata[2])
    await tx.wait()
    await sleep(1000)
    //
    tx = await contract.mint(owner, metadata[3])
    await tx.wait()
    await sleep(1000)
    tx = await contract.mint(owner, metadata[3])
    await tx.wait()
    await sleep(1000)
}

async function nftRentable(contracts) {
    await nftCollection(contracts.NFTRentable, contracts)
}

async function multiNFT(contracts) {
    await nftCollection(contracts.MultiNFT, contracts)
}

async function rentMarket(contracts) {
    let tx
    const collectionAddress = contracts.MultiNFT.address
    const lends = [
        [1, collectionAddress, 3600, '1000000000000000000', 100],
        [3, collectionAddress, 3600, '2000000000000000000', 200],
        [5, collectionAddress, 60, '3000000000000000000', 3000],
        [7, collectionAddress, 60, '4000000000000000000', 4000],
    ]

    const MultiNFT = await ethers.getContractAt(
        'MultiNFT',
        contracts.MultiNFT.address
    )
    tx = await MultiNFT.setApprovalForAll(contracts.RentMarket.address, true)
    await tx.wait()
    await sleep(1000)

    tx = await contracts.RentMarket.initLend(...lends[0])
    await tx.wait()
    await sleep(1000)
    tx = await contracts.RentMarket.initLend(...lends[1])
    await tx.wait()
    await sleep(1000)
    tx = await contracts.RentMarket.initLend(...lends[2])
    await tx.wait()
    await sleep(1000)
    tx = await contracts.RentMarket.initLend(...lends[3])
    await tx.wait()
    await sleep(1000)

    tx = await contracts.RentMarket.setTokenPayment(
        contracts.MultiERC20.address
    )
    await tx.wait()
    await sleep(1000)
}

module.exports.defaultMethod = defaultMethod
module.exports.nftRentable = nftRentable
module.exports.multiNFT = multiNFT
module.exports.rentMarket = rentMarket
