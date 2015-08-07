define(['backbone', 'text!tmpl/error.html'], function(Backbone, template){

	var retoSup = Backbone.View.extend({
		className:'error',
		events:{
			'click header>img': 'boton'
		},
		boton: function(e) {
			e.preventDefault()
			//Base.app.navigate('#selupz', {trigger:true})
		},
		initialize:function(){
			//this.template = template
		}, 
		template:function(data){
			return _.template(template)(data)
		},
		render:function(){
			//this.$el.html(this.template)
			this.$el.html(this.template(this.model.toJSON()))
			return this
		}
	})

	return retoSup
})