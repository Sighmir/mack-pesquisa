var addSubtractDate = require("add-subtract-date");

module.exports = function(app){
    app.get("/controladoria/home", function(req, res){

        var dataLogin =  createDateAsUTC(new Date(req.session.loggedTime));
        var dataAtual = new Date();

        var dataLimite = createDateAsUTC(addSubtractDate.subtract(dataAtual, 30, "minutes"));
    
        if(dataLimite > dataLogin){
            req.session.destroy();
            res.redirect("/controladoria/login");
            return;
        }
        res.render("home/index")
    });

    app.post("/controladoria", function(req,res){
        console.log(req.body);
        res.json("ok");
    });

}


function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}