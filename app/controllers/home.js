module.exports = function(app){
    app.get("/controladoria/home", function(req, res){
        res.render("home/index")
    });

}