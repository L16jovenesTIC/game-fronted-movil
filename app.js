

// Require JS 

// For any third party dependencies, like jQuery, place them in the lib folder.
// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.

requirejs.config({
    baseUrl: 'js/lib',
    shim:{ 'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'bootstrap': ['jquery'],
        'jqueryMobile': ['jquery'],
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
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['backbone', 'router'], function(Backbone){

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

	var Router = require('router')
	//Base.intro = require('views')
	Base.app = new Router()

});
