define(['backbone', 'text!tmpl/selUpz.html', './vRankUpzMain', './vListaRetosUpz', './vNuevoRetoUpz'], function(Backbone, template){

	var selupz = Backbone.View.extend({
		className:'row selupz',
		events:{
			'click .btn-lista': 'irListaRetos',
			'click .btn-nuevoReto': 'irNuevoReto',
			'click .btn-rank': 'irRankUpz',
		},
		irRankUpz: function(e) {
			e.preventDefault()
			var rankupz = require('views/vRankUpzMain')
			this.rank = new rankupz()
			this.$el.html(this.rank.render().el)
			Base.app.navigate('#selupz/rank')
		},
		irListaRetos: function(e) {
			e.preventDefault()
			var retosUpz = require('views/vListaRetosUpz')
			this.retos = new retosUpz()
			this.$el.html(this.retos.render().el)
			Base.app.navigate('#selupz/retos')
		},
		irNuevoReto: function(e) {
			$('body').toggleClass('loading')
			e.preventDefault()
			var self = this
			var nuevoReto = require('views/vNuevoRetoUpz')
			this.nuevoReto = new nuevoReto()

			setTimeout(function(){
				self.$el.html(self.nuevoReto.render().el)
				console.log('Entra timeout')
				$('body').toggleClass('loading')			
			}, 1000)
			//Base.app.navigate('#selupz/nuevoReto')
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

	return selupz
})