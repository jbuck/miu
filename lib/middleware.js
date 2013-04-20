var utils = require( "./utils" );

// Bare minimum error handling page
// Ideally you'd render a user-friendly error page
// Need to figure out best way to handle API vs user-facing error handlers
exports.errorHandler = function( err, req, res, next ) {
  res.send( err.status );
};

// This is a really simple but common middleware. If the user is logged in,
// then pass the request to the next middleware. If not, then let the error
// handler handle the 403 Forbidder error somehow.
// Don't render responses inside your middleware functions!
exports.isAuthenticated = function( req, res, next ) {
  if ( req.session.email ) {
    return next();
  }

  next( utils.error( 403 ));
};

// This middleware should really attach some data about the successful upload
// Again, not sure of the best way to do this. But resist the temptation to
// render responses inside your middleware functions!
exports.uploadToS3 = function( s3 ) {
  return function( req, res, next ) {
    var file = req.files.image,
        s3Path = '/' + req.session.email + '/' + file.name;

    s3.putFile( file.path, s3Path, {
      'Content-Type': file.type,
      'x-amz-acl': 'public-read'
    }, function( err, data ) {
      if ( err ) {
        next( err );
      }

      req.s3Url = "https://" + s3.endpoint + s3Path;
      next();
    });
  };
};
