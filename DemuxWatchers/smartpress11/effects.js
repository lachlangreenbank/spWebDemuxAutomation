var AWS = require('aws-sdk');
const entryTableCredentials = require('../../secrets/EntrysTableCred')

AWS.config.update({
	region: 'us-east-2',
	endpoint: 'dynamodb.us-east-2.amazonaws.com',
	accessKeyId: entryTableCredentials.accessKey,
	secretAccessKey: entryTableCredentials.secretKey
});
var docClient = new AWS.DynamoDB.DocumentClient()
var account = 'smartpress11';
var table = 'Entrys';
var dynamodb = new AWS.DynamoDB();

function logUpdate(state, payload, blockInfo, context) {
	var d = new Date();
	var n = d.getTime();

	console.info('State updated:', JSON.stringify(state, null, 2))
var params = {
	TableName: table,
	Item: {
		...state.entry,
		'event_id': state.indexState.blockHash,
		'contract_id': account,
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
		actionType: 'smartpress11::transfer',
		effect: logUpdate,
	},
	{
		actionType: 'smartpress11::issue',
		effect: logUpdate,
	},
	{
		actionType: 'smartpress11::create',
		effect: logUpdate,
	},
]

module.exports = effects