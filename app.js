// Bring in all your require modules
var express = require( "express" ),
    habitat = require( "habitat" ),
    knox = require( "knox" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" );

// Load config from ".env"
habitat.load();

// Generate app variables
var app = express(),
    env = new habitat(),
    middleware = require( "./lib/middleware" ),
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname + '/views' )));
    routes = require( "./routes" ),
    s3 = knox.createClient({
      key: env.get("AWS_KEY"),
      secret: env.get("AWS_SECRET"),
      region: env.get("AWS_REGION"),
      bucket: env.get("AWS_BUCKET")
    });

// Enable template rendering with nunjucks
nunjucksEnv.express( app );
// Don't send the "X-Powered-By: Express" header
app.disable( "x-powered-by" );

app.use( express.logger());
app.use( express.compress());
app.use( express.static( path.join( __dirname + "/public" )));
app.use( express.bodyParser());

app.get( "/", routes.index );
app.put( "/upload", middleware.uploadToS3( s3 ), routes.upload );

app.listen( env.get( "PORT", 3000 ), function() {
  console.log( "MIU server listening (Probably http://localhost:%d )", env.get( "PORT", 3000 ));
});
