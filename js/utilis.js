export const shuffle = (array) => {
    let currentIndex = array.length;


    while (currentIndex != 0) {


        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;


        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
}
export const IsValidPos = (tetromino, tetrominoRow, tetrominoCol, playArea) => {
    for (let row = 0; row < tetromino.length; row++) {
        for (let col = 0; col < tetromino[row].length; col++) {
            if (tetromino[row][col] && (tetrominoCol + col < 0 || tetrominoCol + col >= playArea[0].length || tetrominoRow + row >= playArea.length || playArea[tetrominoRow + row][tetrominoCol + col])) {
                return false

            }
        }
    }
    return true
}
export const rapidFallOnDown = (tetromino, playArea, placeTetromino) => {
    const rowfordown = tetromino.row + 1
    if (!IsValidPos(tetromino.matrix, rowfordown, tetromino.col, playArea)) {
        tetromino.row = rowfordown - 1
        placeTetromino()
        return
    }
    tetromino.row = rowfordown
}
export const ShowGameMessage = (context, canvas, text) => {
    context.fillStyle = 'black'
    context.globalAlpha = 0.75
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60)
    context.globalAlpha = 1
    context.fillStyle = 'white'
    context.font = '36px monospace'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, canvas.width / 2, canvas.height / 2)
}
const rotate = (matrix) => {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
    );
    return result;
}
export const rotateOnClickUp = (tetromino, playArea) => {
    const matrix = rotate(tetromino.matrix)
    if (IsValidPos(matrix, tetromino.row, tetromino.col, playArea)) {
        tetromino.matrix = matrix
    }
}
export const MoveOnClickRight = (tetromino, playArea) => {
    const col = tetromino.col + 1
    if (IsValidPos(tetromino.matrix, tetromino.row, col, playArea)) {
        tetromino.col = col
    }
}
export const MoveOnClickLeft = (tetromino, playArea) => {
    const col = tetromino.col - 1
    if (IsValidPos(tetromino.matrix, tetromino.row, col, playArea)) {
        tetromino.col = col
    }
}
export const showNextTetromino = (name) => {
    const block = document.querySelector('.tetromino')
    switch (name) {
        case 'I':
            block.className = 'tetromino tetromino-i'
            break
        case 'Z':
            block.className = 'tetromino tetromino-z'
            break
        case 'T':
            block.className = 'tetromino tetromino-t'
            break
        case 'O':
            block.className = 'tetromino tetromino-o'
            break
        case 'L':
            block.className = 'tetromino tetromino-l'
            break
        case 'S':
            block.className = 'tetromino tetromino-s'
            break
        case 'J':
            block.className = 'tetromino tetromino-j'
            break
    }
}