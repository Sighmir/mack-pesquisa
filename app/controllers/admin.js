var addSubtractDate = require("add-subtract-date");
var moment = require('moment');
module.exports = function(app){
            app.get("/controladoria/admin/home", function(req, res){

            var dataLogin =  createDateAsUTC(new Date(req.session.loggedTime));
            var dataAtual = new Date();

            var dataLimite = createDateAsUTC(addSubtractDate.subtract(dataAtual, 30, "minutes"));
        
            if(dataLimite > dataLogin){
                req.session.destroy();
                res.redirect("/controladoria/login");
                return;
            }

            var connection = new app.infra.ConnectionFactory();
            var usuarioDAO = new app.persistencia.UsuarioDAO(connection);

            usuarioDAO.listar(function(erro, resultado){
                if(erro){
                    res.render("home/admin", {lista:undefined, moment:moment});
                    return;
                }
                 res.render("home/admin", {lista:resultado, moment});
            });
            connection.end();
        });

        app.put("/controladoria/admin/acesso", function(req, res){
            var objeto = req.body;

            var connection = new app.infra.ConnectionFactory();
            var usuarioDAO = new app.persistencia.UsuarioDAO(connection);
            console.log(objeto)
            if(req.session.email != objeto.email){
                usuarioDAO.atualizaAcesso(objeto, function(erro, resultado){
                    if(erro){
                        res.status(500).json("Erro");
                        return;
                    }else{
                        res.status(200).json("Operação realizada com sucesso");
                    }
                });
            }else{
                res.status(500).json("Erro");
            }

            connection.end();
        })

}

function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}