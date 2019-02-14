var shell = require('shelljs')
var ncp = require('ncp').ncp;
 
ncp.limit = 16;

const ACCOUNT = process.argv[2]
const ABI = process.argv[3]

var promise = new Promise(function(resolve, reject) {
  ncp('./copy/', './DemuxWatchers/' + ACCOUNT + '/', function (err) {
    if (err) {
  	  reject(Error(err))
    } else {
      setTimeout(function () {
      	console.log("bang")
      	resolve('done');
      }, 1000)
    }
  })
});

promise.then(function(result) {
  shell.exec('node ' + 'DemuxWatchers/' + ACCOUNT + '/build.js ' + ACCOUNT + ' ' + ABI, function(code, stdout, stderr) {
    shell.echo('Built Files');
    shell.cd('DemuxWatchers/' + ACCOUNT);
    shell.exec('npm i')
    shell.exec('npm run start')
    shell.echo('Started server');
    shell.exit(1);
  });
}, function(err) {
  console.log(err); // Error: "It broke"
});
