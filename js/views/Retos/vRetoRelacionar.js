define(['backbone', 'text!tmpl/retoRelacionar.html', 'utils/activaSliderTouch'], function(Backbone, template){

	var ng = Backbone.View.extend({
	className:'retoRelacionar col-xs-12',
		events:{
			'click button:eq(0)': 'enviarRespuesta',
			'click button:eq(1)': 'volverUPZ',
			'click .btn-colb': 'relacionar',
			'click .lst-cola [data-id]': 'escoger',
		},
		volverUPZ:function(e){
			e.preventDefault()
			Base.app.navigate('#selupz', {trigger:true})
		},
		escoger:function(e){
			var cod_a = $(e.target).data('id') || $(e.target).parent().data('id');
			var rel = this.model.get('rel');
			var d = this.collection.where({cola:cod_a})

			if(!d.length){
				this.modelTemp = new Backbone.Model({cola:cod_a})
				this.listenTo(this.modelTemp, 'change:colb', this.cambiarRel)
				this.collection.add(this.modelTemp)
			} else {
				this.modelTemp = d[0]
			}

		},
		relacionar:function(e){
			e.preventDefault()
			$(e.target).addClass('glyphicon-ok')
			var cod_b = $(e.target).data('id')
			var num = $(e.target).data('num')
			this.modelTemp.set({colb: cod_b, numb:num})

			//$item.addClass('active')
			//this.$('#modal-retoRelacionar').modal('hide')
		},
		cambiarRel:function(e){
			this.$('[data-id='+e.get('cola')+']').html(e.get('numb'))
		},
		enviarRespuesta:function(e){
			e.preventDefault()
			var self = this
			var respArray = this.collection.map(function(item){return item.get('cola')+''+item.get('colb')})
			var str = ''
			respArray.forEach(function(item,i){ 
				i++
				str += 'codab'+i+'='+item+'&'
			})
			var resp = str.slice(0,-1)

			Base.status.validaReto({type:"valrel", rid:this.model.get('rid'), resp:resp}).done(function(resp){
	        	// Reto Suspendido
	        	if(resp.std == 48){
	        		self.trigger('retoSusp', {time:resp.dat.time,rid:self.model.get('rid')})
	        	}
	        	else if(resp.std == 200) // Reto Superado
	        		self.trigger('retoSup', {})
	        })
		},
		initialize:function(){
			//this.template = template
			this.model.set({rel:[]})
			this.collection = new Backbone.Collection()
		}, 
		template: function(data){
			return _.template(template)(data)
		},
		render:function(){
			//this.$el.html(this.template)
			this.$el.html(this.template(this.model.toJSON()))
			//require('utils/activaSliderTouch')()
			//this.$('.areaJuego').html(p.render().el)
			return this
		}
	})

	return ng
})