define(['backbone'], function(Backbone){

	var ng = Backbone.View.extend({
	className:'retoSelMul col-xs-12',
		events:{
			'click button:eq(0)': 'checkIn'
		},
		checkIn:function(e){

		},
		initialize:function(){
			//this.template = template
			this.frase = 'Este río nace en el páramo @ bajando por el cerro de @ y confluye por debajo de la tierra con el rio';
		}, 
		template: function(){

			var str = '<ul class="">'
			str += '<li class="list-group-item "><div class="input-group"><span class="input-group-addon">A</span>'+
					' <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p><span class="input-group-addon">'+
					'<input type="radio" name="selmul" aria-label="..."></span></div></li>';
			str += '<li class="list-group-item "><div class="input-group"><span class="input-group-addon">B</span>'+
					' <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p><span class="input-group-addon">'+
					'<input type="radio" name="selmul" aria-label="..."></span></div></li>';
			str += '<li class="list-group-item "><div class="input-group"><span class="input-group-addon">C</span>'+
					' <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p><span class="input-group-addon">'+
					'<input type="radio" name="selmul" aria-label="..."></span></div></li>';
			str += '<li class="list-group-item "><div class="input-group"><span class="input-group-addon">D</span>'+
					' <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p><span class="input-group-addon">'+
					'<input type="radio" name="selmul" aria-label="..."></span></div></li>';
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