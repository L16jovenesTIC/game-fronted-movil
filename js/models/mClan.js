define(['backbone'], function(Backbone){

	var clan = Backbone.Model.extend({
		//urlRoot: window.urlServidor || module.config().urlServer+"/user/?f=ver",
		urlRoot: window.urlServidor+"/clan/?",
		defaults:{
		},
		url:function(opt){
			
			if(this.get('type')==='ping'){ 
				return this.urlRoot+'f=ping&uid=&eid=&k';
			}
			else if(this.get('type')==='info'){ 
				return this.urlRoot+'f=inf&uid='+this.get('uid')+'&k='+this.get('ukey'); 
			}
			else{ return this.urlRoot; } 

		},
		initialize:function(){
			var self = this 
			// Trae la información del Clan
			this.infoClan()
		},
		ping: function(){
			var self = this
			this.set({type:'ping'})
			//this.urlRoot += '&nom='+this.get('nom')
			this.fetch().done(function(resp){

			}).fail(function(){
				Base.app.navigate('#error', {trigger:true})
			})

		},
		infoClan: function(){
			var self = this
			this.set({type:'info'})
			this.fetch().done(function(data){
				self.set({info:data.dat})
			})
		},
	})

	return clan
})