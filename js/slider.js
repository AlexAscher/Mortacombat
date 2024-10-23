document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const fromH5 = document.querySelector('.eto');

    slider.addEventListener('input', function () {
        fromH5.textContent = slider.value;
    });
    
});