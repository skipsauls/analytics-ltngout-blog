let fs = require('fs');
let express = require('express');
let https = require('https');
let http = require('http');
let app = express();

let port = process.env.PORT || 3000;
let https_port = process.env.HTTPS_PORT || parseInt(port) + 1;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	let domain = 'adx-dev-ed';
    let appId = process.env.EADX_APP_ID;
    res.render('public/index.html', {title: 'Einstein Analytics – Lightning Out', appId: appId, domain: domain});
});

app.get('/lo', function(req, res) {
	let domain = 'adx-dev-ed';
    let appId = process.env.EADX_APP_ID;
    res.render('pages/lo', {title: 'Einstein Analytics – Lightning Out', appId: appId, domain: domain});
});

let server = http.createServer(app).listen(port);
console.log("Server listening for HTTP connections on port " + port);

// Create an HTTPS service if the certs are present
try {
    let options = {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('key-cert.pem'),
      passphrase: process.env.EADX_KEY_PASSWORD
    };
    let secureServer = https.createServer(options, app).listen(https_port);
    console.log("Server listening for HTTPS connections on port " + https_port);
} catch (e) {
    console.error('Exception: ', e);
}
