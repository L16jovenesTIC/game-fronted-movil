define(['backbone'], function(Backbone){

	var ng = Backbone.View.extend({
	className:'retoGeo col-xs-12',
		events:{
			'click button:eq(0)': 'checkIn'
		},
		checkIn:function(e){
			var self = this
			e.preventDefault();
			if (navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition( function(position){
				console.log('entra geo')
			  	self.$('.geo').html(position.coords.latitude+' - '+position.coords.longitude)
			  	console.log(position.coords.latitude+' - '+position.coords.longitude)
			  },
			  function(error){
			  	console.log('entra geo error')
			  	console.log(error)
			  	self.$('.geo').html(error)
			  },{
	            enableHighAccuracy : true,
	            timeout : 10000, // 10s
	            //maximumAge : 0
	          });
			} else {
			  console.log('not supported');
			}
			//self.$('.geo').append('entra')

			//verificamos si el navegador soporta Geolocation API de HTML5
			if(navigator.geolocation){
			    //intentamos obtener las coordenadas del usuario
			    navigator.geolocation.getCurrentPosition(function(objPosicion){
			        //almacenamos en variables la longitud y latitud
			        var iLongitud=objPosicion.coords.longitude, iLatitud=objPosicion.coords.latitude;
			        //mostramos en pantalla (solo texto) las coordenadas obtenidas
			        // divCoordenadas.innerHTML='Latitud: '+iLatitud+' - Longitud: '+iLongitud;
			        console.log("Estas son tus coordenadas. Latitud: "+iLatitud+" - Longitud: "+iLongitud);
			        self.$('.geo').append("Estas son tus coordenadas. Latitud: "+iLatitud+" - Longitud: "+iLongitud)

			    },function(objError){
			        //manejamos los errores devueltos por Geolocation API
			        switch(objError.code){
			            //no se pudo obtener la informacion de la ubicacion
			            case objError.POSITION_UNAVAILABLE:
			                console.log('ERROR: La información de su posición no está disponible.<br><br>Por favor activa la opción la Geolocalizacion en tu Dispositivo');
			            break;
			            //timeout al intentar obtener las coordenadas
			            case objError.TIMEOUT:
			                console.log('Tiempo de espera agotado.');
			            break;
			            //el usuario no desea mostrar la ubicacion
			            case objError.PERMISSION_DENIED:
			                console.log('Acceso denegado.');
			            break;
			            //errores desconocidos
			            case objError.UNKNOWN_ERROR:
			                console.log('Error desconocido.');
			            break;
			        }
			    });
			}else{
			    //el navegador del usuario no soporta el API de Geolocalizacion de HTML5
			    console.log('Lo sentimos!! Su navegador no soporta Geolocation API de HTML5');
			}


		},
		initialize:function(){
			//this.template = template
			var self = this
			// this.listenTo(this.model, 'change', this.render)
			// Base.status.nuevoRetoGeo().done(function(resp){
			// 	self.model.set(resp.dat)
			// })
		}, 
		template: function(){
			var str = '<img src="'+this.model.get('img500')+'" class="img-responsive"><br>'
			str += '<div class="col-xs-6"><button class="btn btn-default">Hacer CheckIn</button></div><div class="col-xs-6"><button class="btn btn-default">Voler a la UPZ</button></div>'
			return str;
		},
		render:function(){
			debugger
			//this.$el.html(this.template)
			this.$el.html(this.template())
			return this
		}
	})

	return ng
})