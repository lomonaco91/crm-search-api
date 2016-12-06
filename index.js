//Variáveis e constantes para a criação da API, utilização de RESTIFY
var express = require('express');
var db = require('./connection');
var router = require('./router');
var cors = require('cors');
var bodyParser = require('body-parser');

//Testando a conexão com o banco, antes de subir o servidor
db.testConnection(function (err) {
    if (err) {
        console.log('MySQL connection failed.');
    } else {
        initServer();
    }
});

initServer();

//Inicia o servidor
function initServer() {
    var server = express();

    //Antes de atingir as rotas, passa por esses midllewares
    addMiddlewares(server);
    router(server);

    server.listen(8080, function () {
        console.log("Servidor online!");
    });
}

//Função para adicionar o MIDLLEWARES necessários
function addMiddlewares(server) {
    server.use(cors()); //Libera acesso de outros servidores;
    server.use(bodyParser.json()); //Fazer o parse da request
    server.use(express.static('public'));
}

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
server.listen(port, ip_address, function () {
  console.log( "Listening on " + ip_address + ", port " + port )
});


