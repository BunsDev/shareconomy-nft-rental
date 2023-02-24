const contracts = require('../results/contracts.json')

function getAddress(conName) {
    const con = contracts[conName]
    if (con) {
        return con.address
    } else {
        return null
    }
}

module.exports.getAddress = getAddress
