$(document).ready(function () {
    $(document).ready(function () {
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
    });
});