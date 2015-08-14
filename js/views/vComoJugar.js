define(['backbone', 'text!tmpl/comoJugar.html'], function(Backbone, template){

    var comoJugar = Backbone.View.extend({
        className:'comoJugar',
        events:{
            'click header>img': 'boton'
        },
        boton: function(e) {
            e.preventDefault()
            //Base.app.navigate('#selupz', {trigger:true})
        },
        initialize:function(){
            //this.template = template
        }, 
        render:function(){
            this.$el.html(template)
            return this
        }
    })

    return comoJugar
})