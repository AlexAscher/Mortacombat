document.addEventListener('DOMContentLoaded', function () {
    // Получаем ссылки на элементы, которые будем использовать
    let novinki = document.querySelector('.novinki'); // Элемент вкладки "Новинки"
    let alltovars = document.querySelector('.alltovars'); // Элемент вкладки "Все товары"
    let popularity = document.querySelector('.popularity'); // Элемент вкладки "Популярное"
    let one = document.querySelector('.one'); // Первый контейнер для товаров
    let two = document.querySelector('.two'); // Второй контейнер для товаров
    let three = document.querySelector('.three'); // Третий контейнер для товаров
    let shopHeader = document.querySelector('.shop h2'); // Заголовок магазина
    let forcarusel2Header = document.querySelector('.forcarusel2 h2'); // Заголовок второго каруселя
    let forcarusel3Header = document.querySelector('.forcarusel3 h2'); // Заголовок третьего каруселя
    let twonew = document.querySelector('.twonew'); // Элемент для отображения "Два новых"
    let threepop = document.querySelector('.threepop'); // Элемент для отображения "Три популярных"

    let carouselInterval; // Переменная для хранения идентификатора интервала автопрокрутки

    // Функция для запуска автопрокрутки карусели
    function startCarousel() {
        carouselInterval = setInterval(() => {
            $('.carusel').slick('slickNext'); // Прокручиваем карусель к следующему элементу
        }, 5000); // Интервал автопрокрутки в миллисекундах
    }

    // Функция для остановки автопрокрутки карусели
    function stopCarousel() {
        clearInterval(carouselInterval); // Очищаем интервал
    }

    // Функция для обновления карусели с новыми настройками
    function updateCarousel() {
        $('.carusel').slick('unslick'); // Удаляем предыдущую инициализацию карусели
        $('.carusel').slick({
            arrows: true, // Показывать стрелки навигации
            dots: true, // Показывать точки под каруселью
            slidesToShow: 3, // Количество отображаемых слайдов
            speed: 800, // Скорость прокрутки
            autoplay: true, // Включить автопрокрутку
            autoplaySpeed: 5000, // Скорость автопрокрутки
            draggable: false, // Запретить перетаскивание слайдов
            swipe: false, // Запретить свайпы
            infinite: true, // Зацикливание карусели
            responsive: [ // Настройки для различных разрешений
                {
                    breakpoint: 768, // Для экранов меньше 768px
                    settings: {
                        slidesToShow: 2 // Показать 2 слайда
                    }
                },
                {
                    breakpoint: 576, // Для экранов меньше 576px
                    settings: {
                        slidesToShow: 1 // Показать 1 слайд
                    }
                }
            ]
        });
        startCarousel(); // Запускаем автопрокрутку после обновления карусели
    }

    // Функция для обработки клика по вкладкам
    function handleTabClick(tab, showOne, showTwo, showThree, headerText, showForcarusel2,
        showForcarusel3, showTwonew, showThreepop) {
        // Убираем выделение с других вкладок и добавляем выделение к текущей
        novinki.classList.remove('light');
        alltovars.classList.remove('light');
        popularity.classList.remove('light');
        tab.classList.add('light');

        // Показ или скрытие контейнеров с товарами
        one.classList.toggle('d-none', !showOne);
        two.classList.toggle('d-none', !showTwo);
        three.classList.toggle('d-none', !showThree);

        shopHeader.textContent = headerText; // Устанавливаем текст заголовка магазина

        // Управление видимостью заголовков каруселей и элементов в зависимости от ширины экрана
        if (window.innerWidth > 992) {
            forcarusel2Header.style.display = showForcarusel2 ? 'block' : 'none'; // Заголовок второго каруселя
            forcarusel3Header.style.display = showForcarusel3 ? 'block' : 'none'; // Заголовок третьего каруселя
            twonew.style.display = showTwonew ? 'block' : 'none'; // Элемент "Два новых"
            threepop.style.display = showThreepop ? 'block' : 'none'; // Элемент "Три популярных"
        }

        stopCarousel(); // Останавливаем автопрокрутку перед обновлением карусели
        updateCarousel(); // Обновляем карусель
    }

    // Добавляем обработчики событий для вкладок
    novinki.addEventListener('click', function () {
        handleTabClick(novinki, true, false, false, 'Лидеры продаж', true, true, true, true);
    });

    alltovars.addEventListener('click', function () {
        handleTabClick(alltovars, false, true, false, 'Все товары', false, false, false, true);
    });

    popularity.addEventListener('click', function () {
        handleTabClick(popularity, false, false, true, 'Популярное', true, true, true, false);
    });

    // Изначально скрываем элементы two и three
    two.classList.add('d-none');
    three.classList.add('d-none');

    // Инициализируем карусель после полной загрузки всех изображений
    window.addEventListener('load', function () {
        updateCarousel(); // Обновляем карусель при загрузке страницы
    });
});
