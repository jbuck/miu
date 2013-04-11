(function() {
  var drop = document.querySelector( ".dnd" ),
      select = document.querySelector( ".select" );

  drop.addEventListener( "dragover", function( event ) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  });

  var fileHandler = function( event ) {
    event.stopPropagation();
    event.preventDefault();

    var files = [];
    for ( var i = 0; i < event.dataTransfer.files.length; i++ ) {
      files.push( event.dataTransfer.files[ i ]);
    }

    files.forEach(function( f ) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener( "progress", function( event ) {
        if ( event.lengthComputable ) {
          console.log( "%d%% complete", oEvent.loaded / oEvent.total * 100 );
        }
      });
      xhr.addEventListener( "load", function() {
        console.log( "Done uploading %s", f.name );
      });
      xhr.open( "PUT", "/upload", false );
      xhr.send( f );
    });

  };

  drop.addEventListener( "drop", fileHandler );
  //select.addEventListener( "change", fileHandler );
}());
