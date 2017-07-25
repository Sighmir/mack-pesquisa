var bcrypt = require('bcrypt');

module.exports = function(app){
    
    app.get("/login", function(req, res){
        var sessao = req.session;
        var erro = req.query.erro;
        if(sessao.email){
            res.redirect("/home");
        }else{
            res.render("login/login", {erro:erro});
        }
    })

    app.post("/login", function(req,res){
        var usuario = req.body;
        var connection = new app.infra.ConnectionFactory();
        var usuarioDAO = new app.persistencia.UsuarioDAO(connection);
        console.log(usuario);
        if(usuario.email && usuario.senha){
            console.log("Usuario valido");
            usuarioDAO.buscarPorEmail(usuario, function(erro, resultado){
                 if(erro || !usuario){
                        var erro = "Email ou senha incorretos!";
                        res.render("login/login", {erro:erro});
                        return;
                  }
                 bcrypt.compare(usuario.senha, resultado.senha, function(err, senhasCombinam){
                        if (senhasCombinam){
                            res.redirect("home/index"); 
                            return;
                        }else{
                            var erro = "Email ou senha incorretos!";
                            res.render("login/login", {erro:erro});
                            return;
                        }
                });   
            })
        }else{
            var erro = "Email ou senha incorretos!";
                            res.render("login/login", {erro:erro});
                            return;;
        }
        
    })
}