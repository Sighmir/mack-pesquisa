function IndicadorDAO(connection){
    this._connection = connection
}

IndicadorDAO.prototype.inserir = function(indicador, callback){
    this._connection.query("insert into indicador set ?", indicador, callback);
}

module.exports = function(){
    return IndicadorDAO;
}