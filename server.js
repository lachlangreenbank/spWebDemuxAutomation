const express = require('express')
const app = express()
const port = 3000

var shell = require('shelljs')

app.get('/one', (req, res) => {
	shell.exec('node build abcde ./enjoybetgame.abi', function(code, stdout, stderr) {
		res.send('Hello World!')
	})
})

app.get('/two', (req, res) => {
	shell.exec('node build enjoybetgame ./enjoybetgame.abi', function(code, stdout, stderr) {
		res.send('Hello World!')
	})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))