var db = require('./connection');

//Exportando o DAO de médicos

module.exports = {

    //GETDOCTORS - Busca os médicos filtrando por crm
    getDoctors: function (params, cb) {
        var query = 'select * from medico';
        if (params.crm) {
            query += ' where medico.crm like \'%' + params.crm + '%\'';
        }
        db.getConnection().query(query, cb);
    },

    createDoctor: function (doctor, cb) {
        // construir a query
        var query = '';
        db.getConnection().query(query, cb);
    },

    updateDoctors: function (doctor, cb) {
        // construir a query
        var query = 'update from set..... where crm = ' +doctor.crm;
        db.getConnection().query(query, cb);
    },

    deleteDoctor: function (crm, cb) {
        // construir a query
        var query = 'delete from medico where crm = ' + crm;
        db.getConnection().query(query, cb);
    }

};