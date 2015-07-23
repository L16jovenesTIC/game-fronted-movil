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
			'click header>img': 'boton',
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
				alert('Se ha finalizado exitosamente !')
				model.set({clase:'piece'})
				this.solved = true;
			}
		},
		template: function(data){
			//var template = _.template('<div class="piece"> <%= this.forEach(function(item){ console.log(item )}) %> </div>')
			//var template = _.template('<%  _.map( <%=col%>, function(item){ return $(item.html).addClass(item.cid).get(0) }) %>')

			return _.map(data, function(item){ return $(item.render()).attr('data-id', item.cid).get(0) })
			//return _.map( data , function(item){ return $(item.html).addClass(item.cid).get(0) })
			return template({col:data})
		},
		render:function(){
			var html = this.template(p.collection.models)
			//this.$el.html(this.template)
			this.$el.html(html).css(this.style)
			return this
		}
	})

	return puzzle
})