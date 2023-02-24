const mysql = require('mysql2')

const CHAIN_ID = 4002

const chains = {
    56: 'bsc_main',
    98: 'bsc_testnet',
    4002: 'fantom_testnet',
}

const providers = {
    56: 'https://bsc-dataseed.binance.org/',
    97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    4002: 'https://endpoints.omniatech.io/v1/fantom/testnet/public',
}

const defaultNetwork = chains[CHAIN_ID]

const hardhat = new Object()
hardhat.accounts = [
    'fb6840d86cf90fc62b7f566c4bf1a43a232bf83523cc21a6c00aa7d221156e1d',
]
hardhat.defaultNetwork = defaultNetwork
hardhat.networks = {
    bsc_main: {
        url: providers[56],
        accounts: hardhat.accounts,
    },
    bsc_testnet: {
        url: providers[97],
        accounts: hardhat.accounts,
    },
    fantom_testnet: {
        url: providers[4002],
        accounts: hardhat.accounts,
    },
}

module.exports.CHAIN_ID = CHAIN_ID
module.exports.hardhat = hardhat
module.exports.provider = providers[CHAIN_ID]
