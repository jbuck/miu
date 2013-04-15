(function() {
  var cookieEmail = document.querySelector( "meta[name=persona-email]" ).content,
      loggedIn = false,
      personaButton = document.querySelector( ".persona-button" );

  function setLoggedIn( email ) {
    loggedIn = true;
    personaButton.querySelector( "span" ).innerHTML = "Logout " + email;
  }

  if ( cookieEmail ) {
    setLoggedIn( cookieEmail );
  }

  personaButton.addEventListener( "click", function() {
    if ( !loggedIn ) {
      navigator.id.request();
    } else {
      navigator.id.logout();
    }
  });

  navigator.id.watch({
    loggedInUser: cookieEmail ? cookieEmail : null,
    onlogin: function( assertion ) {
    var xhr = new XMLHttpRequest();
      xhr.open("POST", "/persona/verify", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.addEventListener("loadend", function(e) {
        var data = JSON.parse(this.responseText);
        if (data && data.status === "okay") {
          setLoggedIn( data.email );
        }
      }, false);

      xhr.send(JSON.stringify({
        assertion: assertion
      }));
    },
    onlogout: function() {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/persona/logout", true);
      xhr.send();

      loggedIn = false;
      personaButton.querySelector( "span" ).innerHTML = "Sign in with your Email";
    }
  });
}());
