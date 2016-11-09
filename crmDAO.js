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
    }
};