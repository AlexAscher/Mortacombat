window.addEventListener('resize', function () {
    const containers = document.querySelectorAll('.container');
    if (window.innerWidth < 992) {
        containers.forEach(container => {
            container.classList.remove('container');
            container.classList.add('container-fluid');
            container.classList.add('mdpixels');
        });
    } else {
        containers.forEach(container => {
            container.classList.remove('container-fluid');
            container.classList.add('container');
        });
    }
});

window.dispatchEvent(new Event('resize'));