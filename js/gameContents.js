export const menuContent = `<div class="game-menu">
            <span class="diff">СЛОЖНОСТЬ</span>
            <button class="easy sketch-btn">ЛЕГКО</button>
            <button class="norm sketch-btn">НОРМАЛЬНО</button>
            <button class="hard sketch-btn">СЛОЖНО</button>
        </div>`
export const tetrisContent = `<h1 class="title">Tetris</h1>
        <div class="game-content__inner">
            <div class="canvas-bg">
                <canvas width="320" height="640" id="game"></canvas>
            </div>

            <div class="game-content__info">
                <div class="game-content__next">

                    <div class="next__inner">
                        <span class="next__title">NEXT</span>
                        <div class="tetromino">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div class="game-content__score">
                    <span class="score__title">SCORE</span>
                    <span class="score__total">0</span>
                </div>
                <div class="game-buttons">
                    <button class="sketch-btn start">START</button>
                    <button class="sketch-btn pause">PAUSE</button>
                    <button class="sketch-btn restart">RESTART</button>
                </div>
                <div class="game-controls">
                    <button class="sketch-btn1 top">
                        <span>
                            <img src="./img/arrow.svg" alt="">
                        </span>
                    </button>
                    <button class="sketch-btn1 bottom2">
                        <span>
                            <img src="./img/arrow.svg" alt="">
                        </span>
                    </button>
                    <button class="sketch-btn1 left">
                        <span>
                            <img src="./img/arrow.svg" alt="">
                        </span>
                    </button>
                    <button class="sketch-btn1 right">
                        <span>
                            <img src="./img/arrow.svg" alt="">
                        </span>
                    </button>
                </div>
            </div>
        </div>`