document.addEventListener('DOMContentLoaded', function () {
    let novinki = document.querySelector('.novinki');
    let alltovars = document.querySelector('.alltovars');
    let popularity = document.querySelector('.popularity');
    let one = document.querySelector('.one');
    let two = document.querySelector('.two');
    let three = document.querySelector('.three');
    let shopHeader = document.querySelector('.shop h2');
    let forcarusel2Header = document.querySelector('.forcarusel2 h2');
    let forcarusel3Header = document.querySelector('.forcarusel3 h2');
    let twonew = document.querySelector('.twonew');
    let threepop = document.querySelector('.threepop');

    let carouselInterval;

    function startCarousel() {
        carouselInterval = setInterval(() => {
            $('.carusel').slick('slickNext');
        }, 5000); // Интервал автопрокрутки в миллисекундах
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    function updateCarousel() {
        $('.carusel').slick('unslick'); // Удаляем предыдущую инициализацию
        $('.carusel').slick({
            arrows: true,
            dots: true,
            slidesToShow: 3,
            speed: 800,
            autoplay: true,
            autoplaySpeed: 5000,
            draggable: false,
            swipe: false,
            infinite: true,
            responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
        startCarousel(); // Запускаем автопрокрутку после обновления карусели
    }

    function handleTabClick(tab, showOne, showTwo, showThree, headerText, showForcarusel2,
        showForcarusel3, showTwonew, showThreepop) {
        novinki.classList.remove('light');
        alltovars.classList.remove('light');
        popularity.classList.remove('light');
        tab.classList.add('light');

        one.classList.toggle('d-none', !showOne);
        two.classList.toggle('d-none', !showTwo);
        three.classList.toggle('d-none', !showThree);

        shopHeader.textContent = headerText;

        if (window.innerWidth > 992) {
            forcarusel2Header.style.display = showForcarusel2 ? 'block' : 'none';
            forcarusel3Header.style.display = showForcarusel3 ? 'block' : 'none';
            twonew.style.display = showTwonew ? 'block' : 'none';
            threepop.style.display = showThreepop ? 'block' : 'none';
        }

        stopCarousel(); // Останавливаем автопрокрутку перед обновлением карусели
        updateCarousel(); // Обновляем карусель
    }

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
        updateCarousel();
    });
});