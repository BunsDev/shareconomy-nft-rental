const { ethers } = require('hardhat')

async function deploy(conName, params) {
    console.log(`deploy start - ${conName}`)
    const Contract = await ethers.getContractFactory(conName)
    let contract
    if (params) {
        contract = await Contract.deploy(...params)
    } else {
        contract = await Contract.deploy()
    }
    await contract.deployed()
    console.log(`contract address - ${contract.address}`)
    console.log(`deploy end   - ${conName}`)
    return contract
}

module.exports = deploy
