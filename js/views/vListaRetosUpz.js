define(['backbone', 'text!tmpl/listaRetosUpz.html'], function(Backbone, template){

	var listRetos = Backbone.View.extend({
		className:'listRetosUpz',
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

	return listRetos
})