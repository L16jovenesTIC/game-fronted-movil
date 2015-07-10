
define(function(require){    
    Backbone = require('backbone');
    require('bootstrap')

    var Router = Backbone.Router.extend({
        routes: {
            "": "rIntro",
            "homenoreg": "rHomeNoReg",
            "homegame": "rHomeGame",
            "selupz": "rSelUPZ",
        },
        initialize: function (){
            Backbone.history.start({root: "/"});

            // Inicia el menú lateral
            classie = require('mp/classie')
            this.mp = new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'trigger' ) );
            //debugger
        },
        //Metodo se ejecuta antes de entrar a cualquier controlador
        execute:function(call,args){
            if(this.main){
                this.main.remove()
                this.mp._resetMenu()
            }
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
        }
    });

    return Router;

})