function FerramentaDAO(connection){
    this._connection = connection;
}

FerramentaDAO.prototype.inserir = function(ferramenta, callback){
    this._connection.query("insert into ferramenta  set ?", ferramenta,callback);
}

FerramentaDAO.prototype.buscarPorId = function(id, callback){
    this._connection.query("select * from ferramenta where id_ferramenta = ?",[id], callback);
}

module.exports = function(){
    return FerramentaDAO;
}