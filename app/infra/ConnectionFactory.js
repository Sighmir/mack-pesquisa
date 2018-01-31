

var mysql  = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
        host:"us-cdbr-iron-east-05.cleardb.net",//"127.0.0.1",
        database:"heroku_59cde3663ed2f89",//"controladoria",
        user:"b63078ab490d35",//"root",
        password:"8d96f31d",//"root",
        typeCast: function castField( field, useDefaultTypeCasting ) {

            // We only want to cast bit fields that have a single-bit in them. If the field
            // has more than one bit, then we cannot assume it is supposed to be a Boolean.
            if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
    
                var bytes = field.buffer();
    
                // A Buffer in Node represents a collection of 8-bit unsigned integers.
                // Therefore, our single "bit field" comes back as the bits '0000 0001',
                // which is equivalent to the number 1.
                return( bytes[ 0 ] === 1 );
    
            }
    
            return( useDefaultTypeCasting() );
    
        },
        multipleStatements: true
    })
}

module.exports = function(){
    return createDBConnection;
}