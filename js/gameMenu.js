import {
    menuContent // Импортируем содержимое меню из другого модуля
} from "./gameContents.js";

export const createGameMenu = (app) => {
    const gameContent = document.querySelector('.game-content'); // Находим элемент с классом 'game-content'
    
    gameContent.innerHTML = ''; // Очищаем содержимое элемента gameContent
    gameContent.innerHTML = menuContent; // Устанавливаем новое содержимое меню

    // Находим кнопки для выбора уровня сложности
    const easyBtn = document.querySelector('.easy'); // Кнопка "Легкий"
    const normBtn = document.querySelector('.norm'); // Кнопка "Нормальный"
    const hardBtn = document.querySelector('.hard'); // Кнопка "Сложный"

    // Добавляем обработчики событий для каждой кнопки
    easyBtn.addEventListener('click', () => app(35)); // При нажатии на кнопку "Легкий" вызываем app с аргументом 35
    normBtn.addEventListener('click', () => app(15)); // При нажатии на кнопку "Нормальный" вызываем app с аргументом 15
    hardBtn.addEventListener('click', () => app(5)); // При нажатии на кнопку "Сложный" вызываем app с аргументом 5
}
