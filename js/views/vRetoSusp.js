define(['backbone', 'text!tmpl/retoSuspendido.html'], function(Backbone, template){

	var retoSus = Backbone.View.extend({
		className:'retoSusp',
		events:{
			'click header>img': 'boton'
		},
		boton: function(e) {
			e.preventDefault()
			//Base.app.navigate('#selupz', {trigger:true})
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

	return retoSus
})