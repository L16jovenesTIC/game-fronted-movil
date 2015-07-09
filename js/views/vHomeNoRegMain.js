define(['backbone', 'text!tmpl/homeNoReg.html'], function(Backbone, template){

	var noReg = Backbone.View.extend({
		className:'row homenoreg-login',
		events:{
			'click footer>img': 'boton'
		},
		boton: function(e) {
			e.preventDefault()
			alert('Entra face')
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