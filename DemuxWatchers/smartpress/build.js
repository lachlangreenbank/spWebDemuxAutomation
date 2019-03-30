var fs = require('fs')

var TAB = "\t"
var BREAK = "\r\n"

const ACCOUNT = process.argv[2]
const ABI = process.argv[3]

// Get teh abi
let abi
try {  
    var data = fs.readFileSync(ABI, 'utf8');
    abi = JSON.parse(data)
} catch(e) {
    console.log('Error:', e.stack);
}
 
// get contract actions
let actions = abi.actions

// build a updater for each action
let ActionInsert1 = ""
for (let i = 0; i < actions.length; i++) {
  ActionInsert1 = ActionInsert1 + 
    TAB + "{" + BREAK +
    TAB + TAB +   "actionType: '" + ACCOUNT + "::" + actions[i].name + "'," + BREAK +
    TAB + TAB +   "updater: updateTransferData," + BREAK +
    TAB + "}," + BREAK
}

const createUpdatersJsFile = function (params) {

  return new Promise(function (resolve, reject) {

    let updatersJs = "function parseTokenString(tokenString) {" + BREAK +
       TAB + "return tokenString" + BREAK +
      "}" + BREAK + BREAK +

      "function updateTransferData(state, payload, blockInfo, context) {" + BREAK +
       TAB +  "state.entry = payload.data" + BREAK +
       TAB +  "state.totalEntries += 1" + BREAK +
      "}" + BREAK + BREAK +

      "const updaters = [" + BREAK +
        ActionInsert1 +
      "]" + BREAK + BREAK +

      "module.exports = updaters";

    
    fs.writeFile("./DemuxWatchers/" + ACCOUNT + "/updaters.js", updatersJs, function (err) {
      if (err) {
        reject(err)
      }
      console.log("File sucessfully saved")
      resolve(true)
    })
  })  
}

// build a updater for each action
let ActionInsert2 = ""
for (let i = 0; i < actions.length; i++) {
  ActionInsert2 = ActionInsert2 + 
    TAB + "{" + BREAK +
    TAB + TAB +   "actionType: '" + ACCOUNT + "::" + actions[i].name + "'," + BREAK +
    TAB + TAB +   "effect: logUpdate," + BREAK +
    TAB + "}," + BREAK
}

const createEffectsJsFile = function (params) {

  return new Promise(function (resolve, reject) {

    let effectsJs = "var AWS = require('aws-sdk');" + BREAK +
      "AWS.config.update({" + BREAK +
        "region: 'eu-west-2'," + BREAK +
        "endpoint: 'http://localhost:8000'" + BREAK +
      "});" + BREAK +
      "var docClient = new AWS.DynamoDB.DocumentClient()" + BREAK +
      "var account = 'smartpress11';" + BREAK +
      "var table = 'Entrys';" + BREAK +
      "var dynamodb = new AWS.DynamoDB();" + BREAK + BREAK +

      "function logUpdate(state, payload, blockInfo, context) {" + BREAK +
      TAB + "var d = new Date();" + BREAK +
      TAB + "var n = d.getTime();" + BREAK + BREAK +
      TAB + "console.info('State updated:', JSON.stringify(state, null, 2))" + BREAK +
       
      "var params = {" + BREAK +
        "TableName: table," + BREAK +
        "Item: {" + BREAK +
            "'eid': state.indexState.blockHash," + BREAK +
            "'account_name': account" + BREAK +
        "}" + BREAK +
      "};" + BREAK +
      "docClient.put(params, function(err, data) {" + BREAK +
        "if (err) {" + BREAK +
           "console.error('Unable to add contract', table, '. Error JSON:', JSON.stringify(err, null, 2));" + BREAK +
        "} else {" + BREAK +
           "console.log('PutItem succeeded:', table);" + BREAK +
        "}" + BREAK +
      "});" +


    "}" + BREAK + BREAK +

    "const effects = [" + BREAK +
      ActionInsert2 +
    "]" + BREAK + BREAK +

    "module.exports = effects";

    
    fs.writeFile(("./DemuxWatchers/" + ACCOUNT + "/effects.js"), effectsJs, function (err) {
      if (err) {
        reject(err)
      }
      console.log("File sucessfully saved")
      console.log("./DemuxWatchers/" + ACCOUNT + "/effects.js")
      resolve(true)
    })
  })  
}

// Initiate build fucntions
createUpdatersJsFile()
createEffectsJsFile()

