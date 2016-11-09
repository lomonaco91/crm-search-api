var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fabiano123',
    database: 'crmdatabase'
});

//Conexão com o banco


module.exports = {
    testConnection: function (cb) {
        connection.connect(function (err) {
            cb(err);
        });
    },
    getConnection: function(){
        return connection;
    }
};