var addSubtractDate = require("add-subtract-date");
var XLSX = require('xlsx');
module.exports = function (app) {
    app.get("/controladoria-2018/admin/home", function (req, res) {

        var dataLogin = createDateAsUTC(new Date(req.session.loggedTime));
        var dataAtual = new Date();

        var dataLimite = createDateAsUTC(addSubtractDate.subtract(dataAtual, 30, "minutes"));

        if (dataLimite > dataLogin) {
            req.session.destroy();
            res.redirect("/controladoria-2018/login");
            return;
        }

        res.render("home/admin");
    });


    app.get("/controladoria-2018/admin/excel", function (req, res) {
        var connection = new app.infra.ConnectionFactory();
        var excelDAO = new app.persistencia.ExcelDAO(connection);

        excelDAO.extrairDados(function (erro, linhas) {
            if (erro) {
                res.status(500);
                res.end("Erro ao realizar download");
                return;
            }

            /* make the worksheet */
            var ws = XLSX.utils.json_to_sheet(linhas);

            /* add to workbook */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Dados");

            /* send download */
            var wbbuf = XLSX.write(wb, {type: 'buffer'});
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader("Content-Disposition", "attachment;filename=" + "dados.xlsx");
            res.end(wbbuf);
            connection.end();
        })

    })

}

function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}
