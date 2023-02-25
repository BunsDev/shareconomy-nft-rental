const fs = require('fs')
const hardhat = require('hardhat')

const deploy = require('./modules/deploy')
const storage = require('./modules/initStorage')
const freshContracts = {}
const oldContracts = require('./results/contracts.json')

function writeResult() {
    const today = new Date()
    fs.writeFileSync(
        `./scripts/deployment/results/contracts.json`,
        JSON.stringify(oldContracts)
    )
    fs.writeFileSync(
        `./scripts/deployment/results/result_${today.getTime()}.json`,
        JSON.stringify(freshContracts)
    )
}

async function main() {
    try {
        for (const obj of storage.container) {
            setTimeout(() => {}, 1000)
            for (let i = 0; i < obj.params.length; i++) {
                if (typeof obj.params[i] == 'object') {
                    obj.params[i] = obj.params[i].method(...obj.params[i].args)
                }
            }
            const contract = await deploy(obj.factoryName, obj.params ?? [])
            freshContracts[obj.factoryName] = contract
            oldContracts[obj.factoryName] = contract

            try {
                if (obj.verification) {
                    console.log('start verification')
                    await hardhat.run('verify:verify', {
                        address: contract.address,
                        constructorArguments: obj.params,
                    })
                }
            } catch (e) {
                console.log(e)
            }

            console.log('start self instructions')
            await obj.selfInstructions(oldContracts)
        }
    } catch (e) {
        console.error(e)
        writeResult()
    }
    writeResult()
}

main()
