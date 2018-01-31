var mysql  = require('mysql');

function IndicadorDAO(connection){
    this._connection = connection
}

IndicadorDAO.prototype.buscarPorId = function(id, callback){
    this._connection.query("select * from usuario_indicador where id_usr = ?",[id], callback);
}

IndicadorDAO.prototype.listar = function(callback){
    this._connection.query("select * from indicador", callback);
}


IndicadorDAO.prototype.inserir = function(valores, callback){
    this._connection.query("INSERT INTO usuario_indicador ( nota,id_usr, id_ind) VALUES ?",[valores] , callback)
}

IndicadorDAO.prototype.atualizar = function(valores, callback){
    var queries = '';

    valores.forEach(function (item) {
        queries += mysql.format("UPDATE usuario_indicador SET nota = ? WHERE id_usr = ? and id_ind = ?; ", item);
    });

    this._connection.query(queries, callback);
}

module.exports = function(){
    return IndicadorDAO;
}