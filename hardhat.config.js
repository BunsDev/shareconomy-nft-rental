/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-waffle')
const fs = require('fs')

const tasks = fs.readdirSync('./tasks')
tasks.forEach((task) => {
    require(`./tasks/${task}`)
})

const config = require('./config.js').hardhat
config.solidity = '0.8.17'
config.mocha = {
    timeout: 100000000,
}
module.exports = config
