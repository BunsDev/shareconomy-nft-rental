let ERC20 = artifacts.require('ERC20')

module.exports = function (deployer) {
    deployer.deploy(
        ERC20,
        '1000000000000000000000000000000',
        'ERC20',
        '18',
        'ERC20'
    )
}
