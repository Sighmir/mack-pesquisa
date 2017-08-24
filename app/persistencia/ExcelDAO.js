function ExcelDAO(connection){
    this._connection = connection;
}

ExcelDAO.prototype.extrairDados = function(callback){
    this._connection.query("select u.nome, u.email, o.media_curto_prazo as obj_curto_prazo, o.media_longo_prazo as obj_longo_prazo ,i.media_curto_prazo as ind_curto_prazo, i.media_longo_prazo as ind_longo_prazo, o.*, i.*, f.*, du.*  from " +
	"usuario u inner join dados_usuario du " +
    "on u.id = du.id_usuario " +
    "inner join objetivo o on o.id_objetivo = du.id_objetivo " +
    "inner join indicador i on i.id_indicador = du.id_indicador "+
    "inner join ferramenta f on f.id_ferramenta = du.id_ferramenta", callback);
}

module.exports = function(){
    return ExcelDAO;
}