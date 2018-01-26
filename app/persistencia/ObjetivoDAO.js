function ObjetivoDAO(connection){
    this._connection = connection;
}

ObjetivoDAO.prototype.listar = function(callback){
    this._connection.query("select * from objetivo", callback);
}


ObjetivoDAO.prototype.inserir = function(valores, callback){
    this._connection.query("INSERT INTO usuario_objetivo (id_usr, id_obj, nota) VALUES ?",[valores] , callback)
}

module.exports = function(){
    return ObjetivoDAO;
}