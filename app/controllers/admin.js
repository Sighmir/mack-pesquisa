var addSubtractDate = require("add-subtract-date");
var moment = require('moment');
var nodeExcel = require('excel-export');
module.exports = function (app) {
    app.get("/controladoria/admin/home", function (req, res) {

        var dataLogin = createDateAsUTC(new Date(req.session.loggedTime));
        var dataAtual = new Date();

        var dataLimite = createDateAsUTC(addSubtractDate.subtract(dataAtual, 30, "minutes"));

        if (dataLimite > dataLogin) {
            req.session.destroy();
            res.redirect("/controladoria/login");
            return;
        }

        res.render("home/admin");
    });


    app.get("/controladoria/admin/excel", function (req, res) {
        var conf = {}
        

        var arrayLinhas = new Array();
        var connection = new app.infra.ConnectionFactory();
        var excelDAO = new app.persistencia.ExcelDAO(connection);

        excelDAO.extrairDados(function (erro, linhas) {
            if (erro) {
                res.status(500);
                res.end("Erro ao realizar download");
                return;
            }
            conf.cols = montaColunasExcel(linhas);

            var quantidade = linhas.length;
            var repeticoes = Math.round(quantidade / 36).toFixed();

            for(var i = 0; i < repeticoes; i++){
                linha = montaLinhasExcel(linhas, i*36, 36*(i+1));
                arrayLinhas.push(linha);
            }
            
            conf.rows = arrayLinhas;
            var result = nodeExcel.execute(conf);

            res.setHeader('Content-Type', 'application/vnd.openxmlformates');
            res.setHeader("Content-Disposition", "attachment;filename=" + "dados.xlsx");
            res.end(result, 'binary');
            connection.end();

        })

    })

}

function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function montaColunasExcel(resultados) {
    
    var colunas = new Array();

    for(var i = 0; i < 36; i++){
        var coluna = new Object();
        coluna.caption = resultados[i].nome;
        coluna.type = "string"
        coluna.width = 50;
        colunas.push(coluna);
    }

    return colunas;
}

function montaLinhasExcel(resultados, inicio, fim){
    var linha = new Array();

    for(var i = inicio; i < fim; i++){
        linha.push(resultados[i].nota);
    }
    
    return linha;

}