// Импортируем необходимые функции и переменные из других модулей
import {
    tetrisContent
} from "./gameContents.js";
import {
    createGameMenu
} from "./gameMenu.js";
import {
    colors,
    tetrominoItems
} from "./tetrominoItems.js";
import {
    IsValidPos,
    MoveOnClickLeft,
    MoveOnClickRight,
    rapidFallOnDown,
    rotateOnClickUp,
    ShowGameMessage,
    showNextTetromino,
    shuffle
} from "./utilis.js";

// Основная функция приложения, принимает уровень сложности игры
const app = (difficulty) => {
    // Настраиваем основное содержимое игры
    const gameContent = document.querySelector('.game-content');
    gameContent.innerHTML = '';
    gameContent.innerHTML = tetrisContent;

    // Инициализируем канвас и контекст рисования
    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');

    // Получаем элементы управления
    const startBtn = document.querySelector('.start');
    const pauseBtn = document.querySelector('.pause');
    const restartBtn = document.querySelector('.restart');
    const scoreBlock = document.querySelector('.score__total');
    const topArrow = document.querySelector('.top');
    const bottomArrow = document.querySelector('.bottom');
    const leftArrow = document.querySelector('.left');
    const rightArrow = document.querySelector('.right');

    // Размер одного квадрата тетрис-формы
    const squareSize = 32;
    let tetrominoOrder = []; // Порядок выпадения тетромино
    let playArea = []; // Игровая зона

    // Инициализируем игровую зону - сетка 10x20
    for (let row = -2; row < 20; row++) {
        playArea[row] = [];
        for (let col = 0; col < 10; col++) {
            playArea[row][col] = 0; // 0 - пустая клетка
        }
    }

    let count = 0; // Счётчик для контроля скорости падения
    let tetromino = createTetromino(); // Текущая тетромино
    let score = 0; // Счёт игрока
    let isGameOver = false; // Флаг окончания игры
    let requestAnimationId = null; // ID анимации

    // Функция отображения сообщения об окончании игры
    const ShowGameOver = () => {
        cancelAnimationFrame(requestAnimationId); // Останавливаем анимацию
        isGameOver = true;
        ShowGameMessage(context, canvas, 'GAME OVER!'); // Показываем сообщение
    };

    // Функция создания новой тетромино
    function createTetromino() {
        // Если порядок тетромино пуст, заполняем его и перемешиваем
        if (tetrominoOrder.length === 0) {
            tetrominoOrder = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
            shuffle(tetrominoOrder);
        }
        const name = tetrominoOrder.pop(); // Получаем последний элемент
        const matrix = tetrominoItems[name]; // Матрица формы тетромино
        const col = playArea[0].length / 2 - Math.ceil(matrix[0].length / 2); // Центрируем
        const row = name === 'I' ? -1 : -2; // Начальное положение

        return {
            name,
            matrix,
            row,
            col
        }; // Возвращаем объект тетромино
    }

    // Функция для размещения текущей тетромино на игровом поле
    const PlaceTetromino = () => {
        for (let row = 0; row < tetromino.matrix.length; row++) {
            for (let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) {
                    if (tetromino.row + row < 0) { // Если вышли за верх, заканчиваем игру
                        return ShowGameOver();
                    }
                    playArea[tetromino.row + row][tetromino.col + col] = tetromino.name; // Устанавливаем тетромино
                }
            }
        }

        // Удаление заполненных строк и пересчёт счёта
        for (let row = playArea.length - 1; row > 0; row--) {
            if (playArea[row].every(ceil => !!ceil)) { // Проверяем заполнение строки
                for (let r = row; r >= 0; r--) { // Сдвигаем строки вниз
                    for (let col = 0; col < playArea[r].length; col++) {
                        playArea[r][col] = playArea[r - 1][col];
                    }
                }
                scoreBlock.innerHTML = score += 5; // Добавляем очки
            } else {
                row--; // Переход к следующей строке
            }
        }
        tetromino = createTetromino(); // Создаём новую тетромино
    };

    // Основной игровой цикл
    const game = () => {
        showNextTetromino(tetrominoOrder[tetrominoOrder.length - 1]); // Показываем следующую фигуру
        requestAnimationId = requestAnimationFrame(game); // Запрашиваем следующий кадр
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); // Очищаем канвас

        // Рисуем игровую зону
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 10; col++) {
                if (playArea[row][col]) {
                    const name = playArea[row][col];
                    context.fillStyle = colors[name];
                    context.fillRect(col * squareSize, row * squareSize, squareSize - 1, squareSize - 1);
                }
            }
        }

        // Перемещение текущей тетромино
        if (tetromino) {
            if (++count > difficulty) { // Контролируем скорость падения
                tetromino.row++;
                count = 0;
            }
            if (!IsValidPos(tetromino.matrix, tetromino.row, tetromino.col, playArea)) { // Если нет места, фиксируем
                tetromino.row--;
                PlaceTetromino();
            }
            context.fillStyle = colors[tetromino.name];
            for (let row = 0; row < tetromino.matrix.length; row++) {
                for (let col = 0; col < tetromino.matrix[row].length; col++) {
                    if (tetromino.matrix[row][col]) { // Рисуем текущую фигуру
                        context.fillRect(
                            (tetromino.col + col) * squareSize,
                            (tetromino.row + row) * squareSize,
                            squareSize - 1,
                            squareSize - 1
                        );
                    }
                }
            }
        }
    };

    // Обработка нажатий на клавиши
    document.addEventListener('keydown', (e) => {
        if (isGameOver) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            rapidFallOnDown(tetromino, playArea, PlaceTetromino);
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            rotateOnClickUp(tetromino, playArea);
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            MoveOnClickRight(tetromino, playArea);
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            MoveOnClickLeft(tetromino, playArea);
        }
    });

    // Обработка нажатий на кнопки управления
    startBtn.addEventListener("click", () => {
        requestAnimationId = requestAnimationFrame(game); // Запуск игры
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    });

    pauseBtn.addEventListener('click', () => {
        cancelAnimationFrame(requestAnimationId); // Пауза
        ShowGameMessage(context, canvas, 'PAUSED');
        pauseBtn.disabled = true;
        startBtn.disabled = false;
    });

    restartBtn.addEventListener('click', () => {
        window.location.reload(); // Перезагрузка страницы
    });

    // Управление движением с помощью кнопок
    topArrow.addEventListener('click', () => rotateOnClickUp(tetromino, playArea));
    bottomArrow.addEventListener('click', () => rapidFallOnDown(tetromino, playArea, PlaceTetromino));
    rightArrow.addEventListener('click', () => MoveOnClickRight(tetromino, playArea));
    leftArrow.addEventListener('click', () => MoveOnClickLeft(tetromino, playArea));
};

// Создаём меню игры и передаём основную функцию
createGameMenu(app);