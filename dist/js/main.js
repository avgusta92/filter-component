init();

function init() {
    moment.locale('ru');
    addLineWithLineChartType();

    const day = localStorage.getItem('day');
    const month = localStorage.getItem('month');
    const year = localStorage.getItem('year');

    calculate(new Date(+year, +month - 1, +day));

    document.getElementById("day").value = day;
    document.getElementById("month").value = month;
    document.getElementById("year").value = year;

    document.getElementById("submit-button").click();

}


// For chart js
function addLineWithLineChartType() {
    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
        draw: function (ease) {
            Chart.controllers.line.prototype.draw.call(this, ease);

            if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
                var activePoint = this.chart.tooltip._active[0],
                    ctx = this.chart.ctx,
                    x = activePoint.tooltipPosition().x,
                    topY = this.chart.legend.bottom,
                    bottomY = this.chart.chartArea.bottom;

                // draw line
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#00000070';
                ctx.stroke();
                ctx.restore();
            }
        }
    });
}

function onSubmit(formValue) {
    // console.log(formValue)
    const resultEl = document.getElementById('result');
    resultEl.style.display = 'flex';

    const day = formValue.elements['day'].value;
    const month = formValue.elements['month'].value;
    const year = formValue.elements['year'].value;

    const newDate = new Date(year, month - 1, day);

    calculate(newDate);

    localStorage.setItem('day', day);
    localStorage.setItem('month', month);
    localStorage.setItem('year', year);

    return false;
}

function calculate(dateOfBirth) {

    const dateNow = new Date();
    const currentDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());

    const daysFromBirth = ((currentDay - dateOfBirth) / 24 / 60 / 60 / 1000) + 1;

    let labels = [];
    let physical = [];
    let emotional = [];
    let intellectual = [];
    for (let i = 0; i < 31; i++) {
        labels.push(new Date(+currentDay + (i * 24 * 60 * 60 * 1000)));

        physical.push(Math.round((Math.sin(2 * Math.PI * (daysFromBirth + i) / 23)) * 100));
        emotional.push(Math.round((Math.sin(2 * Math.PI * (daysFromBirth + i) / 28)) * 100));
        intellectual.push(Math.round((Math.sin(2 * Math.PI * (daysFromBirth + i) / 33)) * 100));

    }


    for(let i = 0; i < labels.length; i++){
        let newTableLine = document.createElement('tr');
        document.getElementById('tbody-table').appendChild(newTableLine);

        let tableDate = document.createElement('td');
        tableDate.className = "table-data-date";
        tableDate.innerHTML = moment(labels[i]).format('L');
        newTableLine.appendChild(tableDate);

        let tablePhysical = document.createElement('td');
        tablePhysical.innerHTML = physical[i];
        newTableLine.appendChild(tablePhysical);

        let tableEmotional = document.createElement('td');
        tableEmotional.innerHTML = emotional[i];
        newTableLine.appendChild(tableEmotional);

        let tableIntellectual = document.createElement('td');
        tableIntellectual.innerHTML = intellectual[i];
        newTableLine.appendChild(tableIntellectual);
    }





    let ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'LineWithLine',
        data: {
            labels,
            datasets: [
                {
                    data: physical,
                    label: "Физический биоритм, %",
                    borderColor: "#4caf50",
                    fill: false
                },
                {
                    data: emotional,
                    label: "Эмоциональный биоритм, %",
                    borderColor: "#f44336",
                    fill: false
                },
                {
                    data: intellectual,
                    label: "Интеллектуальный биоритм, %",
                    borderColor: "#3f51b5",
                    fill: false
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            locale: 'ru',
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'LL'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Уровень (%)'
                    }
                }]
            },
            elements: {
                point: {
                    radius: 0
                }
            },
            tooltips: {
                mode: 'label',
                intersect: false
            },
            hover: {
                mode: 'label',
                intersect: false,
                animationDuration: 200
            },
            // legend: {
            //     position: 'bottom'
            // }
        }
    });
}

function onResultView(value) {

    let current = document.getElementsByClassName("button-result-view-selected");
    current[0].className = current[0].className.replace(" button-result-view-selected", "");

    value.className += " button-result-view-selected";


    let chart = document.getElementById("chart");
    let table = document.getElementById("table");

    if(value.id === "result-view-chart"){
        chart.style.display = 'block';
        table.style.display = 'none';
    } else {
        chart.style.display = 'none';
        table.style.display = 'table';
    }
}

