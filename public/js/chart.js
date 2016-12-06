(function init() {

    jQuery.ajax('http://192.168.49.21:8080/doctors').done(function (response) {
        var dataArray = createDataArray(response);
        google.charts.load('current', { 'packages': ['bar'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(dataArray);

            var options = {
                chart: {
                    title: 'Relação de Número de Médicos por Estado',
                    subtitle: 'O gráfico representa o número de médicos cadastrados de cada estado da região Sudeste',
                }
            };

            var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

            chart.draw(data, options);
        }
    });
})();

function createDataArray(doctors) {
    var data = [
        ['Estados', 'Quantidade'],
        ['Sudeste', 0],
        ['Sul', 0],
        ['Norte', 0],
        ['Nordeste', 0],
        ['Centro-Oeste', 0]
    ];
    data.forEach(state => {
        state[1] = doctors.reduce(function (count, doctor) {
            if (getRegion(doctor.estado) === state[0]) {
                return count + 1;
            }
            return count;
        }, state[1]);
    });
    return data;
}

function getRegion(state) {
    if (state == 'Minas Gerais' || state == 'São Paulo' || state == 'Rio de Janeiro' || state == 'Espírito Santo') {
        return 'Sudeste';
    }
    if (state == 'Santa Catarina' || state == 'Paraná' || state == 'Rio Grande do Sul') {
        return 'Sul';
    }
    if (state == 'Mato Grosso' || state == 'Mato Grosso do Sul' || state == 'Goiás' || state == 'Distrito Federal') {
        return 'Centro-Oeste';
    }
    if (state == 'Rondônia' || state == 'Acre' || state == 'Pará' || state == 'Amazonas' || state == 'Roraima' || state == 'Amapá' || state == 'Tocantins') {
        return 'Norte';
    }
    if (state == 'Ceará' || state == 'Pernambuco' || state == 'Rio Grande do Norte' || state == 'Maranhão' || state == 'Sergipe' || state == 'Bahia' ||
        state == 'Alagoas' || state == 'Piauí' || state == 'Paraíba') {
        return 'Nordeste';
    }
}