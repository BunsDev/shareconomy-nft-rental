class Contract {
    constructor(_factoryName, _params, _verification, _selfInstructions) {
        this.factoryName = _factoryName
        this.params = _params
        this.verification = _verification
        this.selfInstructions = _selfInstructions
    }
}

module.exports = Contract
