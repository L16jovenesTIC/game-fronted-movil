define(['backbone'], function(Backbone){

	var clan = Backbone.Model.extend({
		urlRoot: window.urlServidor+"/clan/?",
		defaults:{
			info:{},
			lst_jug:{}
		},
		url:function(opt){
			var info = this.get('info')
			if(this.get('type')==='ping'){ 
				return this.urlRoot+'f=ping&uid='+this.get('uid')+'&eid='+this.get('last_eid')+'&k='+this.get('ukey');
			}
			else if(this.get('type')==='info'){ 
				return this.urlRoot+'f=inf&uid='+this.get('uid')+'&k='+this.get('ukey'); 
			}
			else if(this.get('type')==='old'){ 
				return this.urlRoot+'f=old&uid='+this.get('uid')+'&eid='+this.get('fin_eid')+'&k='+this.get('ukey'); 
			}
			else{ return this.urlRoot; } 

		},
		initialize:function(){
			var self = this 
			//this.listenTo( this ,'change:info', this.poll)
			this.listenTo( this ,'change:info', this.procesaDatos)
			// Trae la información del Clan
			//this.infoClan()
		},
		procesaDatos:function(e){
			var infoClan = this.get('info')		
			// Informacion de los eventos
			this.set({lst_evt:infoClan.lst_evt})
			// Informacion de los Jugadores del Clan
			this.set({lst_jug:infoClan.lst_jug})
			// Último evento
			this.set({last_eid:infoClan.last_eid})
		},
		poll:function(){
			var self = this
			this.ping()
			setInterval(function(){self.ping()}, 60000)
		},
		ping: function(){
			var self = this
			this.set({type:'ping'})
			this.fetch().done(function(resp){
				if(resp.std == 200){
					self.set({info:resp.dat})
					//self.set({lst_evt:resp.dat.lst_evt})
				}
				// Error de Validacion
				else if(resp.std == 2){
					Base.app.navigate('#error', {trigger:true})
				}
			}).fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})

		},
		traeEventosOld:function(eid){
			var self = this
			this.set({type:'old', fin_eid: eid})
			var info = this.get('lst_evt')
			this.fetch().done(function(resp){
				if(resp.std == 200){
					self.set({lst_evt:_.union(info, resp.dat.lst_evt)})
				}else{
					self.trigger('cambiaMsg', {})
				}
			}).fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})
		},
		infoClan: function(){
			var self = this
			this.set({type:'info'})
			this.fetch().done(function(resp){
				// Informacion General del Clan
				self.set({info:resp.dat})
			})
		},
	})

	return clan
})
