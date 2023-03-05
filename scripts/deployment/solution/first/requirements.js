const { getAddress } = require('../../modules/paramsModule')
const selfInstructions = require('./selfInstructions')
const constants = require('./constants')

const requirementsName = [
    //
    // 'MultiERC20',
    // 'Ownable',
    'MultiNFT',
    'RentMarket',
    // 'ERC20',
    // 'NFTRentable',
]

const requirements = [
    {
        factoryName: 'Ownable',
        params: [],
        verification: true,
        selfInstruction: selfInstructions.defaultMethod,
    },
    {
        factoryName: 'NFTRentable',
        params: [
            constants.COLLECTION_NAME,
            constants.COLLECTION_SYMBOL,
            { method: getAddress, args: ['Ownable'] },
        ],
        verification: true,
        selfInstruction: selfInstructions.nftRentable,
    },
    {
        factoryName: 'MultiNFT',
        params: [
            constants.COLLECTION_NAME,
            constants.COLLECTION_SYMBOL,
            { method: getAddress, args: ['Ownable'] },
        ],
        verification: true,
        selfInstruction: selfInstructions.multiNFT,
    },
    {
        factoryName: 'RentMarket',
        params: [{ method: getAddress, args: ['Ownable'] }],
        verification: true,
        selfInstruction: selfInstructions.rentMarket,
    },
    {
        factoryName: 'ERC20',
        params: ['1000000000000000000000000000000', 'ERC20', '18', 'ERC20'],
        verification: true,
        selfInstruction: selfInstructions.defaultMethod,
    },
    {
        factoryName: 'MultiERC20',
        params: ['MultiERC20', 'MultiERC20'],
        verification: true,
        selfInstruction: selfInstructions.defaultMethod,
    },
]

module.exports.requirementsName = requirementsName
module.exports.requirements = requirements
