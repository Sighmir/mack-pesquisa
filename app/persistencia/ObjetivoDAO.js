function ObjetivoDAO(connection){
    this._connection = connection;
}

ObjetivoDAO.prototype.listar = function(callback){
    this._connection.query("select * from objetivo", callback);
}

module.exports = function(){
    return ObjetivoDAO;
}