var restify = require('restify');

//Testando a conexão com o banco, antes de subir o servidor
var db = require('./connection');
var crmDAO = require('./crmDAO');

db.testConnection(function (err) {
    if (err) {
        console.log('MySQL connection failed.');
    } else {
        var server = restify.createServer();

        //Antes de atingir as rotas, passa por esses midllewares
        server.use(restify.CORS()); //Libera acesso de outros servidores;
        server.use(restify.jsonp()); //Para utilização do JSON
        server.use(restify.bodyParser()); //Fazer o parse da request
        server.use(restify.queryParser());

        server.get('/doctors', function (request, response, next) {
            //Acesso ao banco
            crmDAO.getDoctors(request.params, function (err, rows) {
                if (err) {
                    response.status(500);
                } else {
                    response.json(rows);
                }
                console.log(5);
                next();
            });
        });

        server.listen(8080, function () {
            console.log("Servidor online!");
        });
    }
});