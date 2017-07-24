module.exports = function(app){
    
    app.get("/login", function(req, res){
        console.log("Chegou aqui")
        var sessao = req.session;
        if(sessao.email){
            res.redirect("/home");
        }else{
            res.render("login/login");
        }
    })

    app.post("/login/autentica", function(req,res){
        
    })
}