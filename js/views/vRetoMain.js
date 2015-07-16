define(['backbone', 'text!tmpl/reto.html', 'views/vPuzzle'], function(Backbone, template, puzzle){

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
			p = new puzzle()
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