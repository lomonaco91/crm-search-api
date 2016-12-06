var db = require('./connection');

module.exports = {

    //GETDOCTORS - Busca os médicos filtrando por crm
    getDoctors: function (params, cb) {
        var query = 'select * from medico';
        if (params.crm) {
            query += ' where medico.crm like \'%' + params.crm + '%\'';
        }
        db.query(query, cb);
    },
    
    //Método para salvar o médico, se CRM único (executa insert), se CRM duplicado (executa update)
    saveDoctor: function (doctor, cb) {
        var query = 'insert into medico (`nome`, `crm`, `estado`, `especialidade`)' +
            'values (\'' + doctor.nome + '\', \'' + doctor.crm + '\', \'' + doctor.estado +
            '\', \'' + doctor.especialidade + '\') on duplicate key update ' +
            'nome = \'' + doctor.nome + '\', estado = \'' + doctor.estado + '\', ' +
            'especialidade = \'' + doctor.especialidade + '\'';
        db.query(query, cb);
    },

    updateDoctors: function (doctor, cb) {
        var query = 'update from set..... where crm = ' + doctor.crm;
        db.query(query, cb);
    },

    //Deleta um médico a partir do seu CRM (já que o CRM é uma PK no banco)
    deleteDoctor: function (crm, cb) {
        var query = 'delete from medico where crm like ' + crm;
        db.query(query, cb);
    }

};