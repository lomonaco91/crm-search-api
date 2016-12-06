var mysql = require('mysql');

//Dados para a conexão com o banco de dados MYSQL
var connection = mysql.createConnection({
    host: process.env.OPENSHIFT_MYSQL_DB_HOST,
    user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
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