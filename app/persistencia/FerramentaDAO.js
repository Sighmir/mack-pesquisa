function FerramentaDAO(connection){
    this._connection = connection;
}


FerramentaDAO.prototype.buscarPorId = function(id, callback){
    this._connection.query("select * from ferramenta where id_ferramenta = ?",[id], callback);
}

FerramentaDAO.prototype.listar = function(flag, callback){
    this._connection.query("select * from ferramenta where ferr_grande = ? ",[flag], callback);
}

FerramentaDAO.prototype.listarFerramentasBaixoUso = function(idUsuario, callback){
    this._connection.query("select * from usuario_ferramenta where id_usr = ? and nota < 5", [idUsuario], callback)
}

FerramentaDAO.prototype.inserir = function(valores, callback){
    this._connection.query("INSERT INTO usuario_ferramenta (id_usr, id_ferr, nota) VALUES ?",[valores] , callback)
}

module.exports = function(){
    return FerramentaDAO;
}