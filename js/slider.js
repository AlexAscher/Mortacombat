document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider');
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');

    noUiSlider.create(slider, {
        start: [100, 10000],
        connect: true,
        range: {
            'min': 0,
            'max': 10000
        },
        step: 1,
        format: {
            to: function (value) {
                return Math.round(value);
            },
            from: function (value) {
                return Number(value);
            }
        }
    });

    slider.noUiSlider.on('update', function (values, handle) {
        if (handle === 0) {
            fromValue.textContent = values[handle];
        } else {
            toValue.textContent = values[handle];
        }
    });
});