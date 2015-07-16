
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
            "error": "rError",
            "reto": "rReto",
        },
        initialize: function (){
            Backbone.history.start({root: "/"});

            // Inicia el menú lateral
            classie = require('mp/classie')
            this.mp = new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'trigger' ) );
        },
        //Metodo se ejecuta antes de entrar a cualquier controlador
        execute:function(call,args){
            if(this.main){
                this.main.remove()
                this.mp._resetMenu()
            }
            $('body').removeClass('loading')
            // Aqui el codigo adicional
            call.apply(this,args)
        },
        rIntro: function(){
            //this.intro = new vIntroMain({el:'#main'})
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
        },
        rSelUPZ: function(){
            //this.intro = new vIntroMain({el:'#main'})
            var selupz = require('views/vSelUpzMain')
            this.main = new selupz()
            $('#main').html(this.main.render().el)
            // Activa la opción de deslizar la galeria con gestos Touch
            require('utils/activaSliderTouch')()
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
        rError: function(){
            //this.intro = new vIntroMain({el:'#main'})
            var retoSup = require('views/vErrorMain')
            this.main = new retoSup()

            $('#main').html(this.main.render().el)
        },
        rReto: function(){
            //this.intro = new vIntroMain({el:'#main'})
            var retoSup = require('views/vRetoMain')
            this.main = new retoSup()

            $('#main').html(this.main.render().el)
            //puzzle = require('puzzle/sliding')
            //puzzle()
        }
    });

    return Router;

})