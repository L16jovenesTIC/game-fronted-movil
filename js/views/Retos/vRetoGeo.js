define(['backbone'], function(Backbone){

	var ng = Backbone.View.extend({
	className:'retoGeo col-xs-12',
		events:{
			'click button:eq(0)': 'checkIn',
			'click button:eq(1)': 'volverUPZ'
		},
		volverUPZ:function(e){
			e.preventDefault()
			Base.app.navigate('#selupz', {trigger:true})
		},
		checkIn:function(e){
			var self = this

			//verificamos si el navegador soporta Geolocation API de HTML5
			if(navigator.geolocation){
			    //intentamos obtener las coordenadas del usuario
			    navigator.geolocation.getCurrentPosition(function(objPosicion){
			        //almacenamos en variables la longitud y latitud
			        var iLongitud=objPosicion.coords.longitude, iLatitud=objPosicion.coords.latitude;
			        //console.log("Estas son tus coordenadas. Latitud: "+iLatitud+" - Longitud: "+iLongitud);
			        Base.status.validaReto({type:"valgeo", rid:self.model.get('rid'), lat:iLatitud, lon:iLongitud}).done(function(resp){
			        	// Reto Suspendido
			        	if(resp.std == 48){
			        		self.trigger('retoSusp', {time:resp.dat.time,rid:self.model.get('rid')})
			        	}
			        	else if(resp.std == 200) // Reto Superado
			        		self.trigger('retoSup', {})
			        })

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
		}, 
		template: function(){
			var str = '<img src="'+this.model.get('img300')+'" class="img-responsive"><br>'
			str += '<div class="col-xs-6"><button class="btn btn-default">Hacer CheckIn</button></div><div class="col-xs-6"><button class="btn btn-default">Volver a la UPZ</button></div>'
			return str;
		},
		render:function(){
			this.$el.html(this.template())
			return this
		}
	})

	return ng
})