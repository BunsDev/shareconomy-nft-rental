/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-waffle')
const fs = require('fs')

const tasks = fs.readdirSync('./tasks')
tasks.forEach((task) => {
    require(`./tasks/${task}`)
})

const config = require('./config.js').hardhat
module.exports = {
    solidity: '0.8.1',
    defaultNetwork: config.defaultNetwork,
    networks: config.networks,
    mocha: {
        timeout: 100000000,
    },
}
