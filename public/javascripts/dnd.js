(function() {
  var drop = document.querySelector( ".dnd" ),
      select = document.querySelector( ".select" ),
      uploaded = document.querySelector( ".uploaded" );

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
      var fd = new FormData();

      fd.append( "image", f );

      xhr.addEventListener( "progress", function( event ) {
        if ( event.lengthComputable ) {
          console.log( "%d%% complete", oEvent.loaded / oEvent.total * 100 );
        }
      });
      xhr.addEventListener( "load", function() {
        if (this.status != 200) {
          return;
        }

        var url = JSON.parse( this.responseText ).url;

        console.log( "Done uploading %s", f.name );
        var li = document.createElement( "li" );
        li.innerHTML = "<a href='" + url + "'>" + url + "</a>";
        uploaded.appendChild(li);
      });
      xhr.open( "PUT", "/upload", false );
      xhr.send( fd );
    });

  };

  drop.addEventListener( "drop", fileHandler );
  //select.addEventListener( "change", fileHandler );
}());
