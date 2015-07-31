define(['backbone'], function(Backbone){

	var clan = Backbone.Model.extend({
		//urlRoot: window.urlServidor || module.config().urlServer+"/user/?f=ver",
		urlRoot: window.urlServidor+"/clan/?",
		defaults:{
			info:{}
		},
		url:function(opt){
			var info = this.get('info')
			if(this.get('type')==='ping'){ 
				return this.urlRoot+'f=ping&uid='+this.get('uid')+'&eid='+info.last_eid+'&k='+this.get('ukey');
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
			this.listenTo( this ,'change:info', this.poll)
			// Trae la información del Clan
			//this.infoClan()
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
					self.set({lst_evt:resp.dat.lst_evt})
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
				self.set({info:resp.dat})
				self.set({lst_evt:resp.dat.lst_evt})
			})
		},
	})

	return clan
})
