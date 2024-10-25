// Импорт необходимых модулей и компонентов
import {
    tetrisContent // Контент игры Тетрис
} from "./gameContents.js";
import {
    createGameMenu // Функция для создания меню игры
} from "./gameMenu.js"
import {
    colors, // Цвета для тетромино
    tetrominoItems // Формы и конфигурации тетромино
} from "./tetrominoItems.js";
import {
    IsValidPos, // Функция для проверки допустимой позиции тетромино
    MoveOnClickLeft, // Функция для перемещения тетромино влево
    MoveOnClickRight, // Функция для перемещения тетромино вправо
    rapidFallOnDown, // Функция для быстрого падения тетромино вниз
    rotateOnClickUp, // Функция для поворота тетромино
    ShowGameMessage, // Функция для отображения сообщений на канвасе
    showNextTetromino, // Функция для отображения следующего тетромино
    shuffle, // Функция для перемешивания порядка тетромино
} from "./utilis.js";

// Основная функция приложения для настройки игры
const app = (difficulty) => {
    const gameContent = document.querySelector('.game-content'); // Выбор области контента игры
    gameContent.innerHTML = ''; // Очистка предыдущего контента
    gameContent.innerHTML = tetrisContent; // Добавление нового контента игры
    const canvas = document.getElementById('game'); // Получение элемента канваса
    const context = canvas.getContext('2d'); // Получение контекста рисования канваса
    const startBtn = document.querySelector('.start'); // Кнопка начала игры
    const pauseBtn = document.querySelector('.pause'); // Кнопка паузы
    const restartBtn = document.querySelector('.restart'); // Кнопка перезапуска
    const scoreBlock = document.querySelector('.score__total'); // Блок для отображения счета
    const topArrow = document.querySelector('.top'); // Стрелка вверх для поворота
    const bottomArrow = document.querySelector('.bottom2'); // Стрелка вниз для быстрого падения
    const leftArrow = document.querySelector('.left'); // Стрелка влево для перемещения
    const rightArrow = document.querySelector('.right'); // Стрелка вправо для перемещения
    const squareSize = 32; // Размер квадратов тетромино
    let tetrominoOrder = []; // Порядок тетромино
    let playArea = []; // Игровая область

    // Инициализация игровой области
    for (let row = -2; row < 20; row++) {
        playArea[row] = [];
        for (let col = 0; col < 10; col++) {
            playArea[row][col] = 0; // Заполнение области нулями
        }
    }

    let count = 0; // Счетчик кадров
    let tetromino = createTetromino(); // Создание нового тетромино
    let score = 0; // Игровой счет
    let isGameOver = false; // Флаг окончания игры
    let requestAnimationId = null; // ID анимации для управления игрой

    // Функция для отображения сообщения об окончании игры
    const ShowGameOver = () => {
        cancelAnimationFrame(requestAnimationId); // Остановка анимации
        isGameOver = true; // Установка флага окончания игры
        ShowGameMessage(context, canvas, 'GAME OVER!'); // Отображение сообщения
    }

    // Функция для создания нового тетромино
    function createTetromino() {
        if (tetrominoOrder.length === 0) {
            tetrominoOrder = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']; // Начальный порядок тетромино
            shuffle(tetrominoOrder); // Перемешивание порядка тетромино
        }
        const name = tetrominoOrder.pop(); // Получение имени следующего тетромино
        const matrix = tetrominoItems[name]; // Получение матрицы тетромино
        const col = playArea[0].length / 2 - Math.ceil(matrix[0].length / 2); // Начальная колонка для тетромино
        const row = name === 'I' ? -1 : -2; // Начальная строка для тетромино 'I' выше, для остальных ниже
        return {
            name,
            matrix,
            row,
            col
        };
    }

    // Функция для размещения тетромино в игровой области
    const PlaceTetromino = () => {
        for (let row = 0; row < tetromino.matrix.length; row++) {
            for (let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) { // Если в текущей ячейке есть часть тетромино
                    if (tetromino.row + row < 0) {
                        return ShowGameOver(); // Если тетромино выходит за верхнюю границу, игра окончена
                    }
                    playArea[tetromino.row + row][tetromino.col + col] = tetromino.name; // Размещение тетромино
                }
            }
        }

        // Проверка на заполненные ряды
        for (let row = playArea.length - 1; row >= 0; row--) {
            // Проверяем, полностью ли заполнен текущий ряд
            if (playArea[row].every(ceil => !!ceil)) {
                // Сдвигаем все ряды выше вниз
                for (let r = row; r > 0; r--) {
                    for (let col = 0; col < playArea[r].length; col++) {
                        playArea[r][col] = playArea[r - 1][col]; // Копируем ряды вниз
                    }
                }
                // Очищаем верхний ряд, чтобы не оставлять "мусор"
                for (let col = 0; col < playArea[0].length; col++) {
                    playArea[0][col] = 0; // Очистка верхнего ряда
                }
                
                // Увеличиваем счет и обновляем отображение
                score += 5; // Увеличение счета за удаление ряда
                scoreBlock.innerHTML = score; // Обновление отображения счета

                // Проверяем снова текущий ряд, так как он теперь содержит данные из ряда выше
                row++; // Возвращаемся к текущему ряду для повторной проверки
            }
        }
        tetromino = createTetromino(); // Создание нового тетромино
    }

    // Основная функция игры
    const game = () => {
        showNextTetromino(tetrominoOrder[tetrominoOrder.length - 1]); // Отображение следующего тетромино
        requestAnimationId = requestAnimationFrame(game); // Запуск следующего кадра игры
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); // Очистка канваса для перерисовки

        // Рисуем текущую игровую область
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 10; col++) {
                if (playArea[row][col]) { // Если ячейка не пустая
                    const name = playArea[row][col]; // Получение имени тетромино
                    context.fillStyle = colors[name]; // Установка цвета тетромино
                    context.fillRect(col * squareSize, row * squareSize, squareSize - 1, squareSize - 1); // Рисование квадрата тетромино
                }
            }
        }

        if (tetromino) { // Если есть активное тетромино
            if (++count > difficulty) { // Увеличиваем счетчик кадров
                tetromino.row++; // Понижаем строку тетромино
                count = 0; // Сброс счетчика
            }

            // Проверка на допустимость позиции
            if (!IsValidPos(tetromino.matrix, tetromino.row, tetromino.col, playArea)) {
                tetromino.row--; // Если позиция недопустима, возвращаем тетромино вверх
                PlaceTetromino(); // Размещаем тетромино в области
            }

            // Рисуем активное тетромино
            context.fillStyle = colors[tetromino.name]; // Установка цвета для текущего тетромино
            for (let row = 0; row < tetromino.matrix.length; row++) {
                for (let col = 0; col < tetromino.matrix[row].length; col++) {
                    if (tetromino.matrix[row][col]) { // Если ячейка не пустая
                        context.fillRect((tetromino.col + col) * squareSize, (tetromino.row + row) * squareSize, squareSize - 1, squareSize - 1); // Рисуем квадрат
                    }
                }
            }
        }
    };

    // Привязываем события к кнопкам
    startBtn.onclick = () => {
        // Начинаем игру при нажатии кнопки "Начать"
        if (!requestAnimationId) { // Если игра не запущена
            isGameOver = false; // Сбрасываем флаг окончания игры
            game(); // Запуск игры
            ShowGameMessage(context, canvas, ''); // Очищаем сообщение об окончании игры
        }
    };

    pauseBtn.onclick = () => {
        // Пауза игры
        cancelAnimationFrame(requestAnimationId); // Останавливаем анимацию
        requestAnimationId = null; // Сбрасываем ID анимации
    };

    restartBtn.onclick = () => {
        // Перезапуск игры
        cancelAnimationFrame(requestAnimationId); // Останавливаем анимацию
        requestAnimationId = null; // Сбрасываем ID анимации
        app(difficulty); // Запускаем новую игру
    };

    // Привязываем события к клавишам управления
    topArrow.onclick = () => {
        // Поворот тетромино
        rotateOnClickUp(tetromino, playArea); // Поворот текущего тетромино
    };

    bottomArrow.onclick = () => {
        // Быстрое падение тетромино
        rapidFallOnDown(tetromino, playArea); // Быстрое падение текущего тетромино
    };

    leftArrow.onclick = () => {
        // Перемещение тетромино влево
        MoveOnClickLeft(tetromino, playArea); // Перемещение текущего тетромино влево
    };

    rightArrow.onclick = () => {
        // Перемещение тетромино вправо
        MoveOnClickRight(tetromino, playArea); // Перемещение текущего тетромино вправо
    };

    // Обработчик события нажатия клавиши для управления тетромино
    document.addEventListener('keydown', (event) => {
        switch (event.code) { // В зависимости от нажатой клавиши
            case 'ArrowLeft':
                MoveOnClickLeft(tetromino, playArea); // Перемещение влево
                break;
            case 'ArrowRight':
                MoveOnClickRight(tetromino, playArea); // Перемещение вправо
                break;
            case 'ArrowDown':
                rapidFallOnDown(tetromino, playArea); // Быстрое падение
                break;
            case 'ArrowUp':
                rotateOnClickUp(tetromino, playArea); // Поворот
                break;
        }
    });
}

// Инициализация приложения с заданной сложностью
app(20);
