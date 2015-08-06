define(['backbone'], function(Backbone){

	var ng = Backbone.View.extend({
	className:'retoSelMul col-xs-12',
		events:{
			'click button:eq(0)': 'enviarRespuesta'
		},
		enviarRespuesta:function(e){
			e.preventDefault()
			var self = this, cod = 0
			var resp = this.$('#form-selMult').serialize()

			Base.status.validaReto({type:"valmult", rid:this.model.get('rid'), resp:resp}).done(function(resp){
	        	// Reto Suspendido
	        	if(resp.std == 48){
	        		self.trigger('retoSusp', {time:resp.dat.time,rid:self.model.get('rid')})
	        	}
	        	else if(resp.std == 200) // Reto Superado
	        		self.trigger('retoSup', {})
	        })
		},
		initialize:function(){
			//this.template = template
			//this.frase = 'Este río nace en el páramo @ bajando por el cerro de @ y confluye por debajo de la tierra con el rio';
			//this.dat = this.model.get('dat')
		}, 
		template: function(){

			var str = '<form action="#" id="form-selMult"><ul class="">'
			_.each(this.model.get('lst_resp'), function(item,i){
				i++
				str += '<li class="list-group-item "><div class="input-group"><span class="input-group-addon">'+i+'</span>'+
						' <p>'+item.resp+'</p><span class="input-group-addon">'+
						'<input type="radio" name="cod" value='+item.cod+' aria-label="..."></span></div></li>';
			})
			str += '</ul></form>'
			str += '<div class="col-xs-6"><button class="btn btn-default">Enviar</button></div><div class="col-xs-6"><button class="btn btn-default">Voler a la UPZ</button></div>'
			return str;
		},
		render:function(){
			//this.$el.html(this.template)
			this.$el.html(this.template())
			return this
		}
	})

	return ng
})