const openPopup = document.getElementById('open_pop_up');
const closePopup = document.getElementById('close_pop_up');
const popup = document.getElementById('pop_up');
const body = document.querySelector('body');
const stop = document.getElementById('stop');
const closeStop = document.getElementById('close_stop');
const add = document.getElementById('add');
const form = document.getElementById('form');
const result = document.getElementById('result');
const closeResult = document.getElementById('close_result');
const resultContent = document.getElementById('result_content');
let x = 0;

// Открытие попапа с затемнённым фоном
openPopup.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    popup.classList.add('active');
});

closePopup.addEventListener('click', () => {
    popup.classList.remove('active');
});

// Открытие другого попапа со своим затемнением
closeStop.addEventListener('click', () => {
    stop.classList.remove('active');
});

// Закрытие результата и удаление затемнения
closeResult.addEventListener('click', () => {
    result.classList.remove('active');
});

// Функция для показа "остановки" с затемнением
function stopAlert() {
    stop.classList.add('active');
}


function addInput() {
    if (x < 2) {
        var str = '<input type="text" name="Любимая игра ' + (x + 2) + '" placeholder="Любимая игра"> <div id="input' + (x + 1) + '"></div>';
        document.getElementById('input' + x).innerHTML = str;
        x++;
    } else {
        stopAlert();
    }
}

$('#theme').change(function () {
    var selectval = $(this).val();
    if (selectval == 'Свой вариант') {
        $('.another_answer').show();
    } else {
        $('.another_answer').hide();
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    let resultHTML = '<ul>';
    formData.forEach((value, key) => {
        if (value.trim()) {
            const marginTopValue = key === 'Телефон' ? '1px' : '0px';

            resultHTML += `
                <li style="display: flex; align-items: center; margin-top: 10px;">
                    <strong style="
                        font-family: TT Travels Trl;
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 20px;
                        color: black;
                        margin-right: 5px;
                    ">${key}:</strong>
                    <span style="
                        font-family: TT Travels Trl;
                        font-size: 15px;
                        font-weight: 400;
                        line-height: 20px;
                        color: black;
                        margin-top: ${marginTopValue};
                    ">${value}</span>
                </li>`;
        }
    });

    resultHTML += '</ul>';
    resultContent.innerHTML = resultHTML;
    result.classList.add('active');
});
const openPopup1 = document.getElementById('open_pop_up1');
const closePopup1 = document.getElementById('close_pop_up1');
const popup1 = document.getElementById('pop_up1');
const body1 = document.querySelector('body');
const stop1 = document.getElementById('stop1');
const closeStop1 = document.getElementById('close_stop1');
const add1 = document.getElementById('add1');
const form1 = document.getElementById('form1');
const result1 = document.getElementById('result1');
const closeResult1 = document.getElementById('close_result1');
const resultContent1 = document.getElementById('result_content1');
let x1 = 0;

// Открытие попапа с затемнённым фоном
openPopup1.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    popup1.classList.add('active');
});

// Закрытие попапа и удаление затемнения
closePopup1.addEventListener('click', () => {
    popup1.classList.remove('active');
});

// Закрытие попапа "остановка"
closeStop1.addEventListener('click', () => {
    stop1.classList.remove('active');
});

// Закрытие результата и удаление затемнения
closeResult1.addEventListener('click', () => {
    result1.classList.remove('active');
});

// Функция для показа "остановки" с затемнением
function stopAlert1() {
    stop1.classList.add('active');
}

// Добавление нового поля для игры
function addInput1() {
    if (x1 < 2) {
        var str = '<input type="text" name="Любимая игра ' + (x1 + 2) + '" placeholder="Любимая игра"> <div id="input' + (x1 + 1) + '1"></div>';
        document.getElementById('input' + x1 + '1').innerHTML = str;
        x1++;
    } else {
        stopAlert1();
    }
}

// Управление показом поля "Свой вариант"
$('#theme1').change(function () {
    var selectval = $(this).val();
    if (selectval == 'Свой вариант') {
        $('.another_answer').show();
    } else {
        $('.another_answer').hide();
    }
});

// Обработка отправки формы
form1.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form1);
    let resultHTML = '<ul>';
    formData.forEach((value, key) => {
        if (value.trim()) {
            const marginTopValue = key === 'Телефон' ? '1px' : '0px';
            resultHTML += `
                <li style="display: flex; align-items: center; margin-top: 10px;">
                    <strong style="
                        font-family: TT Travels Trl;
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 20px;
                        color: black;
                        margin-right: 5px;
                    ">${key}:</strong>
                    <span style="
                        font-family: TT Travels Trl;
                        font-size: 15px;
                        font-weight: 400;
                        line-height: 20px;
                        color: black;
                        margin-top: ${marginTopValue};
                    ">${value}</span>
                </li>`;
        }
    });
    resultHTML += '</ul>';
    resultContent1.innerHTML = resultHTML;
    result1.classList.add('active');
});