document.addEventListener("DOMContentLoaded", function () {
    function toggleDetails(button, details) {
        let areOpen = Array.from(details).every(detail => detail.open);
        details.forEach(detail => detail.open = !areOpen);
        button.textContent = areOpen ? "Показать Фильтр" : "Скрыть Фильтры";
    }

    const buttons = document.querySelectorAll("#filter");
    const detailsElements = document.querySelectorAll(".firstdetail");
    const detailsElements2 = document.querySelectorAll(".firstdetail2");

    buttons[0].addEventListener("click", function () {
        toggleDetails(buttons[0], detailsElements);
    });

    buttons[1].addEventListener("click", function () {
        toggleDetails(buttons[1], detailsElements2);
    });
});