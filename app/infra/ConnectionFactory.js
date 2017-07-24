var mysql  = require('mysql');

function createDBConnection(){
    mysql.createConnection({
        host:"localhost",
        database:"controladoria",
        user:"root",
        password:"root"
    })
}

module.exports = function(){
    return createDBConnection;
}