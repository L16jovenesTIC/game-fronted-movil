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
			switch(this.model.get('tipo')){
				case 'GEO': 
					Base.status.nuevoRetoGeo(this.model.get('rid')).done(function(resp){
						if(resp.std == 200){
							self.model.set(resp.dat)
							//self.juego = new geolocalizador({model:self.model}); 
							self.juego = new geolocalizador({model:new Backbone.Model(resp.dat)}); 
							self.render()
						}else{
							Base.app.vModal.alerta(resp.msg)
						}
					})
				break;
				case 'SELF': 
					Base.status.nuevoRetoSelfie(this.model.get('rid')).done(function(resp){
						if(resp.std == 200){
							self.model.set(resp.dat)
							//self.juego = new selfie({model:self.model}); 
							self.juego = new selfie({model:new Backbone.Model(resp.dat)}); 
							self.render()
						}else{
							Base.app.vModal.alerta(resp.msg)
						}
					})
				break;
				case 'MULT': 
					Base.status.nuevoRetoMultiple(this.model.get('rid')).done(function(resp){
						if(resp.std == 200){
							self.model.set(resp.dat)
							//self.juego = new selecMultiple({model:self.model}); 
							self.juego = new selecMultiple({model:new Backbone.Model(resp.dat)}); 
							self.render()
						}else{
							Base.app.vModal.alerta(resp.msg)
						}
					})
				break;
				case 'REL': 
					Base.status.nuevoRetoRelacionar(this.model.get('rid')).done(function(resp){
						if(resp.std == 200){
							self.model.set(resp.dat)
							//self.juego = new relacionar({model:self.model}); 
							self.juego = new relacionar({model:new Backbone.Model(resp.dat)}); 
							self.render()
						}else{
							Base.app.vModal.alerta(resp.msg)
						}
					})
				break;
				case 'COMP': 
					Base.status.nuevoRetoCompletar(this.model.get('rid')).done(function(resp){
						if(resp.std == 200){
							self.model.set(resp.dat)
							//self.juego = new completar({model:self.model}); 
							self.juego = new completar({model:new Backbone.Model(resp.dat)}); 
							self.render()
						}else{
							Base.app.vModal.alerta(resp.msg)
						}
					})
				break;
				case 'PUZZ': 
					Base.status.nuevoRetoPuzzle(this.model.get('rid')).done(function(resp){
						if(resp.std == 200){
							self.model.set(resp.dat)
							//self.juego = new puzzle({model:self.model}); 
							self.juego = new puzzle({model:new Backbone.Model(resp.dat)}); 
							self.render()
						}else{
							Base.app.vModal.alerta(resp.msg)
						}
					})
				break;
			}
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