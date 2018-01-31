function UsuarioDAO(connection){
    this._connection = connection;
}

UsuarioDAO.prototype.inserir = function(usuario, callback){
    this._connection.query("insert into usuario set ?", usuario,callback);
}

UsuarioDAO.prototype.buscarPorEmail = function(usuario, callback){
    this._connection.query("select * from usuario where email = ?",[usuario.email], callback);
}

UsuarioDAO.prototype.listar = function(callback){
    this._connection.query("select * from usuario", callback);
}

UsuarioDAO.prototype.atualizaAcesso = function(objeto, callback){
    this._connection.query("update usuario set perfil = ? where email = ?", [objeto.acesso,objeto.email] , callback);
}

UsuarioDAO.prototype.inserirDadosUsuario = function(dados_usuario, callback){
    this._connection.query("insert into dados_usuario set ?", dados_usuario,callback);
}

UsuarioDAO.prototype.atualizarDadosUsuario = function(dados, callback){
    this._connection.query("update dados_usuario set concorrencia =  ?, qtde_funcionarios = ?, incertezas_ambientais = ? WHERE id_usuario = ?", [dados.concorrencia, dados.qtde_funcionarios, dados.incertezas_ambientais, dados.id_usuario],callback);
}

module.exports = function(){
    return UsuarioDAO;
}