define(['backbone', 'text!tmpl/intro.html', 'module', 'models/mClan'], function(Backbone, template, module, clan){

	var user = Backbone.Model.extend({
		//urlRoot: window.urlServidor || module.config().urlServer+"/user/?f=ver",
		urlRoot: window.urlServidor,
		defaults:{
			keyapp:'50ed88e8e24ecca389f99ba00491ab294937e941cf891bacf951bd6217c6ba59',
			status:'disconnected',
			//info:{},
			//email:'trecetp@gmail.com',
			//uid:'10153249124070549',
		},
		url:function(opt){
			
			if(this.get('type')==='ping'){ 
				return this.urlRoot+'?f=ping';
			}
			else if(this.get('type')==='pingKey'){ 
				return this.urlRoot+'?f=ping&k='+this.get('keyapp'); 
			}
			else if(this.get('type')==='regEquipo'){ 
				return this.urlRoot+'/user/?f=val&psw='+this.get('pass')+'&grp='+this.get('grupo')+'&email='+this.get('email')+'&k='+this.get('keyapp')+'&token='+this.get('token'); 
			}
			else if(this.get('type')==='ver'){ 
				var info = this.get('info')
				return this.urlRoot+'/user/?f=ver&uid='+info.uid+'&email='+this.get('email')+'&k='+this.get('keyapp')+'&token='+this.get('token'); 
			}
			// Nuevo reto Selfie 
			else if(this.get('type')==='newself' || this.get('type')==='newgeo' || this.get('type')==='newpuzz' || this.get('type')==='newcomp' || this.get('type')==='newrel' || this.get('type')==='newmult' || this.get('type')==='newrand' || this.get('type')==='chgcat' || this.get('type')==='newcat'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f='+this.get('type')+'&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
				//return this.urlRoot+'/reto/?f=newself&uid&upz&tipo&k'; 
			}
			// Obtener Reto , Cancelar Reto
			else if(this.get('type')==='seeself' || this.get('type')==='seegeo' || this.get('type')==='seepuzz' || this.get('type')==='seecomp' || this.get('type')==='seerel' || this.get('type')==='seemult' || this.get('type')==='delreto' || this.get('type')==='actreto'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f='+this.get('type')+'&uid='+info.uid+'&rid='+this.get('rid')+'&k='+info.ukey; 
			}
			// Listado de retos por upz
			else if(this.get('type')==='lstRetos'){ 
				var info = this.get('info')
				return this.urlRoot+'/upz/?f=lst&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
			}
			// Ranking por upz
			else if(this.get('type')==='rank'){ 
				var info = this.get('info')
				return this.urlRoot+'/upz/?f=rank&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
			}
			// Validar Reto Geo
			else if(this.get('type')==='valgeo'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f=valgeo&uid='+info.uid+'&rid='+this.get('rid')+'&lon='+this.get('lon')+'&lat='+this.get('lat')+'&k='+info.ukey; 
			}
			// Validar Retos
			else if(this.get('type')==='valcomp' || this.get('type')==='valmult' || this.get('type')==='valpuzz' || this.get('type')==='valrel'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f='+this.get('type')+'&uid='+info.uid+'&rid='+this.get('rid')+'&'+this.get('resp')+'&k='+info.ukey;
			}
			else{ return this.urlRoot; } 

		},
		initialize:function(){
			var self = this 

			this.ping()
			setInterval(function(){self.ping()}, 60000)
			this.once('traeKey', this.pingKey, this)
			this.set({clan:new clan()})

			// Actualiza la información del menú lateral
			if(this.get('info')){
				this.actualizaInfoMenu()
				//Verifica el usuario
				this.set({type:'ver'})
				this.verificaUser()
			}else{
				//this.on('change:info', this.actualizaInfoMenu, this)
			}
			this.on('change:info', this.infoClan, this)
		},
		ping: function(){
			var self = this
			this.set({type:'ping'})
			//this.urlRoot += '&nom='+this.get('nom')
			this.fetch().done(function(resp){
				self.trigger('traeKey', {})
			}).fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})

		},
		pingKey: function(){
			var self = this
			this.set({type:'pingKey'})
			//this.urlRoot += '&nom='+this.get('nom')
			this.fetch().done(function(resp){
				self.set({token: resp.dat.token})
				console.log(resp)
				//self.verificaUser()
			})
		},
		// Método para registrarse a un Equipo
		regEquipo: function(data){
			var self = this
			this.set({type:'regEquipo'})
			_.each(data.split('&'), function(item){ 
				var a = item.split('=')
				self.set(a[0], a[1])
			})

			this.fetch().done(function(data){
				if(data.std == "200"){
					self.set({'status':'connected'})
					self.set({info:data.dat})
					self.saveLocal()
					Base.app.navigate('#homegame', {trigger:true})
				}else{
					var mensajeError = data.msg
					Base.app.navigate('#error/'+mensajeError, {trigger:true})
				}

			})
		},
		verificaUser: function(){
			var self = this
			this.set({type:'ver'})
			//this.urlRoot += '&nom='+this.get('nom')
			this.fetch().done(function(data){
				self.set({info:data.dat})
				self.saveLocal()
			})
		},
		infoClan: function(){
			var self = this
			var info = this.get('info')
			var clan = this.get('clan')
			clan.set({uid:info.uid, ukey:info.ukey})
			clan.infoClan()
			this.listenTo( clan, 'change:info', this.actualizaInfoMenu )

		},
		listadoRetosUpz: function(upz){
			var self = this
			this.set({type:'lstRetos', upz:upz})
			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		rankingUpz: function(upz){
			var self = this
			this.set({type:'rank', upz:upz})
			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		nuevaCategoria: function(upz){
			var self = this
			this.set({type:'newcat',upz:upz})
			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		cambiarCategoria: function(){
			var self = this
			this.set({type:'chgcat'})
			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		obtenerRetoRandom: function(){
			var self = this

			this.set({type:'newrand'})
			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		cancelaReto:function(opt){
			var self = this
			this.set(opt)
			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		nuevoRetoGeo: function(rid){
			var self = this
			if(rid){
				this.set({type:'seegeo', rid: rid })
			}else
				this.set({type:'newgeo'})

			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		validaReto: function(opt){
			var self = this
			this.set(opt)
			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		validaRetoSelfie: function(opt){
			var self = this
			this.set(opt)

			var info = this.get('info')
			var url = this.urlRoot+'/reto/?f='+this.get('type')+'&uid='+info.uid+'&rid='+this.get('rid')+'&k='+info.ukey
			var request = new XMLHttpRequest();
			request.open("POST", url);
			request.responseType = 'json';
			request.send(opt.resp);
			return request
		},
		nuevoRetoSelfie: function(rid){
			var self = this
			if(rid){
				this.set({type:'seeself', rid: rid })
			}else
				this.set({type:'newself'})

			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		nuevoRetoPuzzle: function(rid){
			var self = this

			if(rid){
				this.set({type:'seepuzz', rid: rid })
			}else
				this.set({type:'newpuzz'})
			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		nuevoRetoCompletar: function(rid){
			var self = this

			if(rid){
				this.set({type:'seecomp', rid: rid })
			}else
				this.set({type:'newcomp'})

			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		nuevoRetoMultiple: function(rid){
			var self = this

			if(rid){
				this.set({type:'seemult', rid: rid })
			}else
				this.set({type:'newmult'})

			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		nuevoRetoRelacionar: function(rid){
			var self = this

			if(rid){
				this.set({type:'seerel', rid: rid })
			}else
				this.set({type:'newrel'})
			return this.fetch().fail(function(){
				Base.app.navigate('#error/Ocurrio un error inesperado', {trigger:true})
			})
		},
		saveLocal:function(){
			var store = localStorage.getItem('session');
		    var data = (store && JSON.parse(store)) || {};
		    // we may choose what is overwritten with what here
		    _.extend(data, this.toJSON());
		    localStorage.setItem('session', JSON.stringify(data));
		},
		// Función para calcular los días transcurridos entre dos fechas
		restaFechas:function(f1)
		 {
			 var dif = f1 - Date.now();
			 var dias = Math.floor(dif/(1000*60*60*24)); 
			 return dias;
		 },
		actualizaInfoMenu:function(){
			var self = this
			var info = this.get('info')
			var clan = this.get('clan')
			var infoClan = clan.get('info')

			// Habilitamos las otras paginas del juego
			$('.menuList .disabled').off()
			$('.menuList .disabled').removeClass('disabled')
			// Mostramos la informacion del usuario
			$('.infouser').removeClass('hide')
			$('.infouser .picsqr').attr({src:info.picsqr})
			$('.infouser .nombre').html(info.name)
			$('.infouser .clan').html(infoClan.nombre)
			$('.infouser .tiempo_fin').html(infoClan.time_fin)
			$('.infouser .puntos').html(infoClan.puntos)
			$('.infouser .retos').html(infoClan.retos_act+'/'+infoClan.retos_lim)
			$('.infouser .monedas').html(infoClan.monedas)
			
			if(!this.t && !$.isEmptyObject(infoClan)){
				var dias = this.restaFechas( infoClan.time_fin*1000)
				this.fecha = infoClan.time_fin*1000
				var now = new Date(self.fecha)
				var reloj = new Date()
				$('.infouser .tiempo_fin').html(dias+'d '+(now.getHours()-reloj.getHours())+'h '+(now.getMinutes()-reloj.getMinutes())+'m ')

				//$('.infouser .tiempo_fin').html(dias+'d '+now.getHours()+'h '+now.getMinutes()+'m ')
				// Crea el ciclo del reloj 
				this.t = setInterval(function(){
					if(self.fecha>Date.now()){
						var reloj = new Date()
						$('.infouser .tiempo_fin').html(dias+'d '+(now.getHours()-reloj.getHours())+'h '+(now.getMinutes()-reloj.getMinutes())+'m ')
					}
				}, 60000)
			}

		}
	})

	return user
})