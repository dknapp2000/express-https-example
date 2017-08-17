'use strict';

const port       = 3000;
const express    = require( "express" );
// const enforceSSL = require( "express-enforces-ssl" );
const morgan     = require( "morgan" );
const helmet     = require( "helmet" );
const ms         = require( "ms" );
const fs         = require( "fs" );
const https      = require( "https" );

const app = express();
app.use(helmet.hsts({
    maxAge: ms("1 year"),
    includeSubdomains: true
}));;
// app.enable("trust proxy");
// app.use(enforceSSL());
app.use( morgan( "common" ));

app.get( "/", function( req, res ) {
    console.log( "Get to /" );
    res.json( { status: "OK", port: port } );
})

app.listen( port, function() {
    console.log( "Listening on " + port );
})

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(port, function() {
    console.log( "Listening on " + port );
});
