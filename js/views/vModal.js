define(['backbone'], function(Backbone){

	var modal = Backbone.View.extend({
		el:'#modal',
		events:{
			'click .cancel':'cerrarModal',
			'show.bs.modal ':'validaModal',
			'click .box-activarReto>div':'boxActivarRetoCambio',
			'click .btn-changeCat':'cambiaCategoria',
			'click .btn-tipoNuevoReto':'nuevoReto',
			'click .btn-cancelarReto':'cancelarReto',
			'click .btn-activarReto':'activarReto',
		},
		alerta:function(msg){
			this.title = "Error"
			this.body = '<img src="img/im_error.png" class="img-responsive"><br><p>'+msg+'</p>';
			//this.modalCambiarCat()
			this.render()
			this.$el.modal('show')
		},
		nuevoReto:function(e){
			e.preventDefault()
			var self = this
			Base.status.nuevoRetoSelfie(this.tipoNuevoReto).done(function(resp){
				if(resp.std == 200){
					self.trigger('cambiaCat', {cat:resp.dat.cat})
					self.$el.modal('hide')
				}else{
					Base.app.vModal.alerta(resp.msg)
				}
			})
		},
		cancelarReto:function(e){
			e.preventDefault()
			var self = this
			var rid = $(e.target).data('id')
			var opt = { type:"delreto", rid: rid }
			Base.status.cancelaReto(opt).done(function(resp){
				if(resp.std == 200){
					//self.trigger('delreto', {cat:resp.dat.cat})
					self.$el.modal('hide')
					Base.app.navigate('#homegame', {trigger:true})
				}else{
					Base.app.vModal.alerta(resp.msg)
				}
			})
		},
		activarReto:function(e){
			e.preventDefault()
			var self = this
			var rid = $(e.target).data('id')
			var opt = { type:"actreto", rid: rid }
			Base.status.cancelaReto(opt).done(function(resp){
				if(resp.std == 200){
					self.trigger('restauraReto', resp.dat)
					self.$el.modal('hide')
					//Base.app.navigate('#homegame', {trigger:true})
				}else{
					Base.app.vModal.alerta(resp.msg)
				}
			})
		},
		cambiaCategoria:function(e){
			e.preventDefault()
			var self = this
			Base.status.cambiarCategoria().done(function(resp){
				if(resp.std == 200){
					self.trigger('cambiaCat', {cat:resp.dat.cat})
					self.$el.modal('hide')
				}else{
					Base.app.vModal.alerta(resp.msg)
				}
			})
		},
		validaModal:function(e){
			// Si tiene esta opcion es porq se hace click desde el menú superior
			if(e.relatedTarget){
				this.help()
			}
		},
		help:function(){
			this.title = 'Ayuda'
			this.body = this.model.get('help')

			this.render()
		},
		cerrarModal:function(e){
			e.preventDefault()
			this.$el.modal('hide')
		},
		boxActivarRetoCambio:function(e){
			e.preventDefault()
			if(!$(e.target).parents('.active').length && !$(e.target).hasClass('active')){
				var $cont = $(e.target).parents('.box-activarReto')
				$cont.children().toggleClass('active')
				// Guarda la opcion Temporal | Fija
				this.tipoNuevoReto = $cont.find('.active').data('opt')
			}
		},
		initialize:function(){
			if(!this.model){
				this.model = new Backbone.Model()
			}
			this.title = "Error"
			//this.body = '<img src="img/im_error.png" class="img-responsive"><br><p>Mensaje de redireccion a la página donde tiene que contestar la encuenta</p><a href="http://suall.puentearandaestic.com" target="_blank"> Encuesta nuevo </a>';
			this.body = '<img src="img/im_error.png" class="img-responsive"><br>'+Base.status.get('help')+'<p></p>';
			//this.modalCambiarCat()
			this.model.set({title:this.title, body:this.body})
			this.render()
		}, 
		modalCambiarCat:function(){
			this.title = "Cambiar Categoria"
			this.body = '<p> Gastarás 2 monedas <br> ¿Estás seguro?</p><div class="coins"><span>2</span></div><br> <div class="col-xs-6"><button class="btn btn-default cancel">No</button></div><div class="col-xs-6"><button class="btn btn-default btn-changeCat">Sí</button></div><div class="clearfix"></div>'
			this.render()
		},
		modalCancelarReto:function(rid){
			this.title = "Cancelar Reto"
			this.body = '<p> Gastarás 15 monedas <br> ¿Estás seguro?</p><div class="coins"><span>15</span></div><br> <div class="col-xs-6"><button class="btn btn-default cancel">No</button></div><div class="col-xs-6"><button class="btn btn-default btn-cancelarReto" data-id="'+rid+'">Sí</button></div><div class="clearfix"></div>'
			this.render()
		},
		modalActivarReto:function(rid){
			this.title = "Activar Reto"
			this.body = '<p> Gastarás 4 monedas <br> ¿Estás seguro?</p><div class="coins"><span>4</span></div><br> <div class="col-xs-6"><button class="btn btn-default cancel">No</button></div><div class="col-xs-6"><button class="btn btn-default btn-activarReto" data-id="'+rid+'">Sí</button></div><div class="clearfix"></div>'
			this.render()
		},
		modalComprarReto:function(){
			this.title = "Activar Reto"
			this.body = '<p> Elige una de las siguientes opcciones: </p>'+
						'<div class="box-activarReto"><div class="col-xs-6 active" data-opt="temp"><p>Temporal</p><div class="coins"><span>10</span></div></div><div class="col-xs-6" data-opt="fijo"><p>Permanente</p><div class="coins more"><span>100</span></div></div></div>'+
						'<div class="col-xs-6"><button class="btn btn-default cancel">Cancelar</button></div><div class="col-xs-6"><button class="btn btn-default btn-tipoNuevoReto">Enviar</button></div><div class="clearfix"></div>'
			this.render()
		},
		render:function(){
			this.$('.modal-title').html(this.title || this.model.get('title'))
			this.$('.modal-body').html(this.body || this.model.get('body'))
			return this
		}
	})

	return modal
})