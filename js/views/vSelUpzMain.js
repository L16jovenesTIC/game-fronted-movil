define(['backbone', 'text!tmpl/selUpz.html', './vRankUpzMain', './vListaRetosUpz', './vNuevoRetoUpz'], function(Backbone, template){

	var selupz = Backbone.View.extend({
		className:'row selupz',
		events:{
			'click .btn-lista': 'irListaRetos',
			'click .btn-nuevoReto': 'irNuevoReto',
			'click .btn-rank': 'irRankUpz',
			'slid.bs.carousel #carousel-selupz': 'cambioUpz',
		},
		cambioUpz:function(e){
			//$(e.target).find('.carousel-inner .item.active').index()
			this.upz = $(e.target).find('.carousel-inner .item.active').data('upz')
		},
		irRankUpz: function(e) {
			e.preventDefault()
			var rankupz = require('views/vRankUpzMain')
			this.rank = new rankupz()
			this.$el.html(this.rank.render().el)
			Base.app.navigate('#selupz/rank')
		},
		irListaRetos: function(e) {
			$('body').toggleClass('loading')
			e.preventDefault()
			var self = this
			var retosUpz = require('views/vListaRetosUpz')
			Base.status.listadoRetosUpz(this.upz).done(function(resp){
				if(resp.std==200){
					self.retos = new retosUpz()
					self.$el.html(self.retos.render(resp.dat.lst_ret).el)
					Base.app.navigate('#selupz/retos')
				}else{
					Base.app.vModal.alerta(resp.msg)
				}
				$('body').toggleClass('loading')			
			})
			//this.retos = new retosUpz()
			//this.$el.html(this.retos.render().el)
			
		},
		irNuevoReto: function(e) {
			$('body').toggleClass('loading')
			e.preventDefault()
			var self = this
			var nuevoReto = require('views/vNuevoRetoUpz')
			Base.status.nuevaCategoria(this.upz).done(function(resp){
				if(resp.std==200){
					self.nuevoReto = new nuevoReto({attributes:{cat:resp.dat.cat}})
					self.$el.html(self.nuevoReto.render().el)
					Base.app.navigate('#selupz/nuevoReto')
				}else{
					Base.app.vModal.alerta(resp.msg)
				}
				$('body').toggleClass('loading')			
			})

			// setTimeout(function(){
			// 	self.$el.html(self.nuevoReto.render().el)
			// 	console.log('Entra timeout')
			// 	$('body').toggleClass('loading')			
			// }, 1000)
			//Base.app.navigate('#selupz/nuevoReto')
		},
		initialize:function(){
			this.upz="UCM"
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