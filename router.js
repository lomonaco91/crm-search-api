var service = require('./service');

module.exports = function (server) {
    server.get('/doctors', service.getDoctors);
    server.post('/doctors', service.createDoctor);
    server.put('/doctors', service.updateDoctor);
    server.delete('doctors', service.deleteDoctor);
}