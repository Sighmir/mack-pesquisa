var mysql  = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
        host:"127.0.0.1",
        database:"controladoria",
        user:"root",
        password:""
    })
}

module.exports = function(){
    return createDBConnection;
}