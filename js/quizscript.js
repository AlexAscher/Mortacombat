const quizData = [{
        question: "Какого измерения нет в Mortal Kombat?",
        inputType: 'question',
        answer: ['Гроух']

    },
    {
        question: "Эдения – это",
        options: ['Суровый мир варваров и монстров', 'Светлый мир магии и красоты', 'Царство хаоса', 'Царство порядка'],
        answer: ['Светлый мир магии и красоты']
    },
    {
        question: "Сколько раз подряд нужно одержать победу в турнире Mortal Kombat, чтобы поглотить другой мир?",
        inputType: 'number',
        answer: ['10']
    },
    {
        question: "Кто смог победить Горо на 10-м чемпионате смертельной схватки?",
        options: ['Соня Блейд', 'Смоук', 'Лю Кенг', 'Сарина'],
        answer: ['Лю Кенг', 'Соня Блейд']
    },
    {
        question: "Вопрос на соответствие: Сопоставьте персонажей с их оружием",
        match: [{
                item: 'Скорпион',
                options: ['Кунай на цепи', 'Шляпа-пила', 'Молот гнева', 'Нагината'],
                answer: 'Кунай на цепи'
            },
            {
                item: 'Кунг Лао',
                options: ['Кунай на цепи', 'Шляпа-пила', 'Молот гнева', 'Нагината'],
                answer: 'Шляпа-пила'
            },
            {
                item: 'Шао Кан',
                options: ['Кунай на цепи', 'Шляпа-пила', 'Молот гнева', 'Нагината'],
                answer: 'Молот гнева'
            }
        ]
    },
    {
        question: "Кто из группировки «Черного дракона» перешел на сторону добра?",
        options: ['Кано', 'Рептилия', 'Кабал', 'Горо'],
        answer: ['Кабал']
    },
    {
        question: "В кого из внешнего мира влюбился Лю Кенг?",
        options: ['Джейд', 'Сарину', 'Милену', 'Китану'],
        answer: ['Джейд']
    },
    {
        question: "За кого вышла замуж Соня Блейд?",
        options: ['Джонни Кейдж', 'Мотаро', 'Рейн', 'Страйкер'],
        answer: ['Рейн']
    },
    {
        question: "Кто спас Шань Цунга от приговора смерти старших богов?",
        options: ['Принц Горо', 'Шао Кан', 'Кунг Лао', 'Куан-Чи'],
        answer: ['Шао Кан']
    },
    {
        question: "Подругой Китаны была...",
        options: ['Джейд', 'Милена', 'Соня Блейд', 'Синдель'],
        answer: ['Соня Блейд']
    },
];
const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextBtn');
const resultElement = document.getElementById('result');
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = [];
let selectedOptionForSelect = {};

function loadQuestion() {
    const currentQuestions = quizData[currentQuestionIndex]; // Получаем текущий вопрос из массива quizData
    questionElement.textContent = currentQuestions.question; // Устанавливаем текст текущего вопроса в элементе вопроса
    optionsElement.innerHTML = ''; // Очищаем предыдущие варианты ответов в элементе вариантов

    // Проверяем, требуется ли для текущего вопроса ввод числового ответа
    if (currentQuestions.inputType === 'number') {
        const inputAnswer = document.createElement('input'); // Создаем элемент ввода для числовых ответов
        inputAnswer.type = 'number'; // Устанавливаем тип ввода на число
        inputAnswer.classList.add('input-answer'); // Добавляем класс для стилизации
        inputAnswer.placeholder = 'Введите ответ'; // Устанавливаем текст-подсказку
        optionsElement.appendChild(inputAnswer); // Добавляем элемент ввода в элемент вариантов

        // Добавляем обработчик события ввода, чтобы обновить выбранный вариант, когда пользователь вводит значение
        inputAnswer.addEventListener('input', function () {
            selectedOption = [inputAnswer.value]; // Сохраняем введенное значение в массиве selectedOption
            nextButton.style.display = 'block'; // Показываем кнопку "Далее"
        });
    }
    // Проверяем, есть ли у текущего вопроса пары для сопоставления
    else if (currentQuestions.match) {
        currentQuestions.match.forEach(pair => {
            const container = document.createElement('div'); // Создаем контейнер для каждой пары сопоставлений
            container.classList.add('match-pair'); // Добавляем класс для стилизации
            const labelItem = document.createElement('label'); // Создаем элемент метки для элемента
            labelItem.classList.add('label-item'); // Добавляем класс для стилизации
            labelItem.textContent = pair.item; // Устанавливаем текст метки на имя элемента
            container.appendChild(labelItem); // Добавляем метку в контейнер

            const selectItem = document.createElement('select'); // Создаем элемент выбора для опций
            selectItem.classList.add('select-item'); // Добавляем класс для стилизации
            pair.options.forEach(option => {
                const optionEl = document.createElement('option'); // Создаем элемент для каждого варианта
                optionEl.value = option; // Устанавливаем значение элемента
                optionEl.textContent = option; // Устанавливаем текст элемента
                selectItem.appendChild(optionEl); // Добавляем вариант в элемент выбора
            });
            selectedOptionForSelect[pair.item] = pair.options[0]; // Устанавливаем значение по умолчанию для выбранного варианта
            selectItem.value = pair.options[0]; // Устанавливаем значение выбранного элемента
            // Добавляем обработчик события изменения для обновления выбранного варианта
            selectItem.addEventListener('change', function () {
                selectedOptionForSelect[pair.item] = selectItem.value; // Обновляем выбранный вариант
                nextButton.style.display = 'block'; // Показываем кнопку "Далее"
            });
            container.appendChild(selectItem); // Добавляем элемент выбора в контейнер
            optionsElement.appendChild(container); // Добавляем контейнер в элемент вариантов
        });
    }
    // Проверяем, требуется ли текстовый ответ на вопрос
    else if (currentQuestions.inputType === 'question') {
        const questAnswer = document.createElement('input'); // Создаем элемент ввода для текстового ответа
        questAnswer.type = 'text'; // Устанавливаем тип ввода на текст
        questAnswer.classList.add('input-answer'); // Добавляем класс для стилизации
        questAnswer.placeholder = 'Введите ответ'; // Устанавливаем текст-подсказку
        optionsElement.appendChild(questAnswer); // Добавляем элемент ввода в элемент вариантов

        // Добавляем обработчик события ввода, чтобы обновить выбранный вариант, когда пользователь вводит значение
        questAnswer.addEventListener('input', function () {
            selectedOption = [questAnswer.value]; // Сохраняем введенное значение в массиве selectedOption
            nextButton.style.display = 'block'; // Показываем кнопку "Далее"
        });
    } 
    // Если вопрос содержит обычные варианты ответов
    else {
        currentQuestions.options.forEach(option => {
            const button = document.createElement('button'); // Создаем кнопку для каждого варианта
            button.classList.add('option-btn'); // Добавляем класс для стилизации
            const circle = document.createElement('div'); // Создаем элемент круга для визуального эффекта
            circle.classList.add('circle'); // Добавляем класс для стилизации
            const text = document.createElement('span'); // Создаем элемент для текста варианта
            text.textContent = option; // Устанавливаем текст варианта
            button.appendChild(circle); // Добавляем круг в кнопку
            button.appendChild(text); // Добавляем текст в кнопку
            optionsElement.appendChild(button); // Добавляем кнопку в элемент вариантов

            let isActive = false; // Переменная для отслеживания состояния кнопки

            // Функция для обработки клика по кнопке
            const handleClick = () => {
                // Проверяем, включен ли вариант
                if (selectedOption.includes(option)) {
                    selectedOption = selectedOption.filter(item => item !== option); // Убираем вариант из выбранных
                    button.classList.remove('activeForQuiz'); // Убираем активный класс
                    isActive = false; // Устанавливаем состояние как неактивное
                } else {
                    selectedOption.push(option); // Добавляем вариант в выбранные
                    button.classList.add('activeForQuiz'); // Добавляем активный класс
                    isActive = true; // Устанавливаем состояние как активное
                }
                nextButton.style.display = 'block'; // Показываем кнопку "Далее"
            };

            // Убедимся, что обработчики не конфликтуют
            button.addEventListener('click', handleClick); // Добавляем обработчик клика
            button.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Предотвращаем двойное срабатывание
                handleClick(); // Вызываем обработчик клика
            });
        });
    }
}


function nextQuestion() {
    const correctAnswer = quizData[currentQuestionIndex].answer; // Получаем правильный ответ текущего вопроса

    // Проверяем, есть ли у текущего вопроса пары для сопоставления
    if (quizData[currentQuestionIndex].match) {
        let correct = true; // Флаг для проверки правильности всех ответов
        // Перебираем все пары сопоставления
        for (let pair of quizData[currentQuestionIndex].match) {
            // Если выбранный ответ не совпадает с правильным
            if (selectedOptionForSelect[pair.item] !== pair.answer) {
                correct = false; // Устанавливаем флаг в false
                break; // Выходим из цикла, так как один ответ неправильный
            }
        }
        // Если все ответы правильные
        if (correct) {
            score++; // Увеличиваем счет на 1
        }
    } 
    // Проверяем, если выбранные ответы являются массивом и их количество совпадает с правильными ответами
    else if (Array.isArray(selectedOption) && selectedOption.length > 0 && selectedOption.every(opt => correctAnswer.includes(opt)) && selectedOption.length === correctAnswer.length) {
        score++; // Увеличиваем счет на 1, если все ответы верны
    }

    currentQuestionIndex++; // Переходим к следующему вопросу
    selectedOptionForSelect = {}; // Сбрасываем выбранные варианты для сопоставления
    selectedOption = []; // Сбрасываем выбранные варианты ответов

    // Проверяем, есть ли еще вопросы
    if (currentQuestionIndex < quizData.length) {
        loadQuestion(); // Загружаем следующий вопрос
        nextButton.style.display = 'none'; // Скрываем кнопку "Далее" до выбора ответа
    } else { // Если вопросов больше нет
        showResult(); // Отображаем результат викторины
        nextButton.textContent = 'Закрыть'; // Меняем текст кнопки на "Закрыть"
        nextButton.removeEventListener('click', nextQuestion); // Удаляем обработчик для следующего вопроса
        nextButton.addEventListener('click', closeQuizPopup); // Добавляем обработчик для закрытия викторины
    }
}

// Функция для отображения результата викторины
function showResult() {
    // Отображаем количество набранных баллов и общее количество вопросов
    resultElement.textContent = 'Вы набрали ' + score + ' из ' + quizData.length + ' баллов.'; 
}

// Функция для сброса викторины
function resetQuiz() {
    currentQuestionIndex = 0; // Сбрасываем индекс текущего вопроса на 0
    score = 0; // Сбрасываем счет на 0
    selectedOption = []; // Сбрасываем выбранные варианты ответов
    selectedOptionForSelect = {}; // Сбрасываем выбранные варианты для сопоставления
    resultElement.textContent = ''; // Очищаем текст результата
    nextButton.textContent = 'Следующий вопрос'; // Устанавливаем текст кнопки на "Следующий вопрос"
    nextButton.removeEventListener('click', closeQuizPopup); // Удаляем обработчик для закрытия
    nextButton.addEventListener('click', nextQuestion); // Добавляем обработчик для следующего вопроса
    loadQuestion(); // Загружаем первый вопрос
}

// Функция для закрытия всплывающего окна викторины
function closeQuizPopup() {
    const popUp = document.getElementById('pop_up'); // Получаем элемент всплывающего окна
    popUp.classList.remove('active'); // Убираем класс активности, чтобы скрыть окно
    resetQuiz(); // Сбрасываем викторину
}

// Функция для переключения всплывающего окна
function togglePopup(openButton, closeButton, popupElement) {
    // Обработчик события для открытия всплывающего окна
    openButton.addEventListener('click', function (e) {
        e.preventDefault(); // Предотвращаем стандартное поведение кнопки
        e.stopPropagation(); // Останавливаем всплытие события
        popupElement.classList.add('active'); // Добавляем класс активности, чтобы показать окно
    });

    // Обработчик события для закрытия всплывающего окна
    closeButton.addEventListener('click', function () {
        popupElement.classList.remove('active'); // Убираем класс активности, чтобы скрыть окно
        resetQuiz(); // Сбрасываем викторину
    });
};

// Ожидаем загрузки документа, чтобы инициализировать обработчики событий
document.addEventListener('DOMContentLoaded', function () {
    const openPopUp = document.getElementById('open_pop_up'); // Получаем кнопку для открытия всплывающего окна
    const closePopUp = document.getElementById('close_pop_up'); // Получаем кнопку для закрытия всплывающего окна
    const popUp = document.getElementById('pop_up'); // Получаем элемент всплывающего окна

    togglePopup(openPopUp, closePopUp, popUp); // Инициализируем переключение всплывающего окна
});

// Добавляем обработчик события для кнопки "Далее"
nextButton.addEventListener('click', nextQuestion); // Добавляем обработчик на кнопку "Далее"
loadQuestion(); // Загружаем первый вопрос
