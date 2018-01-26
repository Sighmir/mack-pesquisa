function IndicadorDAO(connection){
    this._connection = connection
}

IndicadorDAO.prototype.listar = function(callback){
    this._connection.query("select * from indicador", callback);
}


IndicadorDAO.prototype.inserir = function(valores, callback){
    this._connection.query("INSERT INTO usuario_indicador (id_usr, id_ind, nota) VALUES ?",[valores] , callback)
}

module.exports = function(){
    return IndicadorDAO;
}