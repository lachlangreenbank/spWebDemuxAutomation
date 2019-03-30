function parseTokenString(tokenString) {
	return tokenString
}

function updateTransferData(state, payload, blockInfo, context) {
	state.entry = payload.data
	state.totalEntries += 1
}

const updaters = [
	{
		actionType: 'smartpress::transfer',
		updater: updateTransferData,
	},
	{
		actionType: 'smartpress::issue',
		updater: updateTransferData,
	},
	{
		actionType: 'smartpress::create',
		updater: updateTransferData,
	},
]

module.exports = updaters