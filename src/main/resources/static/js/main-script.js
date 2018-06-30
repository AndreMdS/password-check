var $status = $("#status");
var $score = $("#score");

function changeClass(name) {
    $status.removeClass(function (index, className) {
        return (className.match(/(^|\s)status-\S+/g) || []).join(' ');
    });
    $status.addClass(name);
}

$("#password").keyup(function () {
    var value = $(this).val();
    var size = $(this).val().length;
    var points = incPoints(value, size);
    points = points - decPoints(value, size);
    setStatus(points, size);
});

function incPoints(value, size) {
    var points = 0;
    var numCount = 0;
    var lowCount = 0;
    var upperCount = 0;
    var symbCount = 0;
    var midNumSymb = 0;
    var hasNum = 0;
    var hasLow = 0;
    var hasUpper = 0;
    var hasSymb = 0;
    var reqs = 0;
    for (var i = 0; i < size; i++) {
        if (value[i].match(/[A-Z]/g)) {
            upperCount++;
            hasUpper = 1;
        } else if (value[i].match(/[a-z]/g)) {
            lowCount++;
            hasLow = 1;
        } else if (value[i].match(/[0-9]/g)) {
            numCount++;
            hasNum = 1;
        } else if (value[i].match(/[^a-zA-Z0-9_]/g)) {
            symbCount++;
            hasSymb = 1;
        }
        if (i > 0 && i < size - 1) {
            if (value[i].match(/[^a-zA-Z_]/g)) {
                midNumSymb++;
            }
        }
    }

    if ((lowCount + upperCount) === size || numCount === size) {
        points = 0 - size;
    }

    if (!(lowCount || upperCount || symbCount)) {
        numCount = 0;
    }

    if (lowCount === 0) {
        lowCount = size;
    }

    if (upperCount === 0) {
        upperCount = size;
    }

    reqs = hasUpper + hasLow + hasNum + hasSymb;
    if (size > 8 && reqs >= 3) {
        reqs++;
    } else {
        reqs = 0;
    }

    points = (numCount * 4) +
            ((size - lowCount) * 2) +
            ((size - upperCount) * 2) +
            (symbCount * 6) +
            (midNumSymb * 2) +
            (size * 4) +
            (reqs * 2) +
            points;
    points;

    return points;
}

function decPoints(value, size) {
    var points = 0;
    var consecutives = 0;
    var sequences = 0;
    for (var i = 0; i < size - 1; i++) {
        if (value[i].match(/[A-Z]/g) && value[i + 1].match(/[A-Z]/g)) {
            consecutives++;
        } else if (value[i].match(/[a-z]/g) && value[i + 1].match(/[a-z]/g)) {
            consecutives++;
        } else if (value[i].match(/[0-9]/g) && value[i + 1].match(/[0-9]/g)) {
            consecutives++;
        }
    }

    value = value.toLowerCase();
    
    for (var i = 0; i < size - 3; i++) {
        if ((String.fromCharCode(value[i].charCodeAt(0) + 1) === value[i + 1] && String.fromCharCode(value[i].charCodeAt(0) + 2) === value[i + 2]) || (String.fromCharCode(value[i].charCodeAt(0) - 1) === value[i + 1] && String.fromCharCode(value[i].charCodeAt(0) - 2) === value[i + 2])) {
            sequences++;
        }
    }

    points = (consecutives * 2) +
            (sequences * 3);

    return points;
}

function setStatus(points, size) {
    if (points < 0) {
        points = 0;
    } else if (points > 100) {
        points = 100;
    }
    $score.text(points + "%");
    if (size === 0) {
        changeClass("");
        $status.text("Vazio");
    } else if (points >= 0 && points < 20) {
        changeClass("status-worst");
        $status.text("Ruim");
    } else if (points >= 20 && points < 40) {
        changeClass("status-weak");
        $status.text("Fraca");
    } else if (points >= 40 && points < 60) {
        changeClass("status-good");
        $status.text("Boa");
    } else if (points >= 60 && points < 80) {
        changeClass("status-strong");
        $status.text("Forte");
    } else if (points >= 80 && points <= 100) {
        changeClass("status-excelent");
        $status.text("Excelente");
    }
}
