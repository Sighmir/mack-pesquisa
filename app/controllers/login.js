var bcrypt = require('bcrypt');

module.exports = function(app){
    
    app.get("/controladoria/login", function(req, res){
        
        var sessao = req.session;
        var erro = req.query.erro;
        if(sessao.email){
            res.redirect("/controladoria/home");
        }else{
            res.render("login/login", {erro:erro});
        }
    })

    app.post("/controladoria/login", function(req,res){
        
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
                        res.render("login/login", {erro:erro});
                        return;
                  }
                 if(resultado[0]){
                     bcrypt.compare(usuarioLogin.senha, resultado[0].senha, function(err, senhasCombinam){
                        if (senhasCombinam){
                            console.log("Login")
                            req.session.email = usuarioLogin.email;
                            req.session.loggedTime = new Date();
							req.session.save();
                            res.redirect("/controladoria/home"); 
                            return;
                        }else{
                            var erro = "E-mail ou senha incorretos!";
                            res.render("login/login", {erro:erro});
                            return;
                        }
                    });   
                 }else{
                    var erro = "E-mail não existe, por favor realize seu cadastro!";
                    res.render("login/login", {erro:erro});
                    return;
                 }
            })
        }else{
            var erro = "E-mail ou senha incorretos!";
            res.render("login/login", {erro:erro});
            return;
        }
        
    });

    app.post("/controladoria/cadastro", function(req, res){
        var usuario = req.body;

        var connection = new app.infra.ConnectionFactory();
        var usuarioDAO = new app.persistencia.UsuarioDAO(connection);
        
        req.assert("nome", "Digite um nome válido").notEmpty();
        req.assert("email", "Digite um e-mail inválido!").isEmail().notEmpty();
        req.assert("senha", "Digite uma senha válida!").notEmpty();

        var erros = req.validationErrors();

        if(erros){
            var mensagemErro = "Por favor, preencha todos os campos corretamente!";
            res.status(500).json(mensagemErro);
            return;
        }else{
             usuarioDAO.buscarPorEmail(usuario, function(error, resultado){
                 if(error){
                     console.log("Erro de banco: "+error)
                        var mensagemErro = "Erro ao realizar cadastro!";
                        res.status(500).json(mensagemErro);
                        return;
                  }
                 if(resultado[0]){
                     console.log(resultado);
                    var mensagemErro = "Já existe uma conta utilizando este e-mail!";
                    res.status(500).json(mensagemErro);
                    return;
                 }else{
                     
                    bcrypt.hash(usuario.senha, 5, function(err, hash) {
                        if(err){
                            var mensagemErro = "Erro ao realizar cadastro!";
                            res.status(500).json(mensagemErro);
                            return;
                        }else{

                            console.log(hash);
                            usuario.senha = hash;
                            usuario.data_cadastro = new Date();
                            usuarioDAO.inserir(usuario, function(erro, resultado){
                                if(erro){
                                    console.log("Erro de banco: "+erro)
                                    var mensagemErro = "Erro ao realizar cadastro!";
                                    res.status(500).json(mensagemErro);
                                    return;
                                }else{
                                    res.status(201).json(resultado.insertId);
                                    return;
                                }
                            });
                        }
                    });
                 }
            });
        }

        
    })
}