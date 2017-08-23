function ObjetivoDAO(connection){
    this._connection = connection;
}

ObjetivoDAO.prototype.inserir = function(objetivo, callback){
    this._connection.query("insert into objetivo set ?", objetivo, callback);
}

module.exports = function(){
    return ObjetivoDAO;
}