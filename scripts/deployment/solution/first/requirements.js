const { getAddress } = require('../../modules/paramsModule')
const selfInstructions = require('./selfInstructions')
const constants = require('./constants')

const requirementsName = [
    //
    // 'ERC20',
    // 'Ownable',
    'NFTRentable',
    'RentMarket',
]

const requirements = [
    {
        factoryName: 'Ownable',
        params: [],
        selfInstruction: selfInstructions.defaultMethod,
    },
    {
        factoryName: 'NFTRentable',
        params: [
            constants.COLLECTION_NAME,
            constants.COLLECTION_SYMBOL,
            { method: getAddress, args: ['Ownable'] },
        ],
        selfInstruction: selfInstructions.nftRentable,
    },
    {
        factoryName: 'RentMarket',
        params: [{ method: getAddress, args: ['Ownable'] }],
        selfInstruction: selfInstructions.rentMarket,
    },
    {
        factoryName: 'ERC20',
        params: ['1000000000000000000000000000000', 'ERC20', '18', 'ERC20'],
        selfInstruction: selfInstructions.defaultMethod,
    },
]

module.exports.requirementsName = requirementsName
module.exports.requirements = requirements
