define(['backbone'], function(Backbone){

	var ng = Backbone.View.extend({
	className:'retoSelfie col-xs-12',
		events:{
			'click button:eq(0)': 'tomarFoto'
		},
		tomarFoto:function(e){
			var self = this
			e.preventDefault();
			console.log('entra tomar foto')
		},
		initialize:function(){
			var self = this
			this.listenTo(this.model, 'change', this.render)
			Base.status.nuevoRetoSelfie().done(function(resp){
				self.model.set(resp.dat)
			})
		}, 
		template: function(){

			var str = '<img src="'+this.model.get('img500')+'" class="img-responsive"><br><input type="file">'
			str += '<div class="col-xs-6"><button class="btn btn-default">Tomar Foto</button></div><div class="col-xs-6"><button class="btn btn-default">Voler a la UPZ</button></div>'
			return str;
		},
		render:function(){
			//this.$el.html(this.template)
			this.$el.html(this.template())
			//this.$('.areaJuego').html(p.render().el)
			return this
		}
	})

	return ng
})