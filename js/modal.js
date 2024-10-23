let x = 0;

function initializePopupHandlers() {
    const body = document.querySelector('body');

    body.addEventListener('click', function (e) {
        const target = e.target;

        // Открытие попапа
        if (target.matches('[data-popup-open]')) {
            e.preventDefault();
            const popupId = target.getAttribute('data-popup-open');
            const popup = document.querySelector(`[data-popup="${popupId}"]`);
            if (popup) {
                popup.classList.add('active');
            }
        }

        // Закрытие попапа
        if (target.matches('[data-popup-close]')) {
            const popupId = target.getAttribute('data-popup-close');
            const popup = document.querySelector(`[data-popup="${popupId}"]`);
            if (popup) {
                popup.classList.remove('active');
            }
        }
    });

    body.addEventListener('change', function (e) {
        const target = e.target;

        // Управление показом поля "Свой вариант"
        if (target.matches('[data-select]')) {
            const selectval = target.value;
            const anotherAnswer = target.closest('.select1').querySelector('.another_answer');
            if (selectval === 'Свой вариант') {
                anotherAnswer.style.display = 'block';
            } else {
                anotherAnswer.style.display = 'none';
            }
        }
    });

    body.addEventListener('submit', function (e) {
        if (e.target.matches('form')) {
            e.preventDefault();
            const form = e.target;
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
    });
}

function addInput(button) {
    const container = button.closest('.pop_up_body');
    const inputContainer = container.querySelector(`#input${x}`);
    if (x < 2) {
        const str = `<input type="text" name="Любимая игра ${x + 2}" placeholder="Любимая игра"> <div id="input${x + 1}"></div>`;
        inputContainer.innerHTML = str;
        x++;
    } else {
        showStopAlert(container);
    }
}

function showStopAlert(container) {
    const stopAlert = container.querySelector('.stop');
    stopAlert.classList.add('active');
}

// Инициализация обработчиков при загрузке страницы
document.addEventListener('DOMContentLoaded', initializePopupHandlers);