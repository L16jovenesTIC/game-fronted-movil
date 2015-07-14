

// Require JS 

// For any third party dependencies, like jQuery, place them in the lib folder.
// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.

requirejs.config({
    baseUrl: 'js/lib',
    shim:{ 
    	'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'bootstrap': ['jquery'],
        'jqueryMobile': ['jquery'],
        'mp/classie': ['mp/modernizr.custom'],
        'mp/mlpushmenu': ['mp/classie','mp/modernizr.custom'],
    },
    paths: {
        jquery: 'jquery.min',
        backbone: 'backbone.min',
        underscore: 'underscore.min',
        bootstrap: 'bootstrap.min',
        jqueryMobile: 'jquery-mobile.min',
        text:'text',
        router: '../router',
        views: '../views',
        models: '../models',
        tmpl: '../tmpl',
        utils: '../utils',
        mp: 'pushmenu',
    },
    waitSeconds:0
});

window.fbAsyncInit = function() {

        FB.init({
        appId      : 750521908401740,
        //cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.3' // use version 2.2
      });

      FB.getLoginStatus(function(response) {
          console.log("llamada inicial a FB");
          console.log(response);

        // Start loading the main app file. Put all of
        // your application logic in there.
        requirejs(['backbone', 'router', 'mp/mlpushmenu', 'models/mUser'], function(Backbone){

            var Base = {
                Views : {},
                Models : {},
                Collections : {},
                Services: {},
                Router :{},
                Utils:{}
            };

            window.Base = Base;
            window.Resources = true;
            var urlServidor = "localhost";
            var usersuall = require('models/mUser')

            Base.status = new usersuall(response);

            var Router = require('router')
            //Base.intro = require('views')
            Base.app = new Router()
        });
      });
}
