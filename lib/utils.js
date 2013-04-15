var http = require( "http" );

// error() function used from senchalabs/connect
exports.error = function( code, msg ) {
  var err = new Error( msg || http.STATUS_CODES[ code ]);
  err.status = code;
  return err;
};
