module.exports = {
  index: function( req, res ) {
    res.render( "index.html" );
  },
  upload: function( req, res ) {
    res.send( 200 );
  }
};
