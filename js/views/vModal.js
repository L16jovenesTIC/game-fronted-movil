define(['backbone'], function(Backbone){

	var modal = Backbone.View.extend({
		el:'#modal',
		events:{
			'click .cancel':'cerrarModal',
			'show.bs.modal ':'validaModal'
		},
		validaModal:function(e){
			if(e.relatedTarget){
				this.initialize()
			}
		},
		cerrarModal:function(e){
			e.preventDefault()
			this.$el.modal('hide')
		},
		initialize:function(){
			this.title = "Error"
			this.body = '<img src="img/im_error.png" class="img-responsive"><br><p>Mensaje de redireccion a la página donde tiene que contestar la encuenta</p><a href="http://suall.puentearandaestic.com" target="_blank"> Encuesta nuevo </a>';
			//this.modalCambiarCat()
			this.render()
		}, 
		modalCambiarCat:function(){
			this.title = "Cambiar Categoria"
			this.body = '<p class="text-center"> Gastarás 10 monedas <br> ¿Estás seguro?</p><div class="coins"><span>10</span></div><br> <div class="col-xs-6"><button class="btn btn-default cancel">No</button></div><div class="col-xs-6"><button class="btn btn-default">Sí</button></div><div class="clearfix"></div>'
			this.render()
		},
		modalCancelarReto:function(){
			this.title = "Cancelar Reto"
			this.body = '<p class="text-center"> Gastarás 10 monedas <br> ¿Estás seguro?</p><div class="coins"><span>10</span></div><br> <div class="col-xs-6"><button class="btn btn-default cancel">No</button></div><div class="col-xs-6"><button class="btn btn-default">Sí</button></div><div class="clearfix"></div>'
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