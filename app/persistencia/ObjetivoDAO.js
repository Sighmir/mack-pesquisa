var mysql  = require('mysql');

function ObjetivoDAO(connection){
    this._connection = connection;
}

ObjetivoDAO.prototype.listar = function(callback){
    this._connection.query("select * from objetivo", callback);
}

ObjetivoDAO.prototype.buscarPorId = function(id, callback){
    this._connection.query("select * from usuario_objetivo where id_usr = ?",[id], callback);
}

ObjetivoDAO.prototype.inserir = function(valores, callback){
    this._connection.query("INSERT INTO usuario_objetivo ( nota,id_usr, id_obj) VALUES ?",[valores] , callback)
}

ObjetivoDAO.prototype.atualizar = function(valores, callback){
    var queries = '';

    valores.forEach(function (item) {
        queries += mysql.format("UPDATE usuario_objetivo SET nota = ? WHERE id_usr = ? and id_obj = ?; ", item);
    });

    this._connection.query(queries, callback);
}

module.exports = function(){
    return ObjetivoDAO;
}