define(['backbone', 'text!tmpl/listaRetosUpz.html'], function(Backbone, template){

	var listRetos = Backbone.View.extend({
		className:'listRetosUpz',
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
		render:function(lista){
			//this.$el.html(this.template)
			this.$el.html(this.template({list:lista}))
			return this
		}
	})

	return listRetos
})