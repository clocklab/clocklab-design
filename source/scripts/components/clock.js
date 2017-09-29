$(window).on('load', function() {
    
    // инициализация функций
    (function() {
      initLocalClocks();
      moveSecondHands();
      setUpMinuteHands();
    })();
});

// устанавливает точку отсчета любых часов в соответствии с местным временем пользователя
function initLocalClocks() {

    // узнать местное время с помощью JS
    var date = new Date;
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // создать объект, хранящий все стрелки и их углы в градусах
    var hands = [
        {
            hand: 'hours',
            angle: (hours * 30) + (minutes / 2)
        },
        {
            hand: 'minutes',
            angle: (minutes * 6)
        },
        {
            hand: 'seconds',
            angle: (seconds * 6)
        }
    ];

    // с помощью цикла установить угол для каждой из стрелок
    for (var j = 0; j < hands.length; j++) {
        var elements = document.querySelectorAll('.' + hands[j].hand);
        
        for (var k = 0; k < elements.length; k++) {
            elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle + 'deg)';
            elements[k].style.transform = 'rotateZ('+ hands[j].angle + 'deg)';

            // если это минутная стрелка, сохранить положение секундной стрелки (для дальнейшего расчета положения минутной стрелки)
            if (hands[j].hand === 'minutes') {
                elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
            }
        }
    }
}

// установить таймаут для первого движения минутной стрелки (меньше 1 минуты), после чего поворачивать ее каждую минуту
function setUpMinuteHands() {

    // вычислить, сколько секунд прошло с начала этой минуты
    var containers = document.querySelectorAll('.minutes-container');
    var secondAngle = containers[0].getAttribute("data-second-angle");
    if (secondAngle > 0) {
        
        // установить таймаут до конца текущей минуты, чтобы передвинуть стрелку
        var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;

        setTimeout(function() {
            moveMinuteHands(containers);
        }, delay);
    }
}

// выполнить первый поворот минутной стрелки
function moveMinuteHands(containers) {
    for (var i = 0; i < containers.length; i++) {
        containers[i].style.webkitTransform = 'rotateZ(6deg)';
        containers[i].style.transform = 'rotateZ(6deg)';
    }

    // после этого продолжить с интервалом в 60 секунд
    setInterval(function() {
        for (var i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 12;
            } else {
                containers[i].angle += 6;
            }
            containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle + 'deg)';
            containers[i].style.transform = 'rotateZ('+ containers[i].angle + 'deg)';
        }
    }, 60000);
}

// перемещение контейнера секундной стрелки
function moveSecondHands() {
    var containers = document.querySelectorAll('.seconds-container');

    setInterval(function() {
        for (var i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 6;
            } else {
                containers[i].angle += 6;
            }
            containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle + 'deg)';
            containers[i].style.transform = 'rotateZ('+ containers[i].angle + 'deg)';
        }
    }, 1000);
}