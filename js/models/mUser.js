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
			// Servicios de los retos
			else if(this.get('type')==='newCat'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f=newcat&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
			}
			else if(this.get('type')==='changeCat'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f=chgcat&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
			}
			// Nuevo reto geo
			else if(this.get('type')==='newgeo'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f=newgeo&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
			}
			// Nuevo reto selfie
			// else if(this.get('type')==='newself'){ 
			// 	var info = this.get('info')
			// 	return this.urlRoot+'/reto/?f=newself&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
			// }

			// Nuevo reto random
			else if(this.get('type')==='newrand'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f=newrand&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
			}

			// Nuevo reto puzzle
			else if(this.get('type')==='newpuzz'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f=newpuzz&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
			}
			// Nuevo reto Completar
			else if(this.get('type')==='newcomp'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f=newcomp&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
			}
			// Nuevo reto Seleccion Multiple
			else if(this.get('type')==='newmult'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f=newmult&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
			}
			// Nuevo reto Relacionar
			else if(this.get('type')==='newrel'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f=newrel&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
			}
			// Nuevo reto selfie con opcion de tipo
			else if(this.get('type')==='newself'){ 
				var info = this.get('info')
				return this.urlRoot+'/reto/?f=newself&uid='+info.uid+'&upz='+this.get('upz')+'&tipo='+this.get('tipo')+'&k='+info.ukey; 
				//return this.urlRoot+'/reto/?f=newself&uid&upz&tipo&k'; 
			}
			// Listado de retos por upz
			else if(this.get('type')==='lstRetos'){ 
				var info = this.get('info')
				return this.urlRoot+'/upz/?f=lst&uid='+info.uid+'&upz='+this.get('upz')+'&k='+info.ukey; 
				//return this.urlRoot+'/upz/?f=lst&uid&upz&k'; 
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
				this.on('change:info', this.actualizaInfoMenu, this)
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
				Base.app.navigate('#error', {trigger:true})
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
					console.log('entra a la pagina')
					self.set({'status':'connected'})
					self.set({info:data.dat})
					self.saveLocal()
					Base.app.navigate('#homegame', {trigger:true})
				}else{
					var mensajeError = data.msg
					Base.app.navigate('#error', {trigger:true})
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
			clan.poll()
		},
		listadoRetosUpz: function(upz){
			var self = this
			this.set({type:'lstRetos', upz:upz})
			return this.fetch().fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})
		},
		nuevaCategoria: function(upz){
			var self = this
			this.set({type:'newCat',upz:upz})
			return this.fetch().fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})
		},
		cambiarCategoria: function(){
			var self = this
			this.set({type:'changeCat'})
			return this.fetch().fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})
		},
		obtenerRetoRandom: function(){
			var self = this
			this.set({type:'newrand'})
			return this.fetch().fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})
		},
		nuevoRetoGeo: function(){
			var self = this
			this.set({type:'newgeo'})
			return this.fetch().fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})
		},
		nuevoRetoSelfie: function(tipo){
			var self = this
			this.set({type:'newself', tipo: tipo || 'none'})
			return this.fetch().fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})
		},
		nuevoRetoPuzzle: function(){
			var self = this
			this.set({type:'newpuzz'})
			return this.fetch().fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})
		},
		nuevoRetoCompletar: function(){
			var self = this
			this.set({type:'newcomp'})
			return this.fetch().fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})
		},
		nuevoRetoMultiple: function(){
			var self = this
			this.set({type:'newmult'})
			return this.fetch().fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})
		},
		nuevoRetoRelacionar: function(){
			var self = this
			this.set({type:'newrel'})
			return this.fetch().fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})
		},
		saveLocal:function(){
			var store = localStorage.getItem('session');
		    var data = (store && JSON.parse(store)) || {};
		    // we may choose what is overwritten with what here
		    _.extend(data, this.toJSON());
		    localStorage.setItem('session', JSON.stringify(data));
		},
		actualizaInfoMenu:function(){
			var info = this.get('info')
			$('.infouser .picsqr').attr({src:info.picsqr})
			$('.infouser .nombre').html(info.name)
			$('.infouser .clan').html(info.clan)
		}
	})

	return user
})