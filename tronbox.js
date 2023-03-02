const port = process.env.HOST_PORT || 9090
const keys = require('./.keys.json')

module.exports = {
    networks: {
        mainnet: {
            privateKey: keys.PRIVATE_KEY_MAINNET,
            userFeePercentage: 100,
            feeLimit: 1000 * 1e6,
            fullHost: 'https://api.trongrid.io',
            network_id: '1',
        },
        shasta: {
            privateKey: keys.PRIVATE_KEY_SHASTA,
            userFeePercentage: 50,
            feeLimit: 1000 * 1e6,
            fullHost: 'https://api.shasta.trongrid.io',
            network_id: '2',
        },
        nile: {
            privateKey: keys.PRIVATE_KEY_NILE,
            userFeePercentage: 100,
            feeLimit: 1000 * 1e6,
            fullHost: 'https://api.nileex.io',
            network_id: '3',
        },
        development: {
            // For tronbox/tre docker image
            privateKey: keys.PRIVATE_KEY_NILE,
            userFeePercentage: 0,
            feeLimit: 1000 * 1e6,
            fullHost: 'http://127.0.0.1:' + port,
            network_id: '9',
        },
        compilers: {
            solc: {
                version: '0.8.6',
            },
        },
    },
    // solc compiler optimize
    solc: {
        //   optimizer: {
        //     enabled: true,
        //     runs: 200
        //   },
        //   evmVersion: 'istanbul'
    },
}
