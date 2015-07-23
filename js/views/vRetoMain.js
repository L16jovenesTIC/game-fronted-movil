define(['backbone', 'text!tmpl/reto.html', 'views/Retos/vPuzzle', 'views/Retos/vRetoCompletar'], function(Backbone, template, puzzle, completar){

	var retoSup = Backbone.View.extend({
		className:'retoMain row',
		events:{
			'click header>img': 'boton'
		},
		boton: function(e) {
			e.preventDefault()
			//Base.app.navigate('#selupz', {trigger:true})
		},
		initialize:function(){
			//this.template = template
			p = new puzzle()
			//p = new completar()
		}, 
		render:function(){
			//this.$el.html(this.template)
			this.$el.html(template)
			this.$('.areaJuego').html(p.render().el)
			return this
		}
	})

	return retoSup
})