define(['backbone'], function(Backbone){

	var ng = Backbone.View.extend({
	className:'retoSelfie col-xs-12',
		events:{
			'click button:eq(0)': 'tomarFoto',
			'click button:eq(1)': 'volverUPZ',
			'change .fotoSelfie': 'agregarFoto',
		},
		agregarFoto:function(e){
			e.preventDefault()
			var file = e.target.files[0]
			var formData = new FormData()
			formData.append("photo", file);

			// Validamos el tipo de archivo
			if(!['png','jpg','jpeg'].some(function(item){return (file.type.search(item)!=-1)?true:false})){
				Base.app.vModal.alerta('La foto que intenta subir no está permitida')
				return false
			}

			var request = Base.status.validaRetoSelfie({type:"valself", rid:this.model.get('rid'), resp:formData})
			request.onload = function(e){
				var resp = this.response
				// Reto Suspendido
	        	if(resp.std == 47){
	        		Base.app.navigate('#retovali', {trigger:true})
	        	}
	        	// Error al subir la foto
	        	else if(resp.std == 49 || resp.std == 50 || resp.std == 51 ) 
	        		Base.app.vModal.alerta(resp.msg)
	        	else
	        		Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			}
		},
		volverUPZ:function(e){
			e.preventDefault()
			Base.app.navigate('#selupz', {trigger:true})
		},
		tomarFoto:function(e){
			var self = this
			e.preventDefault();
			this.$('.fotoSelfie').trigger("click")
		},
		initialize:function(){
			 var self = this
			// this.listenTo(this.model, 'change', this.render)
			// Base.status.nuevoRetoSelfie().done(function(resp){
			// 	self.model.set(resp.dat)
			// })
		}, 
		template: function(){

			var str = '<img src="'+this.model.get('img500')+'" class="img-responsive"><br><input type="file" class="fotoSelfie hide">'
			str += '<div class="col-xs-6"><button class="btn btn-default">Enviar Foto</button></div><div class="col-xs-6"><button class="btn btn-default">Volver a la UPZ</button></div>'
			return str;
		},
		render:function(){
			//this.$el.html(this.template)
			this.$el.html(this.template())
			//this.$('.areaJuego').html(p.render().el)
			return this
		}
	})

	return ng
})