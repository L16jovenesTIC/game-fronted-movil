define(['backbone', 'text!tmpl/reto.html', 
	'views/Retos/vPuzzle', 
	'views/Retos/vRetoCompletar', 
	'views/Retos/vRetoGeo', 
	'views/Retos/vRetoSelMul', 
	'views/Retos/vRetoSelfie', 
	'views/Retos/vRetoRelacionar'], 
function(Backbone, template, puzzle, completar, geolocalizador, selecMultiple, selfie, relacionar){

	var retoMain = Backbone.View.extend({
		className:'retoMain',
		events:{
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
			// Modelo de reto 
			//this.listenTo(this.model, 'change', this.render)

			switch(this.model.get('tipo')){
				case 'geo': this.juego = new geolocalizador({model:this.model}); break;
				case 'selfie': this.juego = new selfie({model:this.model}); break;
				default: this.juego = new puzzle({model:this.model}); break;

			}
			//p = new puzzle()
			//p = new completar()
			//p = new geolocalizador()
			//p = new selecMultiple()
			//p = new relacionar()
			//p = new selfie()
		},
		template: function(data){
			return _.template(template)(data)
		}, 
		render:function(){
			//this.$el.html(this.template)
			//console.log(this.model.toJSON())
			this.$el.html(this.template({dat:this.model.toJSON()}))
			this.$('.areaJuego').html(this.juego.render().el)
			//this.$('.help').html(this.model.get('help'))
			return this
		}
	})

	return retoMain
})