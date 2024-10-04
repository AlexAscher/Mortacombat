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
    const currentQuestions = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestions.question;
    optionsElement.innerHTML = '';
    if (currentQuestions.inputType === 'number') {
        const inputAnswer = document.createElement('input');
        inputAnswer.type = 'number';
        inputAnswer.classList.add('input-answer');
        inputAnswer.placeholder = 'Введите ответ';
        optionsElement.appendChild(inputAnswer);
        inputAnswer.addEventListener('input', function () {
            selectedOption = [inputAnswer.value];
            nextButton.style.display = 'block';
        });
    } else if (currentQuestions.match) {
        currentQuestions.match.forEach(pair => {
            const container = document.createElement('div');
            container.classList.add('match-pair');
            const labelItem = document.createElement('label');
            labelItem.classList.add('label-item');
            labelItem.textContent = pair.item;
            container.appendChild(labelItem);
            const selectItem = document.createElement('select');
            selectItem.classList.add('select-item');
            pair.options.forEach(option => {
                const optionEl = document.createElement('option');
                optionEl.value = option;
                optionEl.textContent = option;
                selectItem.appendChild(optionEl);
            });
            selectedOptionForSelect[pair.item] = pair.options[0];
            selectItem.value = pair.options[0];
            selectItem.addEventListener('change', function () {
                selectedOptionForSelect[pair.item] = selectItem.value;
                nextButton.style.display = 'block';
            });
            container.appendChild(selectItem);
            optionsElement.appendChild(container);
        });
    } else if (currentQuestions.inputType === 'question') {
        const questAnswer = document.createElement('input');
        questAnswer.type = 'text';
        questAnswer.classList.add('input-answer');
        questAnswer.placeholder = 'Введите ответ';
        optionsElement.appendChild(questAnswer);
        questAnswer.addEventListener('input', function () {
            selectedOption = [questAnswer.value];
            nextButton.style.display = 'block';
        });
    } else {
        currentQuestions.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            const circle = document.createElement('div');
            circle.classList.add('circle');
            const text = document.createElement('span');
            text.textContent = option;
            button.appendChild(circle);
            button.appendChild(text);
            optionsElement.appendChild(button);
            button.addEventListener('click', () => {
                if (selectedOption.includes(option)) {
                    selectedOption = selectedOption.filter(item => item !== option);
                    button.classList.remove('activeForQuiz');
                } else {
                    selectedOption.push(option);
                    button.classList.add('activeForQuiz');
                }
                nextButton.style.display = 'block';
            });
        });
    }

}

function nextQuestion() {
    const correctAnswer = quizData[currentQuestionIndex].answer;

    if (quizData[currentQuestionIndex].match) {
        let correct = true;
        for (let pair of quizData[currentQuestionIndex].match) {
            if (selectedOptionForSelect[pair.item] !== pair.answer) {
                correct = false;
                break;
            }
        }
        if (correct) {
            score++;
        }
    } else if (Array.isArray(selectedOption) && selectedOption.length > 0 && selectedOption.every(opt => correctAnswer.includes(opt)) && selectedOption.length === correctAnswer.length) {
        score++;
    }

    currentQuestionIndex++;
    selectedOptionForSelect = {};
    selectedOption = [];

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        nextButton.style.display = 'none';
    } else {
        showResult();
        nextButton.textContent = 'Закрыть';
        nextButton.removeEventListener('click', nextQuestion);
        nextButton.addEventListener('click', closeQuizPopup);
    }
}

function showResult() {
    resultElement.textContent = 'Вы набрали ' + score + ' из ' + quizData.length + ' баллов.';
}

// Добавляем функцию сброса состояния
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = [];
    selectedOptionForSelect = {};
    resultElement.textContent = ''; // Очищаем результаты
    nextButton.textContent = 'Следующий вопрос'; // Возвращаем текст кнопки
    nextButton.removeEventListener('click', closeQuizPopup); // Убираем обработчик закрытия
    nextButton.addEventListener('click', nextQuestion); // Возвращаем обработчик для следующего вопроса
    loadQuestion(); // Загружаем первый вопрос заново
}

// Функция для закрытия попапа и сброса состояния
function closeQuizPopup() {
    const popUp = document.getElementById('pop_up');
    popUp.classList.remove('active'); // Закрываем попап
    resetQuiz(); // Сбрасываем викторину
}

// Функция открытия/закрытия попапа
function togglePopup(openButton, closeButton, popupElement) {
    openButton.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        popupElement.classList.add('active');
    });

    closeButton.addEventListener('click', function () {
        popupElement.classList.remove('active');
        resetQuiz(); // Сбрасываем викторину при закрытии
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const openPopUp = document.getElementById('open_pop_up');
    const closePopUp = document.getElementById('close_pop_up');
    const popUp = document.getElementById('pop_up');

    // Применяем функцию для этого попапа
    togglePopup(openPopUp, closePopUp, popUp);
});

nextButton.addEventListener('click', nextQuestion);
loadQuestion();