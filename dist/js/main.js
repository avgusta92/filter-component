let greenColor = "#2bd284";
let redColor = "#f12767";
let bluColor = "#0190FF";

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

    addAutoFocusingNextInput();
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

// ДОБАВЛЯЮ ФУНКЦИЮ КОТОРАЯ БУДЕТ АВТОМАТИЧЕСКИ ФОКУСИРОВАТЬ СЛЕДУЮЩИЙ ИНПУТ
function addAutoFocusingNextInput() {
    const container = document.getElementsByClassName("birthday-inputs-block")[0];
    container.onkeyup = function(e) {
        const target = e.srcElement || e.target;
        const maxLengthRaw = target.attributes["maxlength"];
        if (!maxLengthRaw) {
            return;
        }
        const maxLength = parseInt(maxLengthRaw.value, 10);
        const myLength = target.value.length;
        if (myLength >= maxLength) {
            let next = target;
            while (next = next.nextElementSibling) {
                if (next == null)
                    break;
                if (next.tagName.toLowerCase() === "input") {
                    next.focus();
                    break;
                }
            }
        }
    }
}

function calculate(dateOfBirth) {
    const dateNow = new Date();
    const currentDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());

    const daysFromBirth = Math.round((currentDay - dateOfBirth) / 24 / 60 / 60 / 1000) + 1;

    let labels = [];
    let physical = [];
    let emotional = [];
    let intellectual = [];
    for (let i = 0; i < 31; i++) {
        labels.push(new Date(+currentDay + (i * 24 * 60 * 60 * 1000)));

        physical.push(Math.round((Math.sin(2 * Math.PI * (daysFromBirth % 23 + i) / 23)) * 100));
        emotional.push(Math.round((Math.sin(2 * Math.PI * (daysFromBirth % 28 + i) / 28)) * 100));
        intellectual.push(Math.round((Math.sin(2 * Math.PI * (daysFromBirth % 33 + i) / 33)) * 100));
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
            tablePhysical.style.color = redColor;
        } else {
            tablePhysical.style.color = greenColor;
        }
        tablePhysical.innerHTML = physical[i] + '%';
        newTableLine.appendChild(tablePhysical);

        let tableEmotional = document.createElement('td');
        if(emotional[i] < 0) {
            tableEmotional.style.color = redColor;
        } else {
            tableEmotional.style.color = greenColor;
        }
        tableEmotional.innerHTML = emotional[i] + '%';
        newTableLine.appendChild(tableEmotional);

        let tableIntellectual = document.createElement('td');
        if(intellectual[i] < 0) {
            tableIntellectual.style.color = redColor;
        } else {
            tableIntellectual.style.color = greenColor;
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
    headingRecommendationPhysical.innerHTML = physical[0] + '%';

    let headingRecommendationPhysicalDays = document.getElementById('result-recommendation-physical-days');
    headingRecommendationPhysicalDays.innerText = daysFromBirth % 23;


    if(physical[1] < 0) {
        headingRecommendationPhysical.style.color = redColor;
    } else {
        headingRecommendationPhysical.style.color = greenColor;
    }

    let headingRecommendationEmotional = document.getElementById('result-recommendation-emotional');
    headingRecommendationEmotional.innerHTML = emotional[0] + '%';

    let headingRecommendationEmotionalDays = document.getElementById('result-recommendation-emotional-days');
    headingRecommendationEmotionalDays.innerText = daysFromBirth % 28;

    if(emotional[1] < 0) {
        headingRecommendationEmotional.style.color = redColor;
    } else {
        headingRecommendationEmotional.style.color = greenColor;
    }

    let headingRecommendationIntellectual = document.getElementById('result-recommendation-intellectual');
    headingRecommendationIntellectual.innerHTML = intellectual[0] + '%';

    let headingRecommendationIntellectualDays = document.getElementById('result-recommendation-intellectual-days');
    headingRecommendationIntellectualDays.innerText = daysFromBirth % 33;

    if(intellectual[1] < 0) {
        headingRecommendationIntellectual.style.color = redColor;
    } else {
        headingRecommendationIntellectual.style.color = greenColor;
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
                    borderColor: greenColor,
                    fill: false
                },
                {
                    data: emotional,
                    label: "Эмоциональный биоритм, %",
                    borderColor: redColor,
                    fill: false
                },
                {
                    data: intellectual,
                    label: "Интеллектуальный биоритм, %",
                    borderColor: bluColor,
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
            legend: {
                position: 'bottom',
                align: "start"
            }
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
                    topY = this.chart.chartArea.top,
                    bottomY = this.chart.chartArea.bottom;

                // draw line
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = '#00000070';
                ctx.stroke();
                ctx.restore();
            }
        }
    });
}
