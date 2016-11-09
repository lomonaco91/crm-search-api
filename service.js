var crmDAO = require('./crmDAO');

module.exports = {
    getDoctors: function (request, response, next) {
        //Acesso ao banco
        crmDAO.getDoctors(request.params, function (err, rows) {
            if (err) {
                response.status(500);
            } else {
                response.json(rows);
            }
            next();
        });
    }
};