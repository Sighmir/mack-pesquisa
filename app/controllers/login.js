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

        req.assert("email", "Digite um e-mail inválido!").isEmail();
        req.assert("senha", "Digite uma senha válida!").notEmpty();

        var erros = req.validationErrors();
        
        
        if(!erros){
            console.log("Usuario valido");
            usuarioDAO.buscarPorEmail(usuario, function(error, resultado){
                 if(error){
                     console.log("Erro de banco: "+error)
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