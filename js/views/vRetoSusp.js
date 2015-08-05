define(['backbone', 'text!tmpl/retoSuspendido.html', 'views/vRetoMain'], function(Backbone, template){

	var retoSus = Backbone.View.extend({
		className:'retoSusp',
		events:{
			'click .activarReto': 'activarReto'
		},
		activarReto: function(e) {
			e.preventDefault()
			Base.app.vModal.modalActivarReto(this.model.get('rid'))
			Base.app.vModal.$el.modal('show')
			Base.app.vModal.on('restauraReto', this.restauraReto, this)
		},
		restauraReto:function(opt){
			var vReto = require('views/vRetoMain')
			var reto = this.reto = new vReto({model:new Backbone.Model(opt)})
			reto.setElement(this.$el).render()
			//this.$el.html(reto.render().el)
			
			this.undelegateEvents()
			clearInterval(this.t);
		},
		initialize:function(){
			//this.template = template
			var self = this
			this.seg = this.model.get('time')
			this.now = new Date(0,0,0,0,0,this.model.get('time')-1)
			this.$('.reloj').html(this.now.getHours()+':'+this.now.getMinutes()+':'+this.now.getSeconds())

			this.t = setInterval(function(){
				if(self.seg>0){
					var reloj = new Date(0,0,0,0,0,--self.seg)
					self.$('.reloj').html(reloj.getHours()+':'+reloj.getMinutes()+':'+reloj.getSeconds())
				}
			}, 1000)

		}, 
		render:function(){
			//this.$el.html(this.template)
			this.$el.html(template)
			return this
		}
	})

	return retoSus
})