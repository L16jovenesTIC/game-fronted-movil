define(['backbone', 'text!tmpl/reto.html'], function(Backbone, template){

	var piece  = Backbone.Model.extend({
		defaults:{
			'background-position-x':0,
			'background-position-y':0,
			clase:'piece',
		},
		initialize:function(){
			this.render()
		},
		concuerda: function(){
			if( -this.get('background-position-x') == this.get('left') &&  -this.get('background-position-y') == this.get('top') ){
				return true
			}
		},
		render:function(){
			var div = $('<div>', {class: this.get('clase')})
			div.css(this.toJSON())
			//this.set({html:div.get(0).outerHTML}) 
			return div.get(0)
		}
	})

	var pieces = Backbone.Collection.extend({
		model:piece,
		initialize:function(){
		}, 
		crearPuzzle:function(dim){
			var pos = 1 
			for(i = 0; i < 4; i++){
				for(j = 0; j < 4; j++){
					this.add(new piece({
						'background-position-x':-dim*j, 
						'background-position-y':-dim*i,
						//'top':this.height*i,
						//'left':this.width*j,
						'pos':pos,
						'width': dim,
						'height': dim
					}))
					pos++
				}
			}
			var t = this.last()
			t.set({clase:'piece hueco'})
		}, 
		validaPuzzle:function(){
			// valida si todas las piezas estan en su respectivo lugar
			var resp = _.find(this.models, function(item){
				if(!item.concuerda()){
					return true
				}
			})
			// Devuelve true si se resolvió el puzzle
			return (!resp)?true:false;
		}
	})

	var puzzle = Backbone.View.extend({
		className:'puzzle',
		events:{
			'click .piece': 'boton',
		},
		boton: function(e) {
			e.preventDefault()
			if(this.solved) return false
			var model = $(e.target).data('id')
			var mod = this.collection.get(model)
			
			pos1 = {'left':mod.get('left')+this.dim,'top':mod.get('top'), pos:16}
			pos2 = {'left':mod.get('left')-this.dim,'top':mod.get('top'), pos:16}
			pos3 = {'left':mod.get('left'),'top':mod.get('top')+this.dim, pos:16}
			pos4 = {'left':mod.get('left'),'top':mod.get('top')-this.dim, pos:16}

			pos = this.collection.where(pos1)[0] || this.collection.where(pos2)[0] || this.collection.where(pos3)[0] || this.collection.where(pos4)[0]

			if(pos){
				hueco = {top:pos.get('top'), left:pos.get('left')}
				mov = { top:mod.get('top'), left:mod.get('left') }
				mod.set(hueco)
				pos.set(mov)
				this.render()
			}
			//Base.app.navigate('#selupz', {trigger:true})
		},
		initialize:function(){
			this.listenTo(this.model, 'change', this.render)

			// Conocer el ancho del dispositivo
			this.width = $(document).width()
			var ancho = 0
			if(this.width<=450){
				this.style = {height:300, width:300}
				var ancho = 300

			}
			else if(this.width>450){
				this.style = {height:450, width:450}
				var ancho = 450 
			}

			this.solved = false;
			this.dim = ancho/4; // Dimensión
			//this.img = './img/2015-05-1311.13.23.jpg';
			this.collection = new pieces()
			this.tablero = this.collection.clone()
			this.collection.crearPuzzle(this.dim)

			//Metodo para darle una posicion aleatoria al iniciar el juego
			var pos = 0
			var posArray = []
			for(i = 0; i < 4; i++){
				for(j = 0; j < 4; j++){
					posArray[pos] = { top:this.dim*i, left:this.dim*j}
					pos++
				}
			}

			this.collection.shuffle().forEach(function(item, i ){
				item.set(posArray[i])
			})

			var mHueco = this.collection.where({clase:'piece hueco'})[0]
			this.listenTo(mHueco, 'change', this.checkSolved)

		}, 
		checkSolved:function(model){

			if( model.concuerda() && this.collection.validaPuzzle()){
				//alert('Se ha finalizado exitosamente !')
				model.set({clase:'piece'})
				this.solved = true;
			}
		},
		template: function(data){
			//var template = _.template('<div class="piece"> <%= this.forEach(function(item){ console.log(item )}) %> </div>')
			//var template = _.template('<%  _.map( <%=col%>, function(item){ return $(item.html).addClass(item.cid).get(0) }) %>')
			return _.map(data, function(item){ return $(item.render()).attr('data-id', item.cid).get(0) })
		},
		render:function(){
			var html = this.template(this.collection.models)
			//this.$el.html(this.template)
			this.$el.html(html).css(this.style)
			this.$('.piece').css('background-image', "url('"+this.model.get('img300')+"')")
			return this
		}
	})

	var puzzleContent = Backbone.View.extend({
		className:'puzzleContent',
		events:{
			'click button:eq(0)': 'enviarRespuesta',
			'click button:eq(1)': 'volverUPZ',
		},
		volverUPZ:function(e){
			e.preventDefault()
			Base.app.navigate('#selupz', {trigger:true})
		},
		enviarRespuesta:function(e){
			e.preventDefault()
			var self = this
			var resp = 't=sus'
			if(this.puzzle.solved)
				var resp = 't=val'

			Base.status.validaReto({type:"valpuzz", rid:this.model.get('rid'), resp:resp}).done(function(resp){
	        	// Reto Suspendido
	        	if(resp.std == 48){
	        		self.trigger('retoSusp', {time:resp.dat.time,rid:self.model.get('rid')})
	        	}
	        	else if(resp.std == 200) // Reto Superado
	        		self.trigger('retoSup', {})
	        })

		},
		initialize:function(){
			var self = this
			this.puzzle = new puzzle({model:this.model})
			this.seg = this.model.get('timelim')*1000 
			//this.now = new Date(0,0,0,0,0,this.seg-1)
			this.t = setInterval(function(){
				var reloj = new Date(new Date(self.seg) - Date.now())
				if(reloj.getMinutes()+reloj.getSeconds()>0){
					self.$('.relojPuzz').html(reloj.getMinutes()+':'+reloj.getSeconds())
				}else{
					self.trigger('retoSusp', {time:86399,rid:self.model.get('rid')})
					clearInterval(self.t)
				}
			}, 1000)
			// Base.status.nuevoRetoPuzzle().done(function(resp){
			// 	self.model.set(resp.dat)
			// })
		},
		render: function(){
			this.$el.html(this.puzzle.render().el)
			this.$el.append('<div class="col-xs-12 text-center"><p>Tiempo Limite: <span class="relojPuzz"></span></p></div><div class="col-xs-6"><button class="btn btn-default">Enviar</button></div><div class="col-xs-6"><button class="btn btn-default">Volver a la UPZ</button></div>')
			return this
		}
	})

	return puzzleContent
})