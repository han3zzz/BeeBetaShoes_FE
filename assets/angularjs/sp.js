var loadFile = function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
};
let min = 0;
let max = 9999999;

const calcLeftPosition = value => 100 / (9999999 - 0) *  (value - 0);

$('#rangeMin').on('input', function(e) {
    const newValue = parseInt(e.target.value);
    if (newValue > max) return;
    min = newValue;
    $('#thumbMin').css('left', calcLeftPosition(newValue) + '%');
    $('#min').html(newValue);
    $('#line').css({
        'left': calcLeftPosition(newValue) + '%',
        'right': (100 - calcLeftPosition(max)) + '%'
    });
});

$('#rangeMax').on('input', function(e) {
    const newValue = parseInt(e.target.value);
    if (newValue < min) return;
    max = newValue;
    $('#thumbMax').css('left', calcLeftPosition(newValue) + '%');
    $('#max').html(newValue);
    $('#line').css({
        'left': calcLeftPosition(min) + '%',
        'right': (100 - calcLeftPosition(newValue)) + '%'
    });
});

//trong luong
let minTL = 0;
let maxTL = 3000;

const calcLeftPosition1 = value => 100 / (3000 - 0) *  (value - 0);

$('#rangeMinTL').on('input', function(e) {
    const newValue = parseInt(e.target.value);
    if (newValue > maxTL) return;
    minTL = newValue;
    $('#thumbMinTL').css('left', calcLeftPosition1(newValue) + '%');
    $('#minTL').html(newValue);
    $('#lineTL').css({
        'left': calcLeftPosition1(newValue) + '%',
        'right': (100 - calcLeftPosition1(maxTL)) + '%'
    });
});

$('#rangeMaxTL').on('input', function(e) {
    const newValue = parseInt(e.target.value);
    if (newValue < minTL) return;
    maxTL = newValue;
    $('#thumbMaxTL').css('left', calcLeftPosition1(newValue) + '%');
    $('#maxTL').html(newValue);
    $('#lineTL').css({
        'left': calcLeftPosition1(minTL) + '%',
        'right': (100 - calcLeftPosition1(newValue)) + '%'
    });
});
