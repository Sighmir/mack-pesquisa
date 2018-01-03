function FerramentaDAO(connection){
    this._connection = connection;
}


FerramentaDAO.prototype.buscarPorId = function(id, callback){
    this._connection.query("select * from ferramenta where id_ferramenta = ?",[id], callback);
}

FerramentaDAO.prototype.listar = function(callback){
    this._connection.query("select * from ferramenta", callback);
}

module.exports = function(){
    return FerramentaDAO;
}