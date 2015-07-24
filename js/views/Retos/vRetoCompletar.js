define(['backbone'], function(Backbone){

	var ng = Backbone.View.extend({
		className:'retoCompletar col-xs-12',
		events:{
			'click section button': 'boton'
		},
		boton: function(e) {
			e.preventDefault()
			var dat = this.$('form').serialize()
			Base.status.regEquipo(dat)
			//Base.app.navigate('#selupz', {trigger:true})
		},
		initialize:function(){
			//this.template = template
			this.frase = 'Este río nace en el páramo @ bajando por el cerro de @ y confluye por debajo de la tierra con el rio';
		}, 
		template: function(){
			var frase = this.frase.split('@')
			var str = '<form><p class="text-justify">'

			frase.forEach(function(item,i){
				str += item+'<input type="text" class="input-completar" name="palabra['+i+']">'
			})
			str += '</p></form>'

			return str;
		},
		render:function(){
			this.$el.html(this.template())
			//this.$('.areaJuego').html(p.render().el)
			return this
		}
	})

	return ng
})