function parseTokenString(tokenString) {
	return tokenString
}

function updateTransferData(state, payload, blockInfo, context) {
	state.entry = payload.data
	state.totalEntries += 1
}

const updaters = [
	{
		actionType: 'abcde::updateround',
		updater: updateTransferData,
	},
	{
		actionType: 'abcde::newround',
		updater: updateTransferData,
	},
]

module.exports = updaters