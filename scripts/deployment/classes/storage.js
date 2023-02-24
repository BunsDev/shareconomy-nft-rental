const Contract = require('../classes/contract')
const { solution } = require('../deployConfig')
const {
    requirementsName,
    requirements,
} = require(`../solution/${solution}/requirements`)

class Storage {
    container = new Array()
    constructor() {
        requirementsName.forEach((name) => {
            const requirement = requirements.filter(
                (el) => el.factoryName == name
            )[0]
            const contract = new Contract(
                requirement.factoryName,
                requirement.params,
                requirement.selfInstruction
            )
            this.container.push(contract)
        })
    }
}

module.exports = Storage
