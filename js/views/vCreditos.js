define(['backbone', 'text!tmpl/creditos.html'], function(Backbone, template){

    var creditos = Backbone.View.extend({
        className:'creditos',
        initialize:function(){
            //this.template = template
        }, 
        render:function(){
            this.$el.html(template)
            return this
        }
    })

    return creditos
})