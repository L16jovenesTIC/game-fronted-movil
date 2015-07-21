define(['backbone', 'text!tmpl/intro.html', 'module'], function(Backbone, template, module){

	var user = Backbone.Model.extend({
		//urlRoot: window.urlServidor || module.config().urlServer+"/user/?f=ver",
		urlRoot: window.urlServidor,
		defaults:{
			keyapp:'50ed88e8e24ecca389f99ba00491ab294937e941cf891bacf951bd6217c6ba59',
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
				return this.urlRoot+'/user/?f=ver&uid='+this.get('uid')+'&email='+this.get('email')+'&k='+this.get('keyapp')+'&token='+this.get('token'); 
			}
			else{ return this.urlRoot; } 

		},
		initialize:function(){
			var self = this 

			this.ping()
			setInterval(function(){self.ping()}, 60000)
			this.once('traeKey', this.pingKey, this)
			
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
					Base.app.navigate('#homegame', {trigger:true})
				}else{
					Base.app.navigate('#error', {trigger:true})
				}

			})

		},
		verificaUser: function(){
			this.set({type:'ver'})
			//this.urlRoot += '&nom='+this.get('nom')
			this.fetch()

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
		saveLocal:function(){

			var store = localStorage.getItem('session');
		    var data = (store && JSON.parse(store)) || {};
		    // we may choose what is overwritten with what here
		    _.extend(this.attributes, data);
		    localStorage.setItem('session', JSON.stringify(this.toJSON()));
		},
		traeDatosFB: function(){
			var self = this
			// Recoge info para registrar usuario
			console.log('Recolectando Informacion ....');

			FB.api('/me?fields=id,name,email,link,gender', function(response) {
				self.set(response)
			});

			FB.api('/me/picture?type=square', function(response) {
				self.set({picsqr:response.data.url})
			});

			FB.api('/me/picture?type=normal', function(response) {
				self.set({picnrl:response.data.url})
			});

			FB.api('/me/picture?type=large', function(response) {
				self.set({piclgr:response.data.url})
			});

			FB.api('/me/picture?type=large&width=700&height=700', function(response) {
				self.set({picbig:response.data.url})
			});
		}
	})

	return user
})