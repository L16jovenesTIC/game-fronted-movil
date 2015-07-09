define(['backbone', 'text!tmpl/intro.html'], function(Backbone, template){

	var vIntroMain = Backbone.View.extend({
		className:'row intro',
		events:{
			'click button': 'boton'
		},
		boton: function(e) {
			e.preventDefault()
			Base.app.navigate('#homenoreg', {trigger:true})
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

	return vIntroMain
})