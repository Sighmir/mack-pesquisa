var bcrypt = require('bcrypt');

module.exports = function(app){
    
    app.get("/login", function(req, res){
        var sessao = req.session;
        if(sessao.email){
            res.redirect("/home");
        }else{
            res.render("login/login");
        }
    })

    app.post("/login", function(req,res){
        var usuario = req.body;
        var connection = new app.infra.ConnectionFactory();
        var usuarioDAO = new app.persistencia.UsuarioDAO();
        if(usuario.email && usuario.senha){
            bcrypt.hash(usuario.senha, 5, function( err, bcryptedPassword) {
                usuarioDAO.buscarPorEmail(usuario, function(erro, resultado){
                    if(erro){
                        res.redirect
                    }
                })
            });
        }
    })
}