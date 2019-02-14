function parseTokenString(tokenString) {
	return tokenString
}

function updateTransferData(state, payload, blockInfo, context) {
	state.entry = payload.data
	state.totalEntries += 1
}

const updaters = [
	{
		actionType: 'enjoybetgame::updateround',
		updater: updateTransferData,
	},
	{
		actionType: 'enjoybetgame::newround',
		updater: updateTransferData,
	},
]

module.exports = updaters