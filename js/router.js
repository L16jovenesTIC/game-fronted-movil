
define(function(require){    
    Backbone = require('backbone');
    require('bootstrap')

    var Router = Backbone.Router.extend({
        routes: {
            "": "rIntro",
            "homenoreg": "rHomeNoReg",
        },
        initialize: function (){
            Backbone.history.start({root: "/"});
        },
        //Metodo se ejecuta antes de entrar a cualquier controlador
        execute:function(call,args){
            if(this.main)
                this.main.remove()
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
            //debugger            
        },
        rHomeNoReg: function(){
            //this.intro = new vIntroMain({el:'#main'})
            var homenoreg = require('views/vHomeNoRegMain')
            this.main = new homenoreg()
            $('#main').html(this.main.render().el)
        }
    });

    return Router;

})