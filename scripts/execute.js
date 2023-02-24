function find(prefix, files) {
	for (let i = 0; i < files.length; i++) {
		if (files[i].split('.')[1] == 'sol') {
			buildedNames.push(`${prefix}/${files[i].split('.')[0]}.json`)
			buildedPaths.push(`${PATH}${prefix}/${files[i]}/${files[i].split('.')[0]}.json`)
		} else {
			let underFiles
			if (prefix == '') {
				underFiles = readdirSync(`${PATH}/${files[i]}`)
			} else {
				underFiles = readdirSync(`${PATH}/${prefix}/${files[i]}`)
			}
			find(`${prefix}/${files[i]}`, underFiles)
		}
	}
}

const { readFileSync, writeFileSync, readdirSync, mkdirSync } = require('fs')

try {
	mkdirSync('./interfaces')
} catch {}

const PATH = './artifacts/contracts'

const files = readdirSync(PATH)

let buildedNames = []
let buildedPaths = []

find('', files)

for (let i = 0; i < buildedPaths.length; i++) {
	const content = JSON.parse(readFileSync(buildedPaths[i]))
	try {
		writeFileSync(`./interfaces${buildedNames[i]}`, JSON.stringify(content.abi, '', 3))
	} catch {
		let created = ''
		let param = `./interfaces${buildedNames[i]}`.split('/')
		for (let i = 2; i < param.length - 1; i++) {
			created = `${created}/${param[i]}`
			try {
				mkdirSync(`./interfaces${created}`)
			} catch {}
		}
		writeFileSync(`./interfaces${buildedNames[i]}`, JSON.stringify(content.abi, '', 3))
	}
}
