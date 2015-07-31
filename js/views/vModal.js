define(['backbone'], function(Backbone){

	var modal = Backbone.View.extend({
		el:'#modal',
		events:{
			'click .cancel':'cerrarModal',
			'show.bs.modal ':'validaModal',
			'click .box-activarReto>div':'boxActivarRetoCambio',
			'click .btn-changeCat':'cambiaCategoria',
		},
		cambiaCategoria:function(e){
			e.preventDefault()
			var self = this
			Base.status.cambiarCategoria().done(function(resp){
				self.trigger('cambiaCat', {cat:resp.dat.cat})
				self.$el.modal('hide')
			})
		},
		validaModal:function(e){
			// Si tiene esta opcion es porq se hace click desde el menú superior
			if(e.relatedTarget){
				this.initialize()
			}
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
			}
		},
		initialize:function(){
			this.title = "Error"
			this.body = '<img src="img/im_error.png" class="img-responsive"><br><p>Mensaje de redireccion a la página donde tiene que contestar la encuenta</p><a href="http://suall.puentearandaestic.com" target="_blank"> Encuesta nuevo </a>';
			//this.modalCambiarCat()
			this.render()
		}, 
		modalCambiarCat:function(){
			this.title = "Cambiar Categoria"
			this.body = '<p> Gastarás 10 monedas <br> ¿Estás seguro?</p><div class="coins"><span>10</span></div><br> <div class="col-xs-6"><button class="btn btn-default cancel">No</button></div><div class="col-xs-6"><button class="btn btn-default btn-changeCat">Sí</button></div><div class="clearfix"></div>'
			this.render()
		},
		modalCancelarReto:function(){
			this.title = "Cancelar Reto"
			this.body = '<p> Gastarás 10 monedas <br> ¿Estás seguro?</p><div class="coins"><span>10</span></div><br> <div class="col-xs-6"><button class="btn btn-default cancel">No</button></div><div class="col-xs-6"><button class="btn btn-default">Sí</button></div><div class="clearfix"></div>'
			this.render()
		},
		modalActivarReto:function(){
			this.title = "Activar Reto"
			this.body = '<p> Elige una de las siguientes opcciones: </p>'+
						'<div class="box-activarReto"><div class="col-xs-6 active"><p>Temporal</p><div class="coins"><span>10</span></div></div><div class="col-xs-6"><p>Permanente</p><div class="coins more"><span>100</span></div></div></div>'+
						'<div class="col-xs-6"><button class="btn btn-default cancel">Cancelar</button></div><div class="col-xs-6"><button class="btn btn-default">Enviar</button></div><div class="clearfix"></div>'
			this.render()
		},
		render:function(){
			this.$('.modal-title').html(this.title)
			this.$('.modal-body').html(this.body)

			return this
		}
	})

	return modal
})