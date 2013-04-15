var utils = require( "./utils" );

exports.errorHandler = function( err, req, res, next ) {
  res.send( err.status );
};

exports.isAuthenticated = function( req, res, next ) {
  if ( req.session.email ) {
    return next();
  }

  next( utils.error( 403 ));
};

exports.uploadToS3 = function( s3 ) {
  return function( req, res, next ) {
    var file = req.files.image;

    s3.putFile( file.path, '/' + file.name, {
      'Content-Type': file.type,
      'x-amz-acl': 'public-read'
    }, function( err, data ) {
      next( err );
    });
  };
};
