define(['backbone'], function(Backbone){

	var ng = Backbone.View.extend({
	className:'retoSelMul col-xs-12',
		events:{
			'click button:eq(0)': 'enviarRespuesta'
		},
		enviarRespuesta:function(e){
			e.preventDefault()
			console.log('envia la respuesta de la seleccion')
		},
		initialize:function(){
			//this.template = template
			//this.frase = 'Este río nace en el páramo @ bajando por el cerro de @ y confluye por debajo de la tierra con el rio';
			//this.dat = this.model.get('dat')
		}, 
		template: function(){

			var str = '<ul class="">'
			_.each(this.model.get('lst_resp'), function(item,i){
				i++
				str += '<li class="list-group-item "><div class="input-group"><span class="input-group-addon">'+i+'</span>'+
						' <p>'+item.resp+'</p><span class="input-group-addon">'+
						'<input type="radio" name="selmul" value='+item.cod+' aria-label="..."></span></div></li>';
			})
			str += '</ul>'
			str += '<div class="col-xs-6"><button class="btn btn-default">Enviar</button></div><div class="col-xs-6"><button class="btn btn-default">Voler a la UPZ</button></div>'
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