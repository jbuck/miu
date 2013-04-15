module.exports = {
  index: function( req, res ) {
    res.render( "index.html", { email: req.session.email });
  },
  upload: function( req, res ) {
    res.send( 200 );
  }
};
