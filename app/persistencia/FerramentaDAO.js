var mysql  = require('mysql');

function FerramentaDAO(connection){
    this._connection = connection;
}


FerramentaDAO.prototype.buscarPorId = function(id, callback){
    this._connection.query("select * from usuario_ferramenta where id_usr = ?",[id], callback);
}

FerramentaDAO.prototype.listar = function(flag, callback){
    this._connection.query("select * from ferramenta where ferr_grande = ? ",[flag], callback);
}

FerramentaDAO.prototype.listarFerramentasBaixoUso = function(id, flag, callback){
    this._connection.query("select f.* from ferramenta f inner join usuario_ferramenta uf on f.ferr_id = uf.id_ferr where uf.id_usr_ferr > ? and uf.nota < 5 and f.ferr_grande = ?", [id, flag], callback)
}

FerramentaDAO.prototype.inserir = function(valores, callback){
    this._connection.query("INSERT INTO usuario_ferramenta (nota,id_ferr) VALUES ?",[valores] , callback)
}

FerramentaDAO.prototype.atualizar = function(valores, callback){
    var queries = '';

    valores.forEach(function (item) {
        queries += mysql.format("UPDATE usuario_ferramenta SET nota = ? WHERE id_usr = ? and id_ferr = ?; ", item);
    });

    this._connection.query(queries, callback);
}

module.exports = function(){
    return FerramentaDAO;
}