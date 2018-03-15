function ExcelDAO(connection){
    this._connection = connection;
}

ExcelDAO.prototype.extrairDados = function(callback){
    var query = "select uo.id_usr_obj as id, o.obj_desc as nome,  uo.nota as nota"
    +" from usuario_objetivo uo"
    +" inner join objetivo o on uo.id_obj = o.obj_id"
    +" union all"
    +" select ui.id_usr_ind as id,  i.ind_desc as nome, ui.nota as nota"
    +" from usuario_indicador ui"
    +" inner join indicador i on ui.id_ind = i.ind_id"
    +" order by id";
    this._connection.query(query,  callback);
}

ExcelDAO.prototype.mesclarIndicadores = function(id, callback){
    this._connection.query("select * from usuario_indicador ui inner join indicador i on i.ind_id = ui.id_ind where ui.id_usr = ?", [id], callback) 
}

module.exports = function(){
    return ExcelDAO;
}