

// Require JS 

// For any third party dependencies, like jQuery, place them in the lib folder.
// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.

window.urlServidor = 'http://backendsuall.elasticbeanstalk.com';

requirejs.config({
    baseUrl: 'js/lib',
    config:{
        'models/mUser':{ urlServer: urlServidor }
    },
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
        puzzle: 'Sliding Puzzle_files',

    },
    waitSeconds:0
});


    // Start loading the main app file. Put all of
    // your application logic in there.
    requirejs(['backbone', 'router', 'mp/mlpushmenu', 'models/mUser', 'views/vPuzzle'], function(Backbone){

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
        //Base.urlServidor = "http://backendsuall.elasticbeanstalk.com/";

        var usersuall = require('models/mUser')

        // Creamos el modelo de Usuario
        Base.status = new usersuall({status:'connected'});

        var Router = require('router')
        //Base.intro = require('views')
        Base.app = new Router()
    });
      
