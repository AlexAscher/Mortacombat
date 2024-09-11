document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.vsetovari');
    const tovari = document.querySelectorAll('.tovari');
    let maxHeight = 0;
    let maxHeighttovari = 0;
    if (window.innerWidth > 768) {
        elements.forEach(element => {
            const elementHeight = element.offsetHeight;
            if (elementHeight > maxHeight) {
                maxHeight = elementHeight;
            }
        });
        elements.forEach(element => {
            element.style.height = `${maxHeight}px`;
        });
    }
    tovari.forEach(element => {
        const tovariHeight = element.offsetHeight;
        if (tovariHeight > maxHeighttovari) {
            maxHeighttovari = tovariHeight;
        }
    });
    maxHeighttovari = maxHeighttovari + 30;
    tovari.forEach(element => {
        element.style.height = `${maxHeighttovari}px`;
    });
});