function IndicadorDAO(connection){
    this._connection = connection
}

IndicadorDAO.prototype.listar = function(callback){
    this._connection.query("select * from indicador", callback);
}

module.exports = function(){
    return IndicadorDAO;
}