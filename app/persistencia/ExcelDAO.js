function ExcelDAO(connection){
    this._connection = connection;
}

ExcelDAO.prototype.extrairDados = function(callback){
    var query = ""
    +"select d.id_dados_usuario as ID, u.id as UID, u.nome as Nome, u.email as Email, u.empresa as Empresa,"
    +" d.faturamento_empresa as Faturamento, d.regiao_empresa as Região, d.segmento_empresa as Segmento,"
    +" d.conhecimento-ferramentas as 'Conhecimento de Ferramentas', d.grau_volatilidade as 'Grau de Volatilidade'"
    +" d.margem_contribuicao as 'Margem de Contribuição', d.percentual_equilibrio as 'Percentual de Equilibrio',"
    +" d.margem_seguranca as 'Margem de Segurança', d.diversificacao_clientes as 'Diversificação de Clientes',"
    +" d.data_acesso as 'Data de Acesso', u.data_cadastro as 'Data de Cadastro', u.ultimo_acesso as 'Ultimo Acesso'"
    +" from usuario u"
    +" inner join dados_usuario d on u.id = d.id_usuario"
    +" order by ID";
    this._connection.query(query, callback);
}

module.exports = function(){
    return ExcelDAO;
}