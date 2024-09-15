document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("#filter");
    const detailsElements = document.querySelectorAll(".firstdetail");
    const detailsElements2 = document.querySelectorAll(".firstdetail2");

    function toggleDetails(button, details) {
        let areAllOpen = Array.from(details).every(detail => detail.open);
        details.forEach(detail => detail.open = !areAllOpen);
        button.textContent = areAllOpen ? "Показать Фильтр" : "Скрыть Фильтры";
    }

    function updateButtonText(button, details) {
        let areAllOpen = Array.from(details).every(detail => detail.open);
        button.textContent = areAllOpen ? "Скрыть Фильтры" : "Показать Фильтр";
    }

    buttons.forEach((button, index) => {
        const details = index === 0 ? detailsElements : detailsElements2;

        button.addEventListener("click", function () {
            toggleDetails(button, details);
        });

        details.forEach(detail => {
            detail.addEventListener("toggle", function () {
                updateButtonText(button, details);
            });
        });
    });
});