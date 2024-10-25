import {
    tetrisContent
} from "./gameContents.js";
import {
    createGameMenu
} from "./gameMenu.js"
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
    shuffle,

} from "./utilis.js";

const app = (difficulty) => {
    const gameContent = document.querySelector('.game-content');
    gameContent.innerHTML = ''
    gameContent.innerHTML = tetrisContent
    const canvas = document.getElementById('game')
    const context = canvas.getContext('2d')
    const startBtn = document.querySelector('.start')
    const pauseBtn = document.querySelector('.pause')
    const restartBtn = document.querySelector('.restart')
    const scoreBlock = document.querySelector('.score__total')
    const topArrow = document.querySelector('.top')
    const bottomArrow = document.querySelector('.bottom2')
    const leftArrow = document.querySelector('.left')
    const rightArrow = document.querySelector('.right')
    const squareSize = 32
    let tetrominoOrder = []
    let playArea = []
    for (let row = -2; row < 20; row++) {
        playArea[row] = []
        for (let col = 0; col < 10; col++) {
            playArea[row][col] = 0
        }
    }
    let count = 0;
    let tetromino = createTetromino()
    let score = 0
    let isGameOver = false
    let requestAnimationId = null
    const ShowGameOver = () => {
        cancelAnimationFrame(requestAnimationId)
        isGameOver = true
        ShowGameMessage(context, canvas, 'GAME OVER!')
    }

    function createTetromino() {
        if (tetrominoOrder.length === 0) {
            tetrominoOrder = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
            shuffle(tetrominoOrder)
        }
        const name = tetrominoOrder.pop()
        const matrix = tetrominoItems[name]
        const col = playArea[0].length / 2 - Math.ceil(matrix[0].length / 2)
        const row = name === 'I' ? -1 : -2
        return {
            name,
            matrix,
            row,
            col
        }
    }
    const PlaceTetromino = () => {
        for (let row = 0; row < tetromino.matrix.length; row++) {
            for (let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) {
                    if (tetromino.row + row < 0) {
                        return ShowGameOver()
                    }

                    playArea[tetromino.row + row][tetromino.col + col] = tetromino.name

                }
            }
        }
        for (let row = playArea.length - 1; row >= 0; row--) {
            // Проверяем, полностью ли заполнен текущий ряд
            if (playArea[row].every(ceil => !!ceil)) {
                // Сдвигаем все ряды выше вниз
                for (let r = row; r > 0; r--) {
                    for (let col = 0; col < playArea[r].length; col++) {
                        playArea[r][col] = playArea[r - 1][col];
                    }
                }
                // Очищаем верхний ряд, чтобы не оставлять "мусор"
                for (let col = 0; col < playArea[0].length; col++) {
                    playArea[0][col] = 0;
                }
                
                // Увеличиваем счет и обновляем отображение
                score += 5;
                scoreBlock.innerHTML = score;
        
                // Проверяем снова текущий ряд, так как он теперь содержит данные из ряда выше
                row++;
            }
        }
        tetromino = createTetromino() //
    }
    const game = () => {
        showNextTetromino(tetrominoOrder[tetrominoOrder.length - 1])
        requestAnimationId = requestAnimationFrame(game)
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 10; col++) {
                if (playArea[row][col]) {
                    const name = playArea[row][col]
                    context.fillStyle = colors[name]
                    context.fillRect(col * squareSize, row * squareSize, squareSize - 1, squareSize - 1)
                }
            }
        }
        if (tetromino) {
            if (++count > difficulty) {
                tetromino.row++
                count = 0
            }
            if (!IsValidPos(tetromino.matrix, tetromino.row, tetromino.col, playArea)) {
                tetromino.row--
                PlaceTetromino()
            }
            context.fillStyle = colors[tetromino.name]
            for (let row = 0; row < tetromino.matrix.length; row++) {
                for (let col = 0; col < tetromino.matrix[row].length; col++) {
                    if (tetromino.matrix[row][col]) {
                        context.fillRect((tetromino.col + col) * squareSize, (tetromino.row + row) * squareSize, squareSize - 1, squareSize - 1)

                    }
                }
            }
        }


    }
    document.addEventListener('keydown', (e) => {

        if (isGameOver) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            rapidFallOnDown(tetromino, playArea, PlaceTetromino)
        }
        if (e.key === "ArrowUp") {
            e.preventDefault()
            rotateOnClickUp(tetromino, playArea)
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault()
            MoveOnClickRight(tetromino, playArea)
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault()
            MoveOnClickLeft(tetromino, playArea)
        }
    });
    startBtn.addEventListener("click", () => {
        requestAnimationId = requestAnimationFrame(game);
        startBtn.disabled = true
        pauseBtn.disabled = false
    })
    pauseBtn.addEventListener('click', () => {
        cancelAnimationFrame(requestAnimationId)
        ShowGameMessage(context, canvas, 'PAUSED')
        pauseBtn.disabled = true
        startBtn.disabled = false
    })
    restartBtn.addEventListener('click', () => {
        window.location.reload()
    })
    topArrow.addEventListener('click', () => rotateOnClickUp(tetromino, playArea))
    bottomArrow.addEventListener('click', () => rapidFallOnDown(tetromino, playArea, PlaceTetromino))
    rightArrow.addEventListener('click', () => MoveOnClickRight(tetromino, playArea))
    leftArrow.addEventListener('click', () => MoveOnClickLeft(tetromino, playArea))
}
createGameMenu(app)