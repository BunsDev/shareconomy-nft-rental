const hardhat = require('hardhat')
const { contractName } = require('./verifyConfig')
const contracts = require('../deployment/results/contracts.json')
const contractAddress = contracts[contractName].address
const constructorArguments = require('./arguments')
await hardhat.run('verify:verify', {
    address: contractAddress,
    constructorArguments,
})
