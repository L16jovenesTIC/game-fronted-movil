define(['backbone'], function(Backbone){

	var ng = Backbone.View.extend({
		className:'retoCompletar col-xs-12',
		events:{
			'click button:eq(0)': 'enviarRespuesta',
			'click button:eq(1)': 'volverUPZ'
		},
		volverUPZ:function(e){
			e.preventDefault()
			Base.app.navigate('#selupz', {trigger:true})
		},
		enviarRespuesta: function(e) {
			e.preventDefault()
			var self = this
			var resp = this.$('#form-retoCompletar').serialize()

			Base.status.validaReto({type:"valcomp", rid:this.model.get('rid'), resp:resp}).done(function(resp){
	        	// Reto Suspendido
	        	if(resp.std == 48){
	        		self.trigger('retoSusp', {time:resp.dat.time,rid:self.model.get('rid')})
	        	}
	        	else if(resp.std == 200) // Reto Superado
	        		self.trigger('retoSup', {})
	        })
			//Base.app.navigate('#selupz', {trigger:true})
		},
		initialize:function(){
			//this.template = template
			//this.frase = 'Este río nace en el páramo @ bajando por el cerro de @ y confluye por debajo de la tierra con el rio';
			//this.dat = this.model.toJSON()
		}, 
		template: function(){
			//var frase = this.frase.split('@')
			var frase = this.model.get('frase').split('@')
			var str = '<form action="#" id="form-retoCompletar"><p class="text-justify">'

			frase.forEach(function(item,i){
				i++
				if(frase.length == i)
					str += item
				else
					str += item+'<input type="text" class="input-completar" name="p'+i+'">'
			})
			str += '</p></form>'
			str += '<div class="col-xs-6"><button class="btn btn-default">Enviar</button></div><div class="col-xs-6"><button class="btn btn-default">Volver a la UPZ</button></div>'

			return str;
		},
		render:function(){
			this.$el.html(this.template())
			//this.$('.areaJuego').html(p.render().el)
			return this
		}
	})

	return ng
})