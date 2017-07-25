var bcrypt = require('bcrypt');
var url = require('url');

module.exports = function(app){
    
    app.get("/login", function(req, res){
        
        var sessao = req.session;
        var erro = req.query.erro;
        var feedback = req.query.feedback;
        console.log(feedback);
        if(sessao.email){
            res.redirect("/home");
        }else{
            res.render("login/login", {erro:erro, feedback:feedback});
        }
    })

    app.post("/login", function(req,res){
        
        var usuarioLogin = req.body;
        var connection = new app.infra.ConnectionFactory();
        var usuarioDAO = new app.persistencia.UsuarioDAO(connection);

        req.assert("email", "Digite um e-mail inválido!").isEmail().notEmpty();
        req.assert("senha", "Digite uma senha válida!").notEmpty();

        var erros = req.validationErrors();
        
        
        if(!erros){
            console.log("Usuario valido");
            usuarioDAO.buscarPorEmail(usuarioLogin, function(error, resultado){
                 if(error){
                     console.log("Erro de banco: "+error)
                        var erro = "Email ou senha incorretos!";
                        res.render("login/login", {erro:erro, feedback:undefined});
                        return;
                  }
                 bcrypt.compare(usuarioLogin.senha, resultado.senha, function(err, senhasCombinam){
                        if (senhasCombinam){
                            req.session.email = usuarioLogin.email;
                            res.redirect("home/index"); 
                            return;
                        }else{
                            var erro = "Email ou senha incorretos!";
                            res.render("login/login", {erro:erro, feedback:undefined});
                            return;
                        }
                });   
            })
        }else{
            var erro = "Email ou senha incorretos!";
            res.render("login/login", {erro:erro, feedback:undefined});
            return;
        }
        
    });

    app.post("/cadastro", function(req, res){
        
        var connection = new app.infra.ConnectionFactory();
        var usuarioDAO = new app.persistencia.UsuarioDAO(connection);
        
        req.assert("nome", "Digite um nome válido").notEmpty();
        req.assert("email", "Digite um e-mail inválido!").isEmail().notEmpty();
        req.assert("senha", "Digite uma senha válida!").notEmpty();

        var erros = req.validationErrors();

        if(erros){
            req.session.destroy();
            var mensagemErro = "Por favor, preencha todos os campos corretamente!";
            res.render("login/login", {erro:"", feedback:mensagemErro});
            return;
        }

        
    })
}