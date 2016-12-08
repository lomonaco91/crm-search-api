//Serviços da API
var crmDAO = require('./crmDAO');

module.exports = {
    getDoctors: function (request, response, next) {
        //Acesso ao banco
        var crm = request.params.crm != null ? request.params.crm : '';
        crmDAO.getDoctors(crm, function (err, rows) {
            if (err) {
                response.status(501);
            } else {
                response.json(rows);
            }
            next();
        });
    },

    saveDoctor: function (request, response, next) {
        var doctor = request.body;
        crmDAO.saveDoctor(doctor, function (err) {
            console.log(err);
            if (err) {
                response.status(500).json(err);
            } else {
                response.sendStatus(200);
            }
            next();
        });
    },

    updateDoctors: function (request, response, next) {
        var doctor = request.body;
        crmDAO.updateDoctors(doctor, function (err) {
            if (err) {
                response.status(500).json(err);
            } else {
                response.status(200);
            }
            next();
        });
    },

    deleteDoctor: function (request, response, next) {
        if (request.params.crm) {
            crmDAO.deleteDoctor(request.params.crm, function (err, rows) {
                if (err) {
                    response.status(500).json(err);
                } else {
                    response.status(200).json(rows);
                }
                next();
            });
        } else {
            response.status(400);
        }
    }
};