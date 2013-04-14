// Bring in all your require modules
var express = require( "express" ),
    habitat = require( "habitat" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" );

// Load config from ".env"
habitat.load();

// Generate app variables
var app = express(),
    env = new habitat(),
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname + '/views' )));
    routes = require( "./routes" );

// Enable template rendering with nunjucks
nunjucksEnv.express( app );
// Don't send the "X-Powered-By: Express" header
app.disable( "x-powered-by" );

app.use( express.logger());
app.use( express.compress());
app.use( express.static( path.join( __dirname + "/public" )));

app.get( "/", routes.index );
app.put( "/upload", routes.upload );

app.listen( env.get( "port", 3000 ), function() {
  console.log( "MIU server listening (Probably http://localhost:%d )", env.get( "port", 3000 ));
});
