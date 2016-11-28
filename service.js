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

    saveDoctor: function (request, response, next) {
        var doctor = request.body;
        crmDAO.saveDoctor(doctor, function (err) {
            console.log(err);
            if (err) {
                response.status(500).json(err);
            } else {
                response.send(200);
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
                    response.send(500);
                } else {
                    response.send(200);
                }
                next();
            });
        } else {
            response.status(400);
        }
    }
};