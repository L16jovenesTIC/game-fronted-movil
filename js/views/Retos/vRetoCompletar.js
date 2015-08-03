define(['backbone'], function(Backbone){

	var ng = Backbone.View.extend({
		className:'retoCompletar col-xs-12',
		events:{
			'click button:eq(0)': 'enviarRespuesta'
		},
		enviarRespuesta: function(e) {
			e.preventDefault()
			console.log('enviando respuesta')
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
			var str = '<form><p class="text-justify">'

			frase.forEach(function(item,i){
				if(frase.length == i+1)
					str += item
				else
					str += item+'<input type="text" class="input-completar" name="palabra['+i+']">'
			})
			str += '</p></form>'
			str += '<div class="col-xs-6"><button class="btn btn-default">Enviar</button></div><div class="col-xs-6"><button class="btn btn-default">Voler a la UPZ</button></div>'

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