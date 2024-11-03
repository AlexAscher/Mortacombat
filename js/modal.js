// Инициализация обработчиков при загрузке страницы
document.addEventListener('DOMContentLoaded', initializePopupHandlers);

function initializePopupHandlers() {
    const body = document.querySelector('body');

    body.addEventListener('click', function (e) {
        const target = e.target;

        if (target.matches('[data-popup-open]')) {
            e.preventDefault();
            const popupId = target.getAttribute('data-popup-open');
            const popup = document.querySelector(`[data-popup="${popupId}"]`);
            if (popup) {
                popup.classList.add('active');
            }
        }

        if (target.matches('[data-popup-close]')) {
            const popupId = target.getAttribute('data-popup-close');
            const popup = document.querySelector(`[data-popup="${popupId}"]`);
            if (popup) {
                popup.classList.remove('active');
            }
        }
    });

    body.addEventListener('submit', function (e) {
        if (e.target.matches('form')) {
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