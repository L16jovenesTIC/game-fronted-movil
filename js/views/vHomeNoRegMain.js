define(['backbone', 'text!tmpl/homeNoReg.html'], function(Backbone, template){

	var noReg = Backbone.View.extend({
		className:'row homenoreg-login',
		events:{
			'click footer>img': 'boton'
		},
		boton: function(e) {
			e.preventDefault()

			FB.login(function(response) {
				if (response.authResponse) {
					console.log('Welcome!  Fetching your information.... ');
					
					Base.app.navigate('#homegame', {trigger:true})
				} else {
					console.log('User cancelled login or did not fully authorize.');
				}
			},{
				scope: 'public_profile,email,user_friends',
				return_scopes: true
			});
		},
		initialize:function(){
			//this.template = template
		}, 
		render:function(){
			//this.$el.html(this.template)
			this.$el.html(template)
			return this
		}
	})

	return noReg
})