define(['backbone', 'text!tmpl/nuevoRetoUpz.html'], function(Backbone, template){

	var nuevoReto = Backbone.View.extend({
		className:'nuevoReto',
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

	return nuevoReto
})