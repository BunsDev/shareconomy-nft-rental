class Contract {
    constructor(_factoryName, _params, _selfInstructions) {
        this.factoryName = _factoryName
        this.params = _params
        this.selfInstructions = _selfInstructions
    }
}

module.exports = Contract
