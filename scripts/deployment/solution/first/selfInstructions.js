const { ethers } = require('hardhat')
const { constants } = require('../../deployConfig')
const sleep = require('../../../sleep')

async function defaultMethod(contracts) {}

async function nftCollection(contract, contracts) {
    const baseURI = 'ipfs://QmcsX1EprrBwjPRT7dyDWvmGX7zvcRsmKKDaMTiFbSsZh2/'

    const Ownable = await ethers.getContractAt(
        'Ownable',
        contracts.Ownable.address
    )
    const owner = await Ownable.owner()

    let tx

    tx = await contract.setBaseURI(baseURI)
    await tx.wait()
    await sleep(1000)

    const count = 10
    for (let i = 0; i < count; i++) {
        tx = await contract.mint(owner)
        await tx.wait()
        await sleep(1000)
    }
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
        [0, collectionAddress, 3600, '1000000000000000000', 100],
        [1, collectionAddress, 3600, '2000000000000000000', 200],
        [2, collectionAddress, 60, '3000000000000000000', 3000],
        [3, collectionAddress, 60, '4000000000000000000', 4000],
    ]

    const MultiNFT = await ethers.getContractAt(
        'MultiNFT',
        contracts.MultiNFT.address
    )
    tx = await MultiNFT.setApprovalForAll(contracts.RentMarket.address, true)
    await tx.wait()
    await sleep(1000)

    const count = 5
    for (let i = 0; i < count; i++) {
        tx = await contracts.RentMarket.initLend(...lends[i])
        await tx.wait()
        await sleep(1000)
    }

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
