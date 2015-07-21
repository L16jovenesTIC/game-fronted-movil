define(['backbone', 'text!tmpl/nuevoGrupo.html'], function(Backbone, template){

	var ng = Backbone.View.extend({
		className:'nuevoGrupo row',
		events:{
			'click section button': 'boton'
		},
		boton: function(e) {
			e.preventDefault()
			var dat = this.$('form').serialize()
			Base.status.regEquipo(dat)
			//Base.app.navigate('#selupz', {trigger:true})
		},
		initialize:function(){
			//this.template = template
		}, 
		render:function(){
			//this.$el.html(this.template)
			this.$el.html(template)
			//this.$('.areaJuego').html(p.render().el)
			return this
		}
	})

	return ng
})