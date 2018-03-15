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

        try {
            var connection = new app.infra.ConnectionFactory();
            var objetivoDAO = new app.persistencia.ObjetivoDAO(connection);
            var indicadorDAO = new app.persistencia.IndicadorDAO(connection);
            var ferramentaDAO = new app.persistencia.FerramentaDAO(connection);
            var viewModel = new Object();
            objetivoDAO.listar(function (err, listaObjetivos) {
                if (err) {
                    console.log("Ocorreu um erro: " + err);
                    req.session.destroy();
                    res.redirect("/controladoria/login");
                    return;
                }
                viewModel.objetivos = listaObjetivos;
                indicadorDAO.listar(function (err, listaIndicadores) {
                    if (err) {
                        console.log("Ocorreu um erro: " + err);
                        req.session.destroy();
                        res.redirect("/controladoria/login");
                        return;
                    }
                    viewModel.indicadores = listaIndicadores;
                    res.render("home/index", { viewModel: viewModel });
                })

            })
        } catch (e) {
            console.log("Erro ao obter dados do banco para listagem da pagina inicial: " + e);
            req.session.destroy();
        }
    });


    app.post("/controladoria", function (req, res) {

        var idUsuario;
        var objeto = req.body
        var dados_respondente = obtemDados(objeto);

        var connection = new app.infra.ConnectionFactory();
        var objetivoDAO = new app.persistencia.ObjetivoDAO(connection);
        var indicadorDAO = new app.persistencia.IndicadorDAO(connection);
        var usuarioDAO = new app.persistencia.UsuarioDAO(connection);

        var arrayInsertObjetivos = new Array();
        var arrayInsertIndicadores = new Array();


        var listaObjetivos = objeto.listaObjetivos;
        for (var i = 0; i < listaObjetivos.length; i++) {
            var objetivo = listaObjetivos[i];
            arrayInsertObjetivos.push([objetivo.nota, null, objetivo.id]);
        }

        var listaIndicadores = objeto.listaIndicadores;
        for (var i = 0; i < listaIndicadores.length; i++) {
            var indicador = listaIndicadores[i];
            arrayInsertIndicadores.push([indicador.nota, null, indicador.id]);
        }

        objetivoDAO.inserir(arrayInsertObjetivos, function (erro, resultado) {
            if (erro) {
                res.status(500).json(erro);
                console.log("Erro: " + erro);
                return;
            }
            console.log(`Resultado 1: ${resultado}`)
            indicadorDAO.inserir(arrayInsertIndicadores, function (erro, resultado) {
                if (erro) {
                    res.status(500).json(erro);
                    console.log("Erro: " + erro);
                    return;
                }
                console.log(`Resultado 2: ${resultado}`)
                res.status(200).json(objeto);
            })

        });



    });

    app.get("/controladoria/ferramenta/:flag", function (req, res) {

        var flag = req.params.flag === "true" ? 1 : 0;

        var connection = new app.infra.ConnectionFactory();
        var ferramentaDAO = new app.persistencia.FerramentaDAO(connection);

        ferramentaDAO.listar(flag, function (erro, resultado) {
            if (erro) {
                res.status(500).json(erro);
                console.log("Erro: " + erro);
                return;
            }
            res.status(200).json(resultado);
        })
    })

    app.post("/controladoria/ferramenta", function (req, res) {
        var objeto = req.body
        var obj = new Object();

        var flag = objeto.flag === true ? 1 : 0;
        var connection = new app.infra.ConnectionFactory();
        var ferramentaDAO = new app.persistencia.FerramentaDAO(connection);

        var arrayInsertFerramentas = new Array();

        var ferramentas = objeto.arrayFerramentas;
        for (var i = 0; i < ferramentas.length; i++) {
            var ferramenta = ferramentas[i];
            arrayInsertFerramentas.push([ferramenta.nota, ferramenta.id]);
        }
        ferramentaDAO.inserir(arrayInsertFerramentas, function (erro, resultado) {
            if (erro) {
                res.status(500).json("Erro ao inserir ferramentas: " + erro);
                connection.end();
                return;
            }
            console.log(`Resultado da inserção das ferramentas no banco: ${JSON.stringify(resultado)}`);
            ferramentaDAO.listarFerramentasBaixoUso(resultado.insertId, flag, function (erro, resultado) {
                if (erro) {
                    res.status(500).json("Erro ao inserir ferramentas: " + erro);
                    connection.end();
                    return;
                }
                res.status(200).json(resultado);
            })
        })
    })

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