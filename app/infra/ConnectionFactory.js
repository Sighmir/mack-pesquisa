var mysql  = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
        host:"localhost",
        database:"controladoria",
        user:"root",
        password:""
    })
}

module.exports = function(){
    return createDBConnection;
}