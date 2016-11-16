window.addEventListener("load",function(){
	function statusChangeCallback(response) {
		if (response.status === 'connected') {
			loginAPI();
			friendAPI();
		} 
	}

	function checkLoginState() {
		FB.getLoginStatus(function (response) {
			statusChangeCallback(response);
		});
	}
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

	function loginAPI() {
		console.log('Bienvenido!  Buscamos su informacion .... ');
		FB.api('/me', function (response) {
			document.getElementById('status').innerHTML = 'Hola, ' + response.name + '<br>' + 'Bienvenido a Tinder';
			document.getElementById('user-picture').innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">';
			window.localStorage.setItem("idImg",response.id);
		});
	}

	function friendAPI() {
		document.getElementById('user-friends').innerHTML = 'before';
		FB.api('me/friends?fields=id', function (response) {
			if (!response.error) {
				var markup = 'Amigos que usan esta app: ';
				var friends = response.data;
				var a = {};
				for (var i = 0; i < friends.length && i < 25; i++) {
					var friend = friends[i];
					markup += '<img src="https://graph.facebook.com/' + friend.id + '/picture">';
					a[i] = friend.id;
				}
				window.localStorage.setItem("array", JSON.stringify(a));
				document.getElementById('user-friends').innerHTML = markup;
			} else {
				document.getElementById('user-friends').innerHTML = 'after';
			}
		});
	}
	checkLoginState();
});