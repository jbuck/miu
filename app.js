// Bring in all your require modules
var express = require( "express" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" );

var app = express(),
    env = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname + '/views' )));
    routes = require( "./routes" );

// Enable template rendering with nunjucks
env.express( app );
// Don't send the "X-Powered-By: Express" header
app.disable( "x-powered-by" );

app.use( express.logger());
app.use( express.compress());
app.use( express.static( path.join( __dirname + "/public" )));

app.get( "/", routes.index );

app.listen( 3000, function() {
  console.log( "MIU server listening on port %d", 3000 );
});
