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

        // Добавление нового поля ввода для любимых игр
        if (target.matches('.add')) {
            addInput(target);
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
            e.preventDefault();
            const form = e.target;
            const emailInput = form.querySelector('input[name="Почта"]');
            const phoneInput = form.querySelector('input[name="Телефон"]');
            const emailError = document.getElementById('emailError');
            const phoneError = document.getElementById('phoneError');

            let isValid = true;

            // Проверка правильности email
            const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            if (!emailPattern.test(emailInput.value)) {
                emailError.textContent = 'Введите корректный email';
                isValid = false;
            } else {
                emailError.textContent = '';
            }

            // Проверка правильности телефона
            const phonePattern = /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
            if (!phonePattern.test(phoneInput.value)) {
                phoneError.textContent = 'Введите телефон в формате +7(xxx)-xxx-xx-xx';
                isValid = false;
            } else {
                phoneError.textContent = '';
            }

            if (isValid) {
                const formData = new FormData(form);
                const resultContent = form.closest('.pop_up_body').querySelector('.resultcontent');
                const result = form.closest('.pop_up_body').querySelector('.result');
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
            }
        }
    });
}

// Функция для добавления нового поля ввода
function addInput(button) {
    const container = button.closest('.pop_up_body'); // Находим контейнер попапа
    const inputContainer = container.querySelector(`#input${x}`); // Получаем контейнер для нового ввода
    if (x < 2) { // Проверяем, не превышает ли количество полей 2
        const newInput = document.createElement('div'); // Создаем новый контейнер для инпута
        newInput.id = `input${x + 1}`; // Устанавливаем id для нового контейнера
        newInput.innerHTML = `<input type="text" name="Любимая игра ${x + 2}" placeholder="Любимая игра" required>`; // Создаем HTML для нового поля
        inputContainer.parentNode.insertBefore(newInput, button); // Вставляем новый HTML перед кнопкой
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
document.addEventListener('DOMContentLoaded', () => {
    initializePopupHandlers();

    // Получение поля ввода телефона
    const phoneInput = document.getElementById('phone');

    phoneInput.onclick = function () {
        if (phoneInput.value === '') {
            phoneInput.value = '+7';
        }
    };

    phoneInput.oninput = function () {
        // Удаление любых символов, кроме цифр
        let input = phoneInput.value.replace(/\D/g, '');
        // Добавление префикса +7
        if (!input.startsWith('7')) {
            input = '7' + input;
        }
        // Применение формата +7(xxx)-xxx-xx-xx
        const formatted = formatPhoneNumber(input);
        phoneInput.value = formatted;
    };

    phoneInput.onkeydown = function (e) {
        // Обработка удаления символов
        if (e.key === 'Backspace') {
            let cursorPosition = phoneInput.selectionStart;

            if (cursorPosition === phoneInput.value.length) {
                // Если курсор в конце строки, проверить последний символ
                if (/[()\-\s]/.test(phoneInput.value.charAt(cursorPosition - 1))) {
                    phoneInput.value = phoneInput.value.slice(0, -1);
                }
            }
        }
    };

    function formatPhoneNumber(input) {
        let formatted = '+7';

        if (input.length > 1) {
            formatted += '(' + input.substring(1, 4);
        }
        if (input.length >= 4) {
            formatted += ')';
        }
        if (input.length > 4) {
            formatted += '-';
            formatted += input.substring(4, 7);
        }
        if (input.length >= 7) {
            formatted += '-';
        }
        if (input.length > 7) {
            formatted += input.substring(7, 9);
        }
        if (input.length >= 9) {
            formatted += '-';
        }
        if (input.length > 9) {
            formatted += input.substring(9, 11);
        }

        return formatted;
    }
});