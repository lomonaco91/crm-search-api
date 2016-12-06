var mysql = require('mysql');

//Dados para a conexão com o banco de dados MYSQL
var connection = mysql.createConnection({
    host: process.env.OPENSHIFT_MYSQL_DB_HOST,
    user:  process.env.OPENSHIFT_MYSQL_DB_USER,
    password :  process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    port :  process.env.DB_OPENSHIFT_MYSQL_DB_PORT,
    database: process.env.OPENSHIFT_MYSQL_DB_DATABASE
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