var service = require('./service');

module.exports = function (server) {
    server.get('/doctors', service.getDoctors);
    server.post('/doctors', service.createDoctor);
    server.put('/doctors', service.updateDoctors);
    server.del('/doctors', service.deleteDoctor);
}