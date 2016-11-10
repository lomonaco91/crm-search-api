var crmDAO = require('./crmDAO');

module.exports = {
    getDoctors: function (request, response, next) {
        //Acesso ao banco
        crmDAO.getDoctors(request.params, function (err, rows) {
            if (err) {
                response.status(501);
            } else {
                response.json(rows);
            }
            next();
        });
    },

    createDoctor: function (request, response, next) {
        var doctor = request.body;
        crmDAO.createDoctor(doctor, function (err) {
            if (err) {
                response.status(500).json(err);
            } else {
                response.status(200);
            }
            next();
        });
    },

    updateDoctors: function (request, response, next) {
        var doctor = request.body;
        crmDAO.updateDoctor(doctor, function (err) {
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
            crm.DAO.deleteDoctor(params.crm, function (err, rows) {
                if (err) {
                    response.status(501);
                } else {
                    response.status(200);
                }
                next();
            });
        } else {
            response.status(400);
        }
    }
};