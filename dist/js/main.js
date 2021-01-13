init();

function init() {
    moment.locale('ru');

    // ДОСТАЮ ДАННЫЕ ИЗ LOCAL STORAGE
    const day = localStorage.getItem('day');
    const month = localStorage.getItem('month');
    const year = localStorage.getItem('year');

    // ВВОДИМ ДАННЫЕ ИЗ LOCAL STORAGE В VALUE ИНПУТОВ
    document.getElementById("day").value = day;
    document.getElementById("month").value = month;
    document.getElementById("year").value = year;

    // РИСУЕМ ПЕРЕДВИГАЮЩУЮСЯ ВЕРТИКАЛЬНУЮ ЛИНИЮ НА ГРАФИКЕ
    addLineWithLineChartType();

    //СЧИТАЕМ И ОТРИСОВЫВАЕМ (ГРАФИК И ТАБЛИЦУ)
    calculate(new Date(+year, +month - 1, +day));

    //НАЖИМАЕМ КНОПКУ SUBMIT
    document.getElementById("submit-button").click();

}


function onSubmit(formValue) {
    // ПОКАЗЫВАЮ БЛОК С РЕЗУЛЬТАТОМ
    const resultEl = document.getElementById('result');
    resultEl.style.display = 'flex';

    // ДОСТАЮ ВВЕДЕННЫЕ ДАННЫЕ ИЗ ФОРМЫ
    const day = formValue.elements['day'].value;
    const month = formValue.elements['month'].value;
    const year = formValue.elements['year'].value;

    //СЧИТАЕМ И ОТРИСОВЫВАЕМ (ГРАФИК И ТАБЛИЦУ)
    const newDate = new Date(year, month - 1, day);
    calculate(newDate);

    //ДОБАВЛЯЕМ ДАННЫЕ ИЗ ФОРМЫ В LOCAL STORAGE
    localStorage.setItem('day', day);
    localStorage.setItem('month', month);
    localStorage.setItem('year', year);

    return false;
}

function onReset() {
    //УДАЛЯЮ ДАННЫЕ ИЗ ФОРМЫ В LOCAL STORAGE
    localStorage.removeItem('day');
    localStorage.removeItem('month');
    localStorage.removeItem('year');

    // ОЧИЩАЮ ИНПУТЫ В ФОРМЕ
    document.getElementById("form-add-birthday").reset();

    // ПРЯЧУ БЛОК С РЕЗУЛЬТАТОМ
    const resultEl = document.getElementById('result');
    resultEl.style.display = 'none';
}

function onResultView(value) {
    // МЕНЯЮ СТИЛЬ ВЫБРАНОГО В ПРОШЛОМ ТАБА НА ОБЫЧНЫЙ
    let current = document.getElementsByClassName("button-result-view-selected");
    current[0].className = current[0].className.replace(" button-result-view-selected", "");

    // МЕНЯЮ СТИЛЬ НАЖАТОГО ТАБА НА SELECTED
    value.className += " button-result-view-selected";

    // ВЫБИРАЮ В КАКОМ ВИДЕ ОТОБРАЖАТЬ РЕЗУЛЬТАТ
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


    // УДАЛИТЬ ТАБЛИЦУ
    let tbodyTable = document.getElementById('tbody-table').children;
    for (let item = tbodyTable.length - 1; item >= 1; item--) {
        tbodyTable[item].remove();
    }

    // СОЗДАТЬ ТАБЛИЦУ
    for(let i = 0; i < labels.length; i++){
        let newTableLine = document.createElement('tr');
        document.getElementById('tbody-table').appendChild(newTableLine);

        let tableDate = document.createElement('td');
        tableDate.className = `table-data-date`;
        tableDate.innerHTML = moment(labels[i]).format('L');
        newTableLine.appendChild(tableDate);

        let tablePhysical = document.createElement('td');
        if(physical[i] < 0) {
            tablePhysical.style.color = '#FE015C';
        } else {
            tablePhysical.style.color = '#09cc6e';
        }
        tablePhysical.innerHTML = physical[i] + '%';
        newTableLine.appendChild(tablePhysical);

        let tableEmotional = document.createElement('td');
        if(emotional[i] < 0) {
            tableEmotional.style.color = '#FE015C';
        } else {
            tableEmotional.style.color = '#09CC6E';
        }
        tableEmotional.innerHTML = emotional[i] + '%';
        newTableLine.appendChild(tableEmotional);

        let tableIntellectual = document.createElement('td');
        if(intellectual[i] < 0) {
            tableIntellectual.style.color = '#FE015C';
        } else {
            tableIntellectual.style.color = '#09CC6E';
        }
        tableIntellectual.innerHTML = intellectual[i] + '%';
        newTableLine.appendChild(tableIntellectual);

        if(physical[i] === 0 || emotional[i] === 0 || intellectual[i] === 0) {
            newTableLine.style.backgroundColor = '#ffeded';
        }
    }


    //Добавление результата для описания сегоднешнего дня
    let dateToday = document.getElementById('date-today');
    dateToday.innerHTML = moment(new Date()).format('LL');

    let headingRecommendationPhysical = document.getElementById('result-recommendation-physical');
    headingRecommendationPhysical.innerHTML = physical[1] + '%';

    if(physical[1] < 0) {
        headingRecommendationPhysical.style.color = '#FE015C';
    } else {
        headingRecommendationPhysical.style.color = '#09CC6E';
    }

    let headingRecommendationEmotional = document.getElementById('result-recommendation-emotional');
    headingRecommendationEmotional.innerHTML = emotional[1] + '%';

    if(emotional[1] < 0) {
        headingRecommendationEmotional.style.color = '#FE015C';
    } else {
        headingRecommendationEmotional.style.color = '#09CC6E';
    }

    let headingRecommendationIntellectual = document.getElementById('result-recommendation-intellectual');
    headingRecommendationIntellectual.innerHTML = intellectual[1] + '%';

    if(intellectual[1] < 0) {
        headingRecommendationIntellectual.style.color = '#FE015C';
    } else {
        headingRecommendationIntellectual.style.color = '#09CC6E';
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
        }
    });
}

// For chart js (ПЕРЕДВИГАЮЩАЯСЯ ВЕРТИКАЛЬНАЯ ЛИНИЯ НА ГРАФИКЕ)
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



