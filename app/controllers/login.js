var bcrypt = require('bcrypt-nodejs');

module.exports = function(app){

    app.get("/login", function(req, res){

        var sessao = req.session;
        var erro = req.query.erro;
        if(sessao.email){
            res.redirect("/controladoria-2018/admin/home");
        }else{
            res.render("login/login", {erro:erro});
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

            usuarioDAO.buscarPorEmail(usuarioLogin, function(error, resultado){
                 if(error){
                     console.log("Erro de banco: "+error)
                        var erro = "Email ou senha incorretos!";
                        res.render("login/login", {erro:erro});
                        connection.end();
                        return;
                  }
                 if(resultado[0]){
                     bcrypt.compare(usuarioLogin.senha, resultado[0].senha, function(err, senhasCombinam){
                        if (senhasCombinam){
                            console.log("Login")
                            req.session.email = usuarioLogin.email;
                            req.session.loggedTime = new Date();
                            req.session.save();
                            if (resultado[0].perfil == "ADMIN") {
                                var connection = new app.infra.ConnectionFactory();
                                var usuarioDAO = new app.persistencia.UsuarioDAO(connection);
                                usuarioDAO.atualizaAcesso(new Date(), usuarioLogin.email, () => {
                                    connection.end();
                                });
                                res.redirect("/controladoria-2018/admin/home");
                            }

                        }else{
                            var erro = "E-mail ou senha incorretos!";
                            res.render("login/login", {erro:erro});

                        }
                    });
                 }else{
                    var erro = "E-mail não existe, por favor realize seu cadastro!";
                    res.render("login/login", {erro:erro});
                 }
                connection.end();
            })
        }else{
            var erro = "E-mail ou senha incorretos!";
            res.render("login/login", {erro:erro});
        }
    });

}