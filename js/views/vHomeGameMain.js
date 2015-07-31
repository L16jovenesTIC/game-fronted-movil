define(['backbone', 'text!tmpl/homeGame.html', 'models/mClan'], function(Backbone, template, clan){

	var home = Backbone.View.extend({
		className:'row homegame',
		events:{
			'click footer button': 'traeEventosOld',
			'click header>img': 'irSelUpz'
		},
		irSelUpz:function(e){
			e.preventDefault()
			Base.app.navigate('#selupz', {trigger:true})
		},
		traeEventosOld: function(e) {
			e.preventDefault()
			var $elem = $(e.target)
			var eid = this.$('.tl-mos li:last-child').data('id')
			this.clan.traeEventosOld(eid)
			this.clan.on('cambiaMsg', function(){
				$elem.html('No hay mas eventos disponibles')
			})
		},
		initialize:function(){
			//this.template = template
            this.clan = Base.status.get('clan')
			this.listenTo(this.clan, 'change:lst_evt', this.render)
			
		}, 
		template:function(data){
			return _.template(template)(data)
		},
		render:function(){
			//var clan = this.model.get('clan')
			if(this.clan.cid && this.clan.get('lst_evt')){
				var html = this.template({ eventos: this.clan.get('lst_evt') })
				this.$el.html(html)
			}
			//this.$el.html(this.template)
			return this
		}
	})

	return home
})