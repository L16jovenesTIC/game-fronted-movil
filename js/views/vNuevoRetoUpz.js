define(['backbone', 'text!tmpl/nuevoRetoUpz.html', 'views/vRetoMain'], function(Backbone, template, vReto){

	var Reto = Backbone.Model.extend({
		defaults:{
			tipo:'none',
			img300:'img/2015-05-1311.13.23.jpg'
		}
	})

	var Categoria = Backbone.Model.extend({})
	var Categorias = Backbone.Collection.extend({
		model:Categoria,
		initialize:function(){
			this.add(new Categoria({img:'img/im_selreto_cultura.png', class:"cultura", cat:"DCT"}))
			this.add(new Categoria({img:'img/im_selreto_educa.png', class:"educacion", cat:"EYS"}))
			this.add(new Categoria({img:'img/im_selreto_geograf.png', class:"historia", cat:"HYG"}))
			this.add(new Categoria({img:'img/im_selreto_infrs.png', class:"infraestructura", cat:"IYM"}))
			this.add(new Categoria({img:'img/im_selreto_misional.png', class:"misional", cat:"MYC"}))
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
			Base.app.vModal.on('cambiaCat', function(opt){ 
				this.model = this.collection.where({cat:opt.cat})[0]; this.render() 
			}, this)
		},
		irRetoGeo:function(e){
			e.preventDefault()
			var reto = new vReto({model:new Reto({tipo:'geo'})})
			this.$el.html(reto.render().el)
			//reto.setElement(this.$el)
		},
		irRetoSelfie:function(e){
			e.preventDefault()
			var reto = new vReto({model:new Reto({tipo:'selfie'})})
			this.$el.html(reto.render().el)
			//reto.setElement(this.$el)
		},
		irRetoRandom:function(e){
			e.preventDefault()
			var reto = new vReto({model:new Reto({tipo:'puzzle'})})
			this.$el.html(reto.render().el)
			//reto.setElement(this.$el)
		},
		initialize:function(){
			this.collection = new Categorias()
			this.model = this.collection.where({cat:this.attributes.cat})[0]
			//this.model = this.collection.where({cat:'IYM'})[0]
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