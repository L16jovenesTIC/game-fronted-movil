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
			this.cantidad = 4*4;
		}, 
		crearPuzzle:function(){
			this.width = 100;
			this.height = 100;
			var pos = 1 
			for(i = 0; i < 4; i++){
				for(j = 0; j < 4; j++){
					this.add(new piece({
						'background-position-x':-this.width*j, 
						'background-position-y':-this.height*i,
						//'top':this.height*i,
						//'left':this.width*j,
						'pos':pos,
					}))
					pos++
				}
			}
			var t = this.last()
			t.set({clase:'piece hueco'})
		}
	})


	var puzzle = Backbone.View.extend({
		className:'retoMain',
		events:{
			'click header>img': 'boton',
			'click .piece': 'boton',
		},
		boton: function(e) {
			e.preventDefault()
			var model = $(e.target).data('id')
			var mod = this.collection.get(model)
			
			pos1 = {'left':mod.get('left')+100,'top':mod.get('top'), pos:16}
			pos2 = {'left':mod.get('left')-100,'top':mod.get('top'), pos:16}
			pos3 = {'left':mod.get('left'),'top':mod.get('top')+100, pos:16}
			pos4 = {'left':mod.get('left'),'top':mod.get('top')-100, pos:16}

			pos = this.collection.where(pos1)[0] || this.collection.where(pos2)[0] || this.collection.where(pos3)[0] || this.collection.where(pos4)[0]
			if(pos){
				hueco = {top:pos.get('top'), left:pos.get('left')}
				mov = { top:mod.get('top'), left:mod.get('left') }

				mod.set(hueco)
				pos.set(mov)
				this.render()
			}

			console.log(mod.get('pos'))
			//Base.app.navigate('#selupz', {trigger:true})
		},
		initialize:function(){
			this.img = './img/img_20150318_150947.jpg';
			this.collection = new pieces()
			this.tablero = this.collection.clone()
			this.collection.crearPuzzle()

			//Metodo para darle una posicion aleatoria al iniciar el juego
			this.width = 100;
			this.height = 100;
			var pos = 0
			var posArray = []
			for(i = 0; i < 4; i++){
				for(j = 0; j < 4; j++){
					posArray[pos] = { top:this.height*i, left:this.width*j}
					pos++
				}
			}

			this.collection.shuffle().forEach(function(item, i ){
				console.log(posArray[i])
				item.set(posArray[i])
			})

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
			this.$el.html(html)
			return this
		}
	})

	return puzzle
})