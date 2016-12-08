init();

function searchDoctorsByCrm() {
    var crm = jQuery('#crmNumber').val();
    if (checkValidCrm(crm)) {
        jQuery.ajax('/doctors/' + crm).done(function(response) {
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
                    swal({
                        title: "Você tem certeza?",
                        text: 'Tem certeza que deseja remover ' + doctor.nome + '?',
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "SIM! Deletar",
                        closeOnConfirm: false
                    },
                    function () {
                        jQuery.ajax({
                            url: '/doctors/' + doctor.crm,
                            type: 'DELETE',
                            statusCode: {
                                500: function() {
                                    swal("Ops!", "Houve um erro ao deletar!", "error");
                                },
                                200: function() {
                                    searchDoctorsByCrm();
                                    swal("Deletado!", "O cadastro foi deletado com sucesso!", "success");
                                }
                            }
                        });
                    });

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
        swal("Ops!", "CRM Inváliado!", "error");
    }
}

function checkValidCrm(crm) {
    console.log(crm);
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