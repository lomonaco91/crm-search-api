init();

function searchDoctorsByCrm() {
    var crm = jQuery('#crmNumber').val();
    if (checkValidCrm(crm)) {
        jQuery.ajax('http://192.168.49.21:8080/doctors?crm=' + crm).done(function(response) {
            var tableBody = document.getElementById('doctors-body');
            tableBody.innerHTML = '';
            response.forEach(doctor => {
                var tr = document.createElement('tr');
                var tdCRM = document.createElement('td');
                var tdName = document.createElement('td');
                var tdState = document.createElement('td');
                var tdSpecialization = document.createElement('td');
                var tdEdit = document.createElement('td');
                var tdDelete = document.createElement('td');
                tdCRM.innerHTML = doctor.crm;
                tdName.innerHTML = doctor.nome;
                tdState.innerHTML = doctor.estado;
                tdSpecialization.innerHTML = doctor.especialidade;
                tdEdit.innerHTML = 'Editar';
                tdEdit.onclick = function() {
                    localStorage['userEdited'] = JSON.stringify(doctor);
                    window.location = './register.html';
                }
                tdDelete.innerHTML = 'Remover';
                tdDelete.onclick = function() {
                    if (confirm('Tem certeza que deseja remover ' + doctor.nome + '?')) {
                        jQuery.ajax({
                            url: 'http://192.168.49.21:8080/doctors?crm=' + doctor.crm,
                            type: 'DELETE',
                            statusCode: {
                                500: function() {
                                    alert('Houve um erro ao deletar.');
                                },
                                200: function() {
                                    searchDoctorsByCrm();
                                }
                            }
                        });
                    }
                }
                tr.appendChild(tdCRM);
                tr.appendChild(tdName);
                tr.appendChild(tdState);
                tr.appendChild(tdSpecialization);
                tr.appendChild(tdEdit);
                tr.appendChild(tdDelete);
                tableBody.appendChild(tr);
            });
        });
    } else {
        alert('CRM inválido.');
    }
}

function checkValidCrm(crm) {
    var valid = true;
    for (var i = 0; i < crm.length; i++) {
        if (isNaN(parseFloat(crm.charAt(i)))) {
            valid = false;
        }
    }
    return valid;
}

function init() {
    searchDoctorsByCrm();
    jQuery('#searchCRM').click(function() {
        searchDoctorsByCrm();
    });
}