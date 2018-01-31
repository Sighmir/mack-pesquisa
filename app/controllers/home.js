var addSubtractDate = require("add-subtract-date");

module.exports = function (app) {
    app.get("/controladoria/home", function (req, res) {

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
                    errorHandler(err);
                    return;
                }
                viewModel.objetivos = listaObjetivos;
                indicadorDAO.listar(function (err, listaIndicadores) {
                    if (err) {
                        errorHandler(err);
                        return;
                    }
                    viewModel.indicadores = listaIndicadores;
                    res.render("home/index", { viewModel: viewModel });
                })

            })
        } catch (e) {
            console.log("Erro ao obter dados do banco para listagem da pagina inicial: " + e);
            errorHandler(err);
        }
    });


    app.post("/controladoria", function (req, res) {

        var idUsuario;
        var objeto = req.body
        var dados_respondente = obtemDados(objeto);
        console.log("Dados do respondente: " + JSON.stringify(dados_respondente));
        var obj = new Object();
        obj.email = req.session.email;

        var connection = new app.infra.ConnectionFactory();
        var objetivoDAO = new app.persistencia.ObjetivoDAO(connection);
        var indicadorDAO = new app.persistencia.IndicadorDAO(connection);
        var usuarioDAO = new app.persistencia.UsuarioDAO(connection);

        var arrayInsertObjetivos = new Array();
        var arrayInsertIndicadores = new Array();
        usuarioDAO.buscarPorEmail(obj, function (erro, usuarios) {

            if (erro) {
                res.status(500).json("Erro ao obter dados do usuário: " + erro);
                connection.end();
                return;
            }
            idUsuario = usuarios[0].id;
            dados_respondente.id_usuario = idUsuario;
            console.log("Id do usuário: " + idUsuario);
            var listaObjetivos = objeto.listaObjetivos;
            for (var i = 0; i < listaObjetivos.length; i++) {
                var objetivo = listaObjetivos[i];
                arrayInsertObjetivos.push([objetivo.nota, idUsuario, objetivo.id]);
            }

            var listaIndicadores = objeto.listaIndicadores;
            for (var i = 0; i < listaIndicadores.length; i++) {
                var indicador = listaIndicadores[i];
                arrayInsertIndicadores.push([indicador.nota, idUsuario, indicador.id]);
            }
            console.log("Array objetivos: " + arrayInsertObjetivos);
            console.log("Array indicadores: " + arrayInsertIndicadores);

            objetivoDAO.buscarPorId(idUsuario, function (erro, resultado) {
                if (erro) {
                    res.status(500).json("Erro ao obter dados do usuário: " + erro);
                    connection.end();
                    return;
                }
                if (resultado[0]) {
                    usuarioDAO.atualizarDadosUsuario(dados_respondente, function(erro, resultado){
                        if(erro){
                            res.status(500).json(erro);
                            console.log("Erro: "+erro);
                            return
                        }
                        objetivoDAO.atualizar(arrayInsertObjetivos, function (erro, resultado) {
                            if (erro) {
                                res.status(500).json(erro);
                                console.log("Erro: " + erro);
                                return;
                            }
                            console.log(`Resultado 1: ${resultado}`)
                            indicadorDAO.atualizar(arrayInsertIndicadores, function (erro, resultado) {
                                if (erro) {
                                    res.status(500).json(erro);
                                    console.log("Erro: " + erro);
                                    return;
                                }
                                console.log(`Resultado 2: ${resultado}`)
                                res.status(200).json(objeto);
                            })
    
                        });
                    })
                } else {
                    usuarioDAO.inserirDadosUsuario(dados_respondente, function (erro, resultado) {
                        if (erro) {
                            res.status(500).json(erro);
                            console.log("Erro: " + erro);
                            return;
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
                    })
                }
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
        var idUsuario;
        var objeto = req.body
        var obj = new Object();
        obj.email = req.session.email;

        var flag = objeto.flag === true ? 1 : 0;
        var connection = new app.infra.ConnectionFactory();
        var ferramentaDAO = new app.persistencia.FerramentaDAO(connection);
        var usuarioDAO = new app.persistencia.UsuarioDAO(connection);

        var arrayInsertFerramentas = new Array();

        usuarioDAO.buscarPorEmail(obj, function (erro, usuarios) {

            if (erro) {
                res.status(500).json("Erro ao obter dados do usuário: " + erro);
                connection.end();
                return;
            }
            idUsuario = usuarios[0].id;
            var ferramentas = objeto.arrayFerramentas;
            for (var i = 0; i < ferramentas.length; i++) {
                var ferramenta = ferramentas[i];
                arrayInsertFerramentas.push([ferramenta.nota, idUsuario, ferramenta.id]);
            }
            console.log(arrayInsertFerramentas);
            ferramentaDAO.buscarPorId(idUsuario, function (erro, resultado) {
                if (erro) {
                    res.status(500).json("Erro ao obter dados do usuário: " + erro);
                    connection.end();
                    return;
                }
                if (!resultado[0]) {
                    ferramentaDAO.inserir(arrayInsertFerramentas, function (erro, resultado) {
                        if (erro) {
                            res.status(500).json("Erro ao inserir ferramentas: " + erro);
                            connection.end();
                            return;
                        }

                        ferramentaDAO.listarFerramentasBaixoUso(idUsuario, flag, function (erro, resultado) {
                            if (erro) {
                                res.status(500).json("Erro ao inserir ferramentas: " + erro);
                                connection.end();
                                return;
                            }
                            res.status(200).json(resultado);
                        })
                    })
                } else {
                    ferramentaDAO.atualizar(arrayInsertFerramentas, function (erro, resultado) {
                        if (erro) {
                            res.status(500).json("Erro ao atualizar ferramentas: " + erro);
                            connection.end();
                            return;
                        }

                        ferramentaDAO.listarFerramentasBaixoUso(idUsuario, flag, function (erro, resultado) {
                            if (erro) {
                                res.status(500).json("Erro ao inserir ferramentas: " + erro);
                                connection.end();
                                return;
                            }
                            res.status(200).json(resultado);
                        })
                    })
                }
            })
        })
    })

    app.get("/controladoria/logoff", function (req, res) {
        req.session.destroy();
        res.redirect("/controladoria/login");
    });



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