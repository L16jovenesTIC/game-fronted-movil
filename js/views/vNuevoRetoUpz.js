define(['backbone', 'text!tmpl/nuevoRetoUpz.html', 'views/vRetoMain'], function(Backbone, template, vReto){

	var Reto = Backbone.Model.extend({
		defaults:{
			tipo:'none'
		}
	})

	var Categoria = Backbone.Model.extend({})
	var Categorias = Backbone.Collection.extend({
		model:Categoria,
		initialize:function(){
			this.add(new Categoria({img:'img/im_selreto_cultura.png', class:"cultura"}))
			this.add(new Categoria({img:'img/im_selreto_educa.png', class:"educacion"}))
			this.add(new Categoria({img:'img/im_selreto_geograf.png', class:"historia"}))
			this.add(new Categoria({img:'img/im_selreto_infrs.png', class:"infraestructura"}))
			this.add(new Categoria({img:'img/im_selreto_misional.png', class:"misional"}))
		}
	})

	var nuevoReto = Backbone.View.extend({
		className:'nuevoReto',
		events:{
			'click .reto-geo': 'irRetoGeo',
			'click .reto-selfie': 'irRetoSelfie',
			'click .reto-random': 'irRetoRandom',
			'click .cambiarCat': 'cambiarCategoria',
		},
		cambiarCategoria:function(e){
			e.preventDefault()
			console.log('cambia de categoria')
			Base.app.vModal.modalCambiarCat()
			Base.app.vModal.$el.modal('show')
		},
		irRetoGeo:function(e){
			e.preventDefault()
			var reto = new vReto({model:new Reto({tipo:'geo'})})
			this.$el.html(reto.render().el)
		},
		irRetoSelfie:function(e){
			e.preventDefault()
			var reto = new vReto({model:new Reto({tipo:'selfie'})})
			this.$el.html(reto.render().el)
		},
		irRetoRandom:function(e){
			e.preventDefault()
			var reto = new vReto({model:new Reto({tipo:'puzzle'})})
			this.$el.html(reto.render().el)
		},
		initialize:function(){
			// Aqui hacer el random del juego
			this.collection = new Categorias()
			this.model = this.collection.shuffle()[0]
			//this.template = template
		}, 
		render:function(){
			//this.$el.html(this.template)
			this.$el.html(template)
			this.$('.img-categoria').attr('src',this.model.get('img'))
			this.$('.alert').addClass('alert-'+this.model.get('class'))
			return this
		}
	})

	return nuevoReto
})