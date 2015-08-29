
define(function(require){    
    Backbone = require('backbone');
    require('bootstrap')

    var Router = Backbone.Router.extend({
        routes: {
            "": "rIntro",
            "homenoreg": "rHomeNoReg",
            "homegame": "rHomeGame",
            "selupz": "rSelUPZ",
            "retosup": "rRetoSuperado",
            "retosusp": "rRetoSuspendido",
            "retovali": "rRetoValidando",
            "error(/:msg)": "rError",
            "newgroup": "rNuevoGrupo",
            "migrupo": "rGrupoClan",
            "comojugar": "rComoJugar",
            "creditos": "rCreditos",
        },
        initialize: function (){

            // Inicia el menú lateral
            classie = require('mp/classie')
            this.mp = new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'trigger' ) );
            // Desabilitamos los links al inicio
            $('.menuList .disabled').on('click', function(e){
                e.preventDefault()
            })
            $('#sonido').on('click', function(e){
                var sonido = $('#sonido-fondo').get(0)

                if($(this).hasClass('active')){
                    sonido.play()
                    this.innerHTML = 'Sound On'
                }
                else {
                    sonido.pause()
                    this.innerHTML = 'Sound Off'
                }

            })
            var alertas = require('views/vModal')
            this.vModal = new alertas({model:new Backbone.Model()})
            this.vModal.render()

            Backbone.history.start({root: "/"});
        },
        //Metodo se ejecuta antes de entrar a cualquier controlador
        execute:function(call,args){
            if(this.main){
                this.main.remove()
                //Esconde el menú lateral
                this.mp._resetMenu()
            }
            $('body').removeClass('loading')
            // Aqui el codigo adicional
            call.apply(this,args)
        },
        rIntro: function(){
            if(!supports_html5_storage()){
                $('#main').html('NO SOPORTA EL LOCALSTORAGE')
                //$('#main').append(JSON.stringify(Base.status.toJSON()))
                $('#main').append(localStorage.getItem('session')+' - '+localStorage.length)
                return false
            }
            var intro = require('views/vIntroMain')
            this.main = new intro()
            $('#main').html(this.main.render().el)
            // Activa la opción de deslizar la galeria con gestos Touch
            require('utils/activaSliderTouch')()
        },
        rHomeNoReg: function(){
            //this.intro = new vIntroMain({el:'#main'})
            var homenoreg = require('views/vHomeNoRegMain')
            this.main = new homenoreg()
            $('#main').html(this.main.render().el)
        },
        rHomeGame: function(){
            //this.intro = new vIntroMain({el:'#main'})
            var homegame = require('views/vHomeGameMain')
            this.main = new homegame()
            $('#main').html(this.main.render().el)
            //Mensaje de ayuda
            this.vModal.model.set({help:'Aqui puedes ver todas las actividades de tu equipo'})
        },
        rSelUPZ: function(){
            //this.intro = new vIntroMain({el:'#main'})
            var selupz = require('views/vSelUpzMain')
            this.main = new selupz()
            $('#main').html(this.main.render().el)
            // Activa la opción de deslizar la galeria con gestos Touch
            require('utils/activaSliderTouch')()
            //Mensaje de ayuda
            this.vModal.model.set({help:'Seleccione la UPZ en la que desea participar'})
        },
        rRetoSuperado: function(){
            //this.intro = new vIntroMain({el:'#main'})
            var retoSup = require('views/vRetoSup')
            this.main = new retoSup()
            $('#main').html(this.main.render().el)
        },
        rRetoSuspendido: function(){
            //this.intro = new vIntroMain({el:'#main'})
            var retoSup = require('views/vRetoSusp')
            this.main = new retoSup()

            $('#main').html(this.main.render().el)
        },
        rRetoValidando: function(){
            //this.intro = new vIntroMain({el:'#main'})
            var retoSup = require('views/vRetoVali')
            this.main = new retoSup()

            $('#main').html(this.main.render().el)
        },
        rError: function(msg){
            //this.intro = new vIntroMain({el:'#main'})
            var retoSup = require('views/vErrorMain')
            this.main = new retoSup({model:new Backbone.Model({msg:msg})})

            $('#main').html(this.main.render().el)
            //Mensaje de ayuda
            this.vModal.model.set({help:'Ocurrio algo inesperado'})
        },
        rNuevoGrupo: function(){
            //this.intro = new vIntroMain({el:'#main'})
            var retoSup = require('views/vNuevoGrupoMain')
            this.main = new retoSup()

            $('#main').html(this.main.render().el)

            //Mensaje de ayuda
            this.vModal.model.set({help:'Si ya estas registrado en un grupo, por favor ingresa las credenciales'})
        },
        rGrupoClan: function(){
            var clan = Base.status.get('clan')
            //this.intro = new vIntroMain({el:'#main'})
            var vMiGrupo = require('views/vMiGrupoMain')
            this.main = new vMiGrupo({model:clan})

            $('#main').html(this.main.render().el)

            //Mensaje de ayuda
            this.vModal.model.set({help:'Aqui puedes encontrar la información del grupo'})
        },
        rComoJugar: function(){
            var vComoJugar = require('views/vComoJugar')
            this.main = new vComoJugar()

            $('#main').html(this.main.render().el)

            //Mensaje de ayuda
            this.vModal.model.set({help:'Estas son las instrucciones del juego'})
        },
        rCreditos: function(){
            var vCreditos = require('views/vCreditos')
            this.main = new vCreditos()

            $('#main').html(this.main.render().el)

            //Mensaje de ayuda
            this.vModal.model.set({help:'El equipo para que todo esto fuera posible'})
        }
    });

    return Router;

})