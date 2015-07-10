define(['backbone', 'text!tmpl/homeGame.html'], function(Backbone, template){

	var home = Backbone.View.extend({
		className:'row homegame',
		events:{
			'click header>img': 'boton'
		},
		boton: function(e) {
			e.preventDefault()
			Base.app.navigate('#selupz', {trigger:true})
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

	return home
})