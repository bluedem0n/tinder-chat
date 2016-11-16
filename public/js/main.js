window.fbAsyncInit = function () {
		FB.init({
			appId: '138128546657924',
			cookie: true,
			xfbml: true,
			version: 'v2.8'
		});

		FB.getLoginStatus(function (response) {
			statusChangeCallback(response);
		});

	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

  FB.Event.subscribe('auth.statusChange', function (response) {
    if (response.authResponse) {
      FB.api('/me', function (me) {
        if (me.name) {

          var plantilla = '<li>' +
            '<div class="contacto">' +
            '<div>' +
            '<div>__foto__</div>' +
            '<span class="nombre">__nombre__</span>' +
            '</div>' +
            '</div>' +
            '</li>';

          var agregar = "";

          agregar += plantilla.replace("__nombre__", me.name)
            .replace("__foto__", '<img src="https://graph.facebook.com/' + me.id + '/picture">')

          $("#contactos").append(agregar);
        }
      })
    } else {
      window.location = "index.html";
    }
  });
  document.getElementById('salir').addEventListener('click', function (e) {
    e.preventDefault();
    FB.logout();
  });
}