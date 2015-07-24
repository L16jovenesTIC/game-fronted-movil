define(['backbone'], function(Backbone){

	var ng = Backbone.View.extend({
	className:'retoGeo col-xs-12',
		events:{
			'click button:eq(0)': 'checkIn'
		},
		checkIn:function(e){
			var self = this
			e.preventDefault();
			console.log('entra geo')
			if (navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition( function(position){
			  	self.$('.geo').html(position.coords.latitude+' - '+position.coords.longitude)
			  	console.log(position.coords.latitude+' - '+position.coords.longitude)
			  },
			  function(error){
			  	self.$('.geo').html(error)
			  });
			} else {
			  console.log('not supported');
			}
			self.$('.geo').append('entra')

		},
		initialize:function(){
			//this.template = template
			this.frase = 'Este río nace en el páramo @ bajando por el cerro de @ y confluye por debajo de la tierra con el rio';
		}, 
		template: function(){
			var str = '<img src="img/2015-05-1311.13.23.jpg" class="img-responsive"><br><span class="geo"></span>'
			str += '<div class="col-xs-6"><button class="btn btn-default">Hacer CheckIn</button></div><div class="col-xs-6"><button class="btn btn-default">Voler a la UPZ</button></div>'
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