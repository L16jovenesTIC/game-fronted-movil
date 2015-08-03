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
			var self = this

			// Modelo de reto 
			//this.listenTo(this.model, 'change', this.render)
			switch(this.model.get('tipo')){
				case 'geo': 
					Base.status.nuevoRetoGeo().done(function(resp){
						if(resp.std == 200){
							self.model.set(resp.dat)
							self.juego = new geolocalizador({model:self.model}); 
							self.render()
						}else{
							Base.app.vModal.alerta(resp.msg)
						}
					})
				break;
				case 'selfie': 
					//this.juego = new selfie({model:this.model});
					Base.status.nuevoRetoSelfie().done(function(resp){
						if(resp.std == 200){
							self.model.set(resp.dat)
							self.juego = new selfie({model:self.model}); 
							self.render()
						}else{
							Base.app.vModal.alerta(resp.msg)
						}
					})
				break;
				case 'MULT': 
					Base.status.nuevoRetoMultiple().done(function(resp){
						if(resp.std == 200){
							self.model.set(resp.dat)
							self.juego = new selecMultiple({model:self.model}); 
							self.render()
						}else{
							Base.app.vModal.alerta(resp.msg)
						}
					})
				break;
				case 'REL': 
					Base.status.nuevoRetoRelacionar().done(function(resp){
						if(resp.std == 200){
							self.model.set(resp.dat)
							self.juego = new relacionar({model:self.model}); 
							self.render()
						}else{
							Base.app.vModal.alerta(resp.msg)
						}
					})
				break;
				case 'COMP': 
					Base.status.nuevoRetoCompletar().done(function(resp){
						if(resp.std == 200){
							self.model.set(resp.dat)
							self.juego = new completar({model:self.model}); 
							self.render()
						}else{
							Base.app.vModal.alerta(resp.msg)
						}
					})
				break;
				case 'PUZZ': 
					Base.status.nuevoRetoPuzzle().done(function(resp){
						if(resp.std == 200){
							self.model.set(resp.dat)
							self.juego = new puzzle({model:self.model}); 
							self.render()
						}else{
							Base.app.vModal.alerta(resp.msg)
						}
					})
				break;
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
			this.$el.html(this.template({dat:this.model.toJSON()}))
			if(this.juego)
				this.$('.areaJuego').html(this.juego.render().el)
			return this
		}
	})

	return retoMain
})