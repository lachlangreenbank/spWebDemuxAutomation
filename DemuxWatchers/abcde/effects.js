var AWS = require('aws-sdk');
AWS.config.update({
region: 'eu-west-2',
endpoint: 'http://localhost:8000'
});
var docClient = new AWS.DynamoDB.DocumentClient()
var table = 'Entrys';
var dynamodb = new AWS.DynamoDB();

function logUpdate(state, payload, blockInfo, context) {
	var d = new Date();
	var n = d.getTime();

	console.info('State updated:', JSON.stringify(state, null, 2))
var params = {
TableName: table,
Item: {
'eid': state.indexState.blockHash,
'account_name': 'lachlan'
}
};
docClient.put(params, function(err, data) {
if (err) {
console.error('Unable to add contract', table, '. Error JSON:', JSON.stringify(err, null, 2));
} else {
console.log('PutItem succeeded:', table);
}
});}

const effects = [
	{
		actionType: 'abcde::updateround',
		effect: logUpdate,
	},
	{
		actionType: 'abcde::newround',
		effect: logUpdate,
	},
]

module.exports = effects