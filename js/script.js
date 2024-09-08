$("document").ready(function() {
    $('.carusel').slick({
        arrows:true,
        dots: true,
        adaptiveHeight:true,
        slidesToShow: 3,
        speed:800,
        autoplay:true,
        autoPlaySpeed:5000,
        draggable:false,
        swipe:false,
        responsive:[
            {
                breakpoint:768,
                settings: {
                slidesToShow: 2,
            }
            }
            
        ]
    });
});