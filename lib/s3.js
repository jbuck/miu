module.exports = function( options ) {
  var AWS = require( "aws-sdk" );

  AWS.config.update({
    accessKeyId: options.accessKeyId,
    secretAccessKey: options.secretAccessKey,
    region: options.region
  });

  var s3 = new AWS.S3().client;

  return s3;
};
