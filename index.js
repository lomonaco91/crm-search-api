//Variáveis e constantes para a criação da API, utilização de RESTIFY
var restify = require('restify');
var db = require('./connection');
var router = require('./router');

//Testando a conexão com o banco, antes de subir o servidor
db.testConnection(function (err) {
    if (err) {
        console.log('MySQL connection failed.');
    } else {
        initServer();
    }
});

//Inicia o servidor
function initServer() {
    var server = restify.createServer();

    //Antes de atingir as rotas, passa por esses midllewares
    addMiddlewares(server);
    router(server);

    server.listen(8080, function () {
        console.log("Servidor online!");
    });
}

//Função para adicionar o MIDLLEWARES necessários
function addMiddlewares(server) {
    server.use(restify.CORS()); //Libera acesso de outros servidores;
    server.use(restify.jsonp()); //Para utilização do JSON
    server.use(restify.bodyParser()); //Fazer o parse da request
    server.use(restify.queryParser()); // Faz o parse da querystring em objeto
}
