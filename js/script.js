let m = 1,
    s = 0,
    t,
    p = document.querySelector(".play"),
    x = document.querySelector(".timer"),
    y = document.querySelector("#tempo"),
    b = document.querySelector(".beep"),
    f = document.querySelector(".beep-final"),
    h = document.querySelector("header"),
    g = document.querySelector("form"),
    r = document.querySelector(".fullscreen-exit");

function start() {
    let v = y.value;
    resetTimer( t );
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

function beep(w) {
    if (w)
        f.play();
    else 
        b.play();
}

function changeTime(m, s) {
    let ms = (m < 10) ? (s === 60) ? "01" : "0" + m : m,
        ss = (s < 10) ? "0" + s : (s === 60) ? "00" : s;
    x.innerHTML = ms + ":" + ss;
}

function resetTimer( t ) {
    clearInterval( t );
    x.innerHTML = "00:00";
}

function timer() {
    if (s <= 0 && m <= 0) {
        resetTimer( t );
    }
    else {
        s--;
        if ( s <= 3 && s > 0 && m == 0 )
            beep();
        if ( s <= 0 && m == 0 )
            beep( true );
        if ( s === 0 && m !== 0 ) {
            s = 60;
            m--;
        }
        changeTime(m, s);
    }	
}

function pause() {

}

function full( show ) {
    if ( show ) {
        h.style.display = "block";
        g.style.display = "block";
        r.style.display = "none";

    } else {
        h.style.display = "none";
        g.style.display = "none";
        r.style.display = "block";
    }
}