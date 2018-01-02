var addSubtractDate = require("add-subtract-date");

module.exports = function(app){
    app.get("/controladoria/home", function(req, res){

        var dataLogin =  createDateAsUTC(new Date(req.session.loggedTime));
        var dataAtual = new Date();

        var dataLimite = createDateAsUTC(addSubtractDate.subtract(dataAtual, 30, "minutes"));
    
        if(dataLimite > dataLogin){
            req.session.destroy();
            res.redirect("/controladoria/login");
            return;
        }
        res.render("home/index")
    });

    
    app.post("/controladoria", function(req,res){
        
        var id_objetivo;
        var id_indicador;
        var id_usuario;
        var objetivo = req.body.objetivo;
        var indicador = req.body.indicador;
        var ferramenta = req.body.ferramenta;
        var dados_respondente = obtemDados(req);
        var obj = new Object();
        obj.email = req.session.email;

        var connection = new app.infra.ConnectionFactory();
        var objetivoDAO = new app.persistencia.ObjetivoDAO(connection);
        var indicadorDAO = new app.persistencia.IndicadorDAO(connection);
        var usuarioDAO = new app.persistencia.UsuarioDAO(connection);
        var ferramentaDAO = new app.persistencia.FerramentaDAO(connection);

        objetivoDAO.inserir(objetivo, function(erro, resultado){
            if(erro){
                res.status(500).json("Erro ao salvar objetivos: "+erro);
                connection.end();
                return;
            }

             id_objetivo = resultado.insertId;
             indicadorDAO.inserir(indicador, function(erro, resultado){
                if(erro){
                    res.status(500).json("Erro ao salvar Indicadores: "+erro);
                    connection.end();
                    return;
                }
                id_indicador = resultado.insertId;
                usuarioDAO.buscarPorEmail(obj, function(erro, resultado){
                    if(erro){
                        res.status(500).json("Erro ao obter dados do usuário: "+erro);
                        connection.end();
                        return;
                    }
                    id_usuario = resultado[0].id;
                    ferramentaDAO.inserir(ferramenta, function(erro, resultado){
                        if(erro){
                            res.status(500).json("Erro ao salvar ferramentas: "+erro);
                            connection.end();
                            return;
                        }
                        
                        dados_respondente.id_objetivo = id_objetivo;
                        dados_respondente.id_indicador = id_indicador;
                        dados_respondente.id_usuario = id_usuario;
                        dados_respondente.id_ferramenta = resultado.insertId;
                        
                        usuarioDAO.inserirDadosUsuario(dados_respondente, function(erro, resultado){
                            if(erro){
                                res.status(500).json("Erro ao salvar dados: "+erro);
                                connection.end();
                                return;
                            }
                            res.status(201).json("Dados salvos com sucesso");
                            
                        });
                    })
                });
            });
        });
        
    });

    app.get("/controladoria/logoff", function(req, res){
         req.session.destroy();
         res.redirect("/controladoria/login");
    });

}


function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function obtemDados(req){
    return {
        "tipo_empresa" : req.body.tipo_empresa,
		"qtde_funcionarios" : req.body.quantidade_funcionarios,
		"setor" : req.body.setor,
		"setor_usuario" : req.body.setor_usuario,
		"nivel_usuario" : req.body.nivel_usuario,
    };
}