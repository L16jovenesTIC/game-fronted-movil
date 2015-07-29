define(['backbone', 'text!tmpl/retoSuspendido.html'], function(Backbone, template){

	var retoSus = Backbone.View.extend({
		className:'retoSusp',
		events:{
			'click .activarReto': 'activarReto'
		},
		activarReto: function(e) {
			e.preventDefault()
			Base.app.vModal.modalActivarReto()
			Base.app.vModal.$el.modal('show')
		},
		initialize:function(){
			//this.template = template
		}, 
		render:function(){
			//this.$el.html(this.template)
			this.$el.html(template)
			return this
		}
	})

	return retoSus
})