define(['backbone', 'text!tmpl/rankUpz.html'], function(Backbone, template){

	var rankupz = Backbone.View.extend({
		className:'rankupz',
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
	return rankupz
})