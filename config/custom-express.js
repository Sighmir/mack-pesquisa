var express = require('express');
var consign = require('consign');

module.exports = function(){
    var app = express();

    app.use("views", "./app/views/")
    app.use("view engine", "ejs");
    app.use(express.static("./app/public"))

    consign().
    include("controllers")
    .into(app);

    return app;
}