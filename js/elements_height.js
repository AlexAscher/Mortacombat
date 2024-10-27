window.onload = () => {
    const elements = document.querySelectorAll('.vsetovari');
    const tovari = document.querySelectorAll('.tovari');
    let maxHeight = 0;
    let maxHeighttovari = 0;

    // Определение максимальной высоты для .vsetovari
    elements.forEach(element => {
        const elementHeight = element.offsetHeight;
        if (elementHeight > maxHeight) {
            maxHeight = elementHeight;
        }
    });

    // Установка максимальной высоты для всех .vsetovari
    elements.forEach(element => {
        element.style.height = `${maxHeight}px`;
    });

    // Определение максимальной высоты для .tovari
    tovari.forEach(element => {
        const tovariHeight = element.offsetHeight;
        if (tovariHeight > maxHeighttovari) {
            maxHeighttovari = tovariHeight;
        }
    });

    // Добавление дополнительного пространства
    maxHeighttovari = maxHeighttovari + 30;

    // Установка максимальной высоты для всех .tovari
    tovari.forEach(element => {
        element.style.height = `${maxHeighttovari}px`;
    });
};