document.addEventListener("DOMContentLoaded", function () {
    function toggleDetails(button, details) {
        let areOpen = Array.from(details).every(detail => detail.open);
        details.forEach(detail => detail.open = !areOpen);
        button.textContent = areOpen ? "Показать Фильтр" : "Скрыть Фильтры";
    }

    const buttons = document.querySelectorAll("#filter");
    const detailsElements = document.querySelectorAll(".firstdetail");
    const detailsElements2 = document.querySelectorAll(".firstdetail2");

    buttons.forEach((button, index) => {
        button.addEventListener("click", function () {
            const details = index === 0 ? detailsElements : detailsElements2;
            toggleDetails(button, details);
        });
    });
});