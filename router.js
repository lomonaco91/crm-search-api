var service = require('./service');

module.exports = function (server) {
    server.get('/doctors', service.getDoctors);
}