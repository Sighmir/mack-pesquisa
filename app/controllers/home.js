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
        var id_indicador ;

        var connection = new app.infra.ConnectionFactory();
        var objetivoDAO = new app.persistencia.ObjetivoDAO(connection);
        var indicadorDAO = new app.persistencia.IndicadorDAO(connection);
        console.log(req.body.objetivo);
        console.log(req.body.indicador);
        objetivoDAO.inserir(req.body.objetivo, function(erro, resultado){
            if(erro){
                res.status(500).json("Erro ao salvar objetivos: "+erro);
                return;
            }

             id_objetivo = resultado.insertId;
             indicadorDAO.inserir(req.body.indicador, function(erro, resultado){
                if(erro){
                    res.status(500).json("Erro ao salvar Indicadores: "+erro);
                    return;
                }
                id_indicador = resultado.insertId;
                res.json("OPA");
            });
        });

       
        console.log(id_indicador + " | " + id_objetivo);
    });

}


function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}