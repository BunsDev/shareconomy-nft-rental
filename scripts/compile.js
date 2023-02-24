const { exec } = require('child_process')

function log(error, stdout, stderr) {
	if (error) {
		console.error(error)
	}
	if (stdout) {
		console.log(stdout)
	}
	if (stderr) {
		console.log(stderr)
	}
}

exec('npx hardhat compile', (error, stdout, stderr) => {
	log(error, stdout, stderr)
	exec('node ./scripts/execute.js', (error, stdout, stderr) => {
		log(error, stdout, stderr)
	})
})
