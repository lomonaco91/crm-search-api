var mysql = require('mysql');

//Dados para a conexão com o banco de dados MYSQL
var connection = mysql.createConnection({
    host: 'localhost',
    user:  'root',
    password : 'fabiano123',
    port :  3306,
    database: 'crmdatabse'
});

//Teste de conexão com o banco, antes de subir o servidor
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