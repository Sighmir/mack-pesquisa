var addSubtractDate = require("add-subtract-date");
var moment = require('moment');
var nodeExcel=require('excel-export');
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
            
            if(req.session.email != objeto.email){
                usuarioDAO.atualizaAcesso(objeto, function(erro, resultado){
                    if(erro){
                        res.status(500).json("Erro");
                        return;
                    }else{
                        res.status(200).json("Operação realizada com sucesso");
                    }
                    connection.end();
                });
            }else{
                res.status(500).json("Erro");
            }
            
        })

        app.get("/controladoria/admin/excel/:id", function(req,res){
             var conf={}
            conf.cols= montaColunasExcel();

            var id = req.params.id;

            var connection = new app.infra.ConnectionFactory();
            var excelDAO = new app.persistencia.ExcelDAO(connection);

            excelDAO.extrairDados(id, function(erro, linhas){
                if(erro){
                    res.status(500);
                    res.end("Erro ao realizar download");
                    return;
                }
                excelDAO.mesclarIndicadores(id, function(erro, resultado){
                    if(erro){
                        res.status(500);
                        res.end("Erro ao realizar download");
                        return;
                    }
                    for(var i=0; i< 11; i++){
                        linhas[i].ind_desc = resultado[i].ind_desc;
                        linhas[i].ind_nota = resultado[i].nota;
                    }
                    var arrayLinhas = [];
                    for(i=0; i<linhas.length;i++){
                        var a = [linhas[i].nome, linhas[i].email,linhas[i].obj_desc,linhas[i].obj_nota, linhas[i].ind_desc, linhas[i].ind_nota];
                        arrayLinhas.push(a);
                    }
                        conf.rows = arrayLinhas;
                        var result=nodeExcel.execute(conf);
                        res.setHeader('Content-Type','application/vnd.openxmlformates');
                        res.setHeader("Content-Disposition","attachment;filename="+"dados.xlsx");
                        res.end(result,'binary');
                        connection.end();
                })
               
            })
            
        })

}

function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function montaColunasExcel(connection){

  return  [
            {
                caption:'Nome',
                type:'string',
                width:50
            },
            {
                caption:'email',
                type:'string',
                width:15
            },
            {
                caption:'Objetivo',
                type:'string',
                width:15
            },
            {
                caption:'Nota - Objetivo',
                type:'string',
                width:15
            },
            {
                caption:'Indicador',
                type:'Nota',
                width:15
            },
            {
                caption:'Nota - Indicador',
                type:'string',
                width:15
            }
        ];
}