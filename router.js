//Variáveis e definição das rotas
var service = require('./service');

module.exports = function (server) {
    server.get('/doctors', service.getDoctors);
    server.post('/doctors', service.saveDoctor);
    server.put('/doctors', service.updateDoctors);
    server.del('/doctors', service.deleteDoctor);
}