let x = 0; // Переменная для отслеживания количества добавленных полей ввода

function initializePopupHandlers() {
    const body = document.querySelector('body'); // Получаем элемент body для установки обработчиков событий

    // Обработчик для кликов по элементам
    body.addEventListener('click', function (e) {
        const target = e.target; // Получаем элемент, на который кликнули

        // Открытие попапа
        if (target.matches('[data-popup-open]')) {
            e.preventDefault(); // Предотвращаем стандартное поведение ссылки
            const popupId = target.getAttribute('data-popup-open'); // Получаем идентификатор попапа
            const popup = document.querySelector(`[data-popup="${popupId}"]`); // Находим попап по идентификатору
            if (popup) {
                popup.classList.add('active'); // Добавляем класс для отображения попапа
            }
        }

        // Закрытие попапа
        if (target.matches('[data-popup-close]')) {
            const popupId = target.getAttribute('data-popup-close'); // Получаем идентификатор попапа
            const popup = document.querySelector(`[data-popup="${popupId}"]`); // Находим попап по идентификатору
            if (popup) {
                popup.classList.remove('active'); // Убираем класс, чтобы скрыть попап
            }
        }
    });

    // Обработчик для изменений в элементах формы
    body.addEventListener('change', function (e) {
        const target = e.target; // Получаем элемент, который изменился

        // Управление показом поля "Свой вариант"
        if (target.matches('[data-select]')) {
            const selectval = target.value; // Получаем значение выбранного элемента
            const anotherAnswer = target.closest('.select1').querySelector('.another_answer'); // Находим поле "Свой вариант"
            if (selectval === 'Свой вариант') {
                anotherAnswer.style.display = 'block'; // Показываем поле, если выбрано "Свой вариант"
            } else {
                anotherAnswer.style.display = 'none'; // Скрываем поле в остальных случаях
            }
        }
    });

    // Обработчик для отправки формы
    body.addEventListener('submit', function (e) {
        if (e.target.matches('form')) { // Проверяем, является ли целевой элемент формой
            e.preventDefault(); // Предотвращаем стандартное поведение формы
            const form = e.target; // Получаем отправленную форму
            const formData = new FormData(form); // Создаем объект FormData из формы
            const resultContent = form.closest('.pop_up_body').querySelector('.resultcontent'); // Находим контейнер для результатов
            const result = form.closest('.pop_up_body').querySelector('.result'); // Находим элемент для отображения результата
            let resultHTML = '<ul>'; // Начинаем создавать HTML для списка результатов
            
            // Перебираем данные формы и формируем HTML
            formData.forEach((value, key) => {
                if (value.trim()) { // Проверяем, не пустое ли значение
                    const marginTopValue = key === 'Телефон' ? '1px' : '0px'; // Устанавливаем отступ в зависимости от поля
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
            resultHTML += '</ul>'; // Закрываем список
            resultContent.innerHTML = resultHTML; // Вставляем сформированный HTML в контейнер
            result.classList.add('active'); // Показываем результат
        }
    });
}

// Функция для добавления нового поля ввода
function addInput(button) {
    const container = button.closest('.pop_up_body'); // Находим контейнер попапа
    const inputContainer = container.querySelector(`#input${x}`); // Получаем контейнер для нового ввода
    if (x < 2) { // Проверяем, не превышает ли количество полей 2
        const str = `<input type="text" name="Любимая игра ${x + 2}" placeholder="Любимая игра"> <div id="input${x + 1}"></div>`; // Создаем HTML для нового поля
        inputContainer.innerHTML = str; // Вставляем новый HTML в контейнер
        x++; // Увеличиваем счетчик полей
    } else {
        showStopAlert(container); // Если превышено количество полей, показываем предупреждение
    }
}

// Функция для показа предупреждения о лимите полей ввода
function showStopAlert(container) {
    const stopAlert = container.querySelector('.stop'); // Находим элемент предупреждения
    stopAlert.classList.add('active'); // Добавляем класс для показа предупреждения
}

// Инициализация обработчиков при загрузке страницы
document.addEventListener('DOMContentLoaded', initializePopupHandlers); // Добавляем обработчик для загрузки страницы
