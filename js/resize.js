// Добавляем обработчик события изменения размера окна
window.addEventListener('resize', function () {
    // Находим все элементы с классом 'container'
    const containers = document.querySelectorAll('.container');

    // Проверяем, если ширина окна меньше 992 пикселей
    if (window.innerWidth < 992) {
        // Для каждого контейнера изменяем его классы
        containers.forEach(container => {
            // Удаляем класс 'container'
            container.classList.remove('container');
            // Добавляем класс 'container-fluid' для адаптивной ширины
            container.classList.add('container-fluid');
            // Добавляем класс 'mdpixels' (можно использовать для специфичных стилей)
            container.classList.add('mdpixels');
        });
    } else {
        // Если ширина окна 992 пикселя или больше
        containers.forEach(container => {
            // Удаляем класс 'container-fluid'
            container.classList.remove('container-fluid');
            // Возвращаем класс 'container' для стандартной ширины
            container.classList.add('container');
        });
    }
});

// Инициализируем событие изменения размера окна сразу, чтобы установить правильные классы при загрузке страницы
window.dispatchEvent(new Event('resize'));
