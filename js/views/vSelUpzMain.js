define(['backbone', 'text!tmpl/selUpz.html', './vRankUpzMain', './vListaRetosUpz'], function(Backbone, template){

	var selupz = Backbone.View.extend({
		className:'row selupz',
		events:{
			'click header img:eq(0)': 'irListaRetos',
			'click header img:eq(1)': 'irNuevoReto',
			'click header img:eq(2)': 'irRankUpz',
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