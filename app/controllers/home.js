var addSubtractDate = require("add-subtract-date");
var fs = require("fs");

module.exports = function (app) {
    app.get("/controladoria", function (req, res) {

        var dataLogin = createDateAsUTC(new Date(req.session.loggedTime));
        var dataAtual = new Date();

        var dataLimite = createDateAsUTC(addSubtractDate.subtract(dataAtual, 30, "minutes"));

        if (dataLimite > dataLogin) {
            req.session.destroy();
            res.redirect("/controladoria/login");
            return;
        }

        res.render("home/index");
    });


    app.post("/controladoria", function (req, res) {

        var idUsuario;
        var objeto = req.body
        var dados_respondente = obtemDados(objeto);

        var connection = new app.infra.ConnectionFactory();
        var usuarioDAO = new app.persistencia.UsuarioDAO(connection);

        var arrayInsertRespostas = new Array();

        function inserirDados(objeto) {
            delete objeto.nome
            delete objeto.email
            delete objeto.empresa

            objeto.data_acesso = new Date();

            usuarioDAO.inserirDadosUsuario(objeto, function (erro, resultado) {
                if (erro) {
                    res.status(500).json(erro);
                    console.log("Erro: " + erro);
                    return;
                }
                res.status(200).json(objeto)
                console.log('Resultado: ' + JSON.stringify(resultado));
                connection.end();
                return;
            });
        }
        if (objeto.nome == '') objeto.nome = 'Aninomo'
        if (objeto.email == '') objeto.email = 'Aninomo'
        if (objeto.empresa == '') objeto.empresa = 'Aninomo'

        usuarioDAO.buscarPorEmail(objeto, function (error, resultado) {
            if (error) {
                res.status(500).json(erro);
                console.log("Erro: " + erro);
                return;
            }
            if (!resultado[0]) {
                var usuario = {
                    nome: objeto.nome,
                    email: objeto.email,
                    perfil: "USUARIO",
                    empresa: objeto.empresa,
                    data_cadastro: new Date(),
                    ultimo_acesso: new Date(),
                }
                usuarioDAO.inserir(usuario, function (erro, resultado) {
                    if (erro) {
                        res.status(500).json(erro);
                        console.log("Erro: " + erro);
                        return;
                    }
                    objeto.id_usuario = resultado.insertId
                    inserirDados(objeto)
                });
            } else {
                objeto.id_usuario = resultado[0].id
                usuarioDAO.atualizaAcesso(objeto);
                inserirDados(objeto)
            }
        })
    });


    app.get("/controladoria/logoff", function (req, res) {
        req.session.destroy();
        res.redirect("/controladoria/login");
    });

    app.get("/controladoria/termo", function (req, res) {
        res.download("./app/termo/termo.pdf");
    })

}


function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function obtemDados(objeto) {
    return {
        "id_usuario": "",
        "concorrencia": objeto.concorrencia,
        "qtde_funcionarios": objeto.quantidade_funcionarios,
        "incertezas_ambientais": objeto.incertezas_ambientais
    };
}