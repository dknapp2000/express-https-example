const express = require('express');
const http    = require('http');
const https   = require('https');
const fs      = require('fs');
const path    = require( "path" );

const httpPort = 8000;
const httpsPort = 3000;

const sslOptions = {
    key: fs.readFileSync(path.join( __dirname, "certs", 'key.pem') ),
    cert: fs.readFileSync(path.join( __dirname, "certs", 'cert.pem') ),
    passphrase: "stuffnnonsense"
};

server = express();

server.get('/', function (req, res) {
    res.send("Hello World!");
});

http.createServer(server).listen(httpPort, _ => {
    console.log( "Listening HTTP on " + httpPort );
});

https.createServer(sslOptions, server).listen(httpsPort, _ => {
    console.log( "Listening HTTPS on " + httpsPort );
})

