var express = require('express');
var consign = require('consign');
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var session = require('express-session');

module.exports = function(){
    var app = express();

    app.use(express.static("./app/public"));
    app.set("views", "./app/views/")
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json())
    app.use(expressValidator());
    app.use(session({
        secret: 'controladoria',
        name: 'myCookie',
        resave: true,
        saveUninitialized: true
    }));


    app.use(function(req, res, next){
        var sessao = req.session;

        if(!sessao.email && req.url != "/controladoria/login" && req.url != "/controladoria/cadastro"){
            res.redirect("/controladoria/login");
        }else{
            next();
        }
    });


    

    consign({cwd:'app'})
    .include("controllers")
    .then("infra")
    .then("persistencia")
    .into(app);

    return app;
}