// Isn't it awesome how simple these rendering functions are?
// Let combinations of middleware handle the heavy lifting for you
module.exports = {
  index: function( req, res ) {
    res.render( "index.html", { email: req.session.email });
  },
  upload: function( req, res ) {
    res.send( 200 );
  }
};
