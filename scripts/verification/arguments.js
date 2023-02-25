const { solution, contractName } = require('./verifyConfig')

const {
    requirements,
} = require(`../deployment/solution/${solution}/requirements`)
const requirement = requirements.filter(
    (el) => el.factoryName == contractName
)[0]
for (let i = 0; i < requirement.params.length; i++) {
    if (typeof requirement.params[i] == 'object') {
        requirement.params[i] = requirement.params[i].method(
            ...requirement.params[i].args
        )
    }
}
module.exports = requirement.params // constructor arguments
