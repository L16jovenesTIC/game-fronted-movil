define(['backbone', 'text!tmpl/reto.html', 
	'views/Retos/vPuzzle', 
	'views/Retos/vRetoCompletar', 
	'views/Retos/vRetoGeo', 
	'views/Retos/vRetoSelMul'], 
function(Backbone, template, puzzle, completar, geolocalizador, selecMultiple){

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
			//p = new puzzle()
			//p = new completar()
			//p = new geolocalizador()
			p = new selecMultiple()
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