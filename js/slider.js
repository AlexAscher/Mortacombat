// Ожидание полной загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function () {
    // Получение элементов с помощью их ID
    const slider = document.getElementById('slider'); // Элемент ползунка
    const fromValue = document.getElementById('fromValue'); // Элемент для отображения значения "от"
    const toValue = document.getElementById('toValue'); // Элемент для отображения значения "до"

    // Создание ползунка с помощью библиотеки noUiSlider
    noUiSlider.create(slider, {
        start: [100, 10000], // Начальные значения ползунка
        connect: true, // Соединение ползунков
        range: {
            'min': 0, // Минимальное значение диапазона
            'max': 10000 // Максимальное значение диапазона
        },
        step: 1, // Шаг изменения значения при перемещении ползунка
        format: {
            to: function (value) {
                return Math.round(value); // Округление значения для отображения
            },
            from: function (value) {
                return Number(value); // Преобразование значения из строки в число
            }
        }
    });

    // Обработчик события обновления значений ползунка
    slider.noUiSlider.on('update', function (values, handle) {
        if (handle === 0) {
            fromValue.textContent = values[handle]; // Обновление текста элемента "от"
        } else {
            toValue.textContent = values[handle]; // Обновление текста элемента "до"
        }
    });
});
