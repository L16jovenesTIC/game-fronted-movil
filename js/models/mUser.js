define(['backbone', 'text!tmpl/intro.html', 'module'], function(Backbone, template, module){

	var user = Backbone.Model.extend({
		//urlRoot: window.urlServidor || module.config().urlServer+"/user/?f=ver",
		urlRoot: window.urlServidor + "/user/?f=ver",
		initialize:function(){
			
		},
		traeDatosFB: function(){
			var self = this
			// Recoge info para registrar usuario
			console.log('Recolectando Informacion ....');

			FB.api('/me?fields=id,name,email,link,gender', function(response) {
				self.set(response)
			});

			FB.api('/me/picture?type=square', function(response) {
				self.set({picsqr:response.data.url})
			});

			FB.api('/me/picture?type=normal', function(response) {
				self.set({picnrl:response.data.url})
			});

			FB.api('/me/picture?type=large', function(response) {
				self.set({piclgr:response.data.url})
			});

			FB.api('/me/picture?type=large&width=700&height=700', function(response) {
				self.set({picbig:response.data.url})
			});
		}
	})

	return user
})