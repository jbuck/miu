// Bring in all your require modules
var express = require( "express" ),
    habitat = require( "habitat" ),
    knox = require( "knox" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" ),
    persona = require( "express-persona" );

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

// Setup global middleware
app.use( express.logger());
// Always put the compression middleware high up in the chain
app.use( express.compress());
app.use( express.static( path.join( __dirname + "/public" )));
// bodyParser will parse "application/json", "application/x-www-form-urlencoded" and "multipart/form-data"
// requests and put the results on req.body and req.files. Handy!
// If you don't need to handle all three types then just use json(), urlencoded() or multipart() instead.
app.use( express.bodyParser());
// cookieParser will parse "Cookie" headers, and cookieSession adds signed (not secret!) cookies.
// The advantage is that the server doesn't need to look up data from the DB on every request.
// The disadvantage is that any data saved into the cookie is visible to the user.
app.use( express.cookieParser());
app.use( express.cookieSession({
  secret: env.get( "SECRET" ),
  cookie: {
    maxAge: 2678400000 // 31 days. Persona saves session data for 1 month
  },
  proxy: true
}));
// Attempt to use Express' routes defined below
app.use( app.router );
// Whenever you pass `next( someError )`, this middleware will handle it
app.use( middleware.errorHandler );

// Add Persona authentication
// Must be after app.use() calls, otherwise our middleware doesn't get executed!
persona( app, {
  audience: env.get( "HOSTNAME" )
});

// Express routes
app.get( "/", routes.index );
app.put( "/upload", middleware.isAuthenticated, middleware.uploadToS3( s3 ), routes.upload );

// Start up the server
app.listen( env.get( "PORT", 3000 ), function() {
  console.log( "MIU server listening (Probably http://localhost:%d )", env.get( "PORT", 3000 ));
});
