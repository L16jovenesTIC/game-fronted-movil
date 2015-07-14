define(['backbone', 'text!tmpl/reto.html'], function(Backbone, template){

	var retoSup = Backbone.View.extend({
		className:'retoMain',
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

	return retoSup
})