define(['backbone', 'text!tmpl/reto.html', 
	'views/Retos/vPuzzle', 
	'views/Retos/vRetoCompletar', 
	'views/Retos/vRetoGeo', 
	'views/Retos/vRetoSelMul', 
	'views/Retos/vRetoSelfie', 
	'views/Retos/vRetoRelacionar'], 
function(Backbone, template, puzzle, completar, geolocalizador, selecMultiple, selfie, relacionar){

	var retoSup = Backbone.View.extend({
		className:'retoMain',
		events:{
			'click header>img': 'boton',
			'click .cancelarReto': 'cancelarReto'
		},
		boton: function(e) {
			e.preventDefault()
			//Base.app.navigate('#selupz', {trigger:true})
		},
		cancelarReto:function(e){
			e.preventDefault()
			console.log('cancelar reto')
			Base.app.vModal.modalCancelarReto()
			Base.app.vModal.$el.modal('show')
		},
		initialize:function(){
			//this.template = template
			if(!this.model){
				Base.app.navigate('#error', {trigger:true})
			}

			switch(this.model.get('tipo')){
				case 'geo': this.juego = new geolocalizador(); break;
				case 'selfie': this.juego = new selfie(); break;
				default: this.juego = new puzzle(); break;

			}
			//p = new puzzle()
			//p = new completar()
			//p = new geolocalizador()
			//p = new selecMultiple()
			//p = new relacionar()
			//p = new selfie()
		}, 
		render:function(){
			//this.$el.html(this.template)
			this.$el.html(template)
			this.$('.areaJuego').html(this.juego.render().el)
			return this
		}
	})

	return retoSup
})