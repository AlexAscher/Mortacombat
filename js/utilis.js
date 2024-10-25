// Функция для перемешивания элементов массива
export const shuffle = (array) => {
    let currentIndex = array.length; // Устанавливаем текущий индекс на длину массива

    // Пока текущий индекс не равен 0
    while (currentIndex != 0) {
        // Генерируем случайный индекс
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--; // Уменьшаем текущий индекс

        // Меняем местами элементы массива
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
}

// Функция для проверки допустимости позиции тетромино
export const IsValidPos = (tetromino, tetrominoRow, tetrominoCol, playArea) => {
    for (let row = 0; row < tetromino.length; row++) {
        for (let col = 0; col < tetromino[row].length; col++) {
            // Проверяем, если тетромино выходит за границы или пересекается с другими
            if (tetromino[row][col] && (tetrominoCol + col < 0 || tetrominoCol + col >= playArea[0].length || tetrominoRow + row >= playArea.length || playArea[tetrominoRow + row][tetrominoCol + col])) {
                return false; // Позиция недопустима
            }
        }
    }
    return true; // Позиция допустима
}

// Функция для быстрого падения тетромино вниз
export const rapidFallOnDown = (tetromino, playArea, placeTetromino) => {
    const rowfordown = tetromino.row + 1; // Рассчитываем новую строку для падения
    if (!IsValidPos(tetromino.matrix, rowfordown, tetromino.col, playArea)) {
        tetromino.row = rowfordown - 1; // Устанавливаем тетромино на последнюю допустимую позицию
        placeTetromino(); // Размещаем тетромино на поле
        return;
    }
    tetromino.row = rowfordown; // Перемещаем тетромино вниз
}

// Функция для отображения сообщения об игре на холсте
export const ShowGameMessage = (context, canvas, text) => {
    context.fillStyle = 'black'; // Устанавливаем цвет фона
    context.globalAlpha = 0.75; // Устанавливаем прозрачность
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60); // Рисуем прямоугольник для сообщения
    context.globalAlpha = 1; // Сбрасываем прозрачность
    context.fillStyle = 'white'; // Устанавливаем цвет текста
    context.font = '36px monospace'; // Устанавливаем шрифт
    context.textAlign = 'center'; // Выравниваем текст по центру
    context.textBaseline = 'middle'; // Выравниваем текст по вертикали
    context.fillText(text, canvas.width / 2, canvas.height / 2); // Выводим текст на холст
}

// Функция для вращения матрицы тетромино
const rotate = (matrix) => {
    const N = matrix.length - 1; // Определяем размер матрицы
    // Создаем новую матрицу с повернутыми значениями
    const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
    );
    return result; // Возвращаем повернутую матрицу
}

// Функция для вращения тетромино при клике
export const rotateOnClickUp = (tetromino, playArea) => {
    const matrix = rotate(tetromino.matrix); // Поворачиваем матрицу тетромино
    if (IsValidPos(matrix, tetromino.row, tetromino.col, playArea)) {
        tetromino.matrix = matrix; // Устанавливаем новую матрицу, если позиция допустима
    }
}

// Функция для перемещения тетромино вправо
export const MoveOnClickRight = (tetromino, playArea) => {
    const col = tetromino.col + 1; // Рассчитываем новую колонку
    if (IsValidPos(tetromino.matrix, tetromino.row, col, playArea)) {
        tetromino.col = col; // Устанавливаем новую колонку, если позиция допустима
    }
}

// Функция для перемещения тетромино влево
export const MoveOnClickLeft = (tetromino, playArea) => {
    const col = tetromino.col - 1; // Рассчитываем новую колонку
    if (IsValidPos(tetromino.matrix, tetromino.row, col, playArea)) {
        tetromino.col = col; // Устанавливаем новую колонку, если позиция допустима
    }
}

// Функция для отображения следующего тетромино на экране
export const showNextTetromino = (name) => {
    const block = document.querySelector('.tetromino'); // Находим элемент для тетромино
    switch (name) {
        case 'I':
            block.className = 'tetromino tetromino-i'; // Устанавливаем класс для тетромино I
            break;
        case 'Z':
            block.className = 'tetromino tetromino-z'; // Устанавливаем класс для тетромино Z
            break;
        case 'T':
            block.className = 'tetromino tetromino-t'; // Устанавливаем класс для тетромино T
            break;
        case 'O':
            block.className = 'tetromino tetromino-o'; // Устанавливаем класс для тетромино O
            break;
        case 'L':
            block.className = 'tetromino tetromino-l'; // Устанавливаем класс для тетромино L
            break;
        case 'S':
            block.className = 'tetromino tetromino-s'; // Устанавливаем класс для тетромино S
            break;
        case 'J':
            block.className = 'tetromino tetromino-j'; // Устанавливаем класс для тетромино J
            break;
    }
}
