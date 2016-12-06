var mysql = require('mysql');

//Dados para a conexão com o banco de dados MYSQL
var connection = mysql.createConnection({
    host: process.env.OPENSHIFT_MYSQL_DB_HOST,
    user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    database: 'crmdatabase'
});

connection.connect(function(err){
    if (err) throw err;
});

module.exports = connection;