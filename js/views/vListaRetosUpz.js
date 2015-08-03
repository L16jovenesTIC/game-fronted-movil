define(['backbone', 'text!tmpl/listaRetosUpz.html', 'views/vRetoMain'], function(Backbone, template, vReto){

	var listRetos = Backbone.View.extend({
		className:'listRetosUpz',
		events:{
			'click header>img': 'boton',
			'click li[data-id]': 'obtieneReto',
		},
		obtieneReto:function(e){
			e.preventDefault()
			var rid = $(e.target).parents('li[data-id]').data('id')
			var tipo = $(e.target).parents('li[data-id]').data('tipo')

			var reto = new vReto({model:new Backbone.Model({tipo:tipo,rid:rid})})
			this.$el.html(reto.render().el)
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