function ExcelDAO(connection){
    this._connection = connection;
}

ExcelDAO.prototype.extrairDados = function(id, callback){
    this._connection.query("select u.nome, u.email, o.obj_desc, uo.nota as obj_nota, i.ind_desc, ui.nota as ind_nota from usuario_objetivo uo inner join objetivo o on uo.id_obj = o.obj_id"
      +"  inner join usuario_indicador ui on ui.id_usr = uo.id_usr "
      +"  inner join indicador i on ui.id_ind = i.ind_id"
      +"  inner join usuario u on u.id = uo.id_usr"
      +" where  u.id = ? limit 11",[id],  callback);
}

ExcelDAO.prototype.mesclarIndicadores = function(id, callback){
    this._connection.query("select * from usuario_indicador ui inner join indicador i on i.ind_id = ui.id_ind where ui.id_usr = ?", [id], callback) 
}

module.exports = function(){
    return ExcelDAO;
}