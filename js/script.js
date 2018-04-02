let m = 1,
    s = 0,
    t,
    p = document.querySelector(".play"),
    x = document.querySelector(".timer"),
    y = document.querySelector("#tempo"),
    b = document.querySelector("#audio");

function start() {
    let v = y.value;
    reset( t );
    if (v >= 1 && v <= 60) {
        beep();
        changeTime(v, 0);
        m = v - 1;
        s = 60;
        t = setInterval( function() {
            timer();
        }, 1000 );
    }
}

function beep() {
    b.play();
}

function changeTime(m, s) {
    let ms = (m < 10) ? "0" + m : m,
        ss = (s < 10) ? "0" + s : s;
    x.innerHTML = ms + ":" + ss;
}

function reset( t ) {
    clearInterval( t );
    x.innerHTML = "00:00";
}

function timer() {
    if (s <= 3)
        beep();
    if (s <= 0 && m <= 0)
        reset( t );
    else {
        s--;
        if ( s === 0 && m !== 0 ) {
            s = 60;
            m--;
        }
        changeTime(m, s);
    }	
}