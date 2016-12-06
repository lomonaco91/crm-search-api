init();

function crmInput() {
    return jQuery('#txtID');
}

function nameInput() {
    return jQuery('#txtName');
}

function stateInput() {
    return jQuery('#select');
}

function specializationInput() {
    return jQuery('#txtSpecialization');
}

function init() {
    if (isEdit()) {
        populateForm();
        clearLocalStorage();
    }
    jQuery('#formRegistration').submit(function () {
        event.preventDefault();
        var doctor = {
            crm: crmInput().val(),
            nome: nameInput().val(),
            estado: stateInput().find('option:selected').text(),
            especialidade: specializationInput().val()
        };
        jQuery.ajax({
            url: 'http://192.168.49.21:8080/doctors',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(doctor),
            dataType: 'json',
            statusCode: {
                200: function () {
                    window.location = './index.html';
                }
            }
        });
    });
}

function populateForm() {
    var doctor = JSON.parse(localStorage['userEdited']);
    crmInput().val(doctor.crm);
    nameInput().val(doctor.nome);
    jQuery("select option").filter(function () {
        return $(this).text() == doctor.estado;
    }).prop('selected', true);
    specializationInput().val(doctor.especialidade);
    crmInput().prop('disabled', true);
}

function clearLocalStorage() {
    localStorage['userEdited'] = '';
}

function isEdit() {
    if (localStorage['userEdited']) {
        return localStorage['userEdited'].length !== 0;
    }
    return false;
}