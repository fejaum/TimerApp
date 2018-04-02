let m = 0,
    s = 3,
    t,
    p = document.querySelector(".play"),
    x = document.querySelector(".timer"),
    y = document.querySelector("#tempo"),
    b = document.querySelector(".beep"),
    f = document.querySelector(".beep-final"),
    h = document.querySelector("header"),
    g = document.querySelector("form"),
    r = document.querySelector(".fullscreen-exit"),
    a = document.querySelector(".play"),
    d = document.querySelector(".stop"),
    j = document.querySelector(".pause"),
    o = document.querySelector("main"),
    k = false;

function start() {
    let v = y.value;
    resetTimer( t );
    a.disabled = true;
    d.disabled = false;
    j.disabled = false;
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
    let ms,
        ss;
    ms = (s === 60) ? (m + 1) : m;
    ms = (ms < 10) ? "0" + ms : ms;
    ss = (s < 10) ? "0" + s : (s === 60) ? "00" : s;
    x.innerHTML = ms + ":" + ss;
}

function resetTimer( t ) {
    a.disabled = false;
    d.disabled = true;
    j.disabled = true;
    clearInterval( t );
    x.innerHTML = "00:00";
}

function timer() {
    if ( !k ) {
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
}

function pause() {
    if ( k ) {
        k = false;
        a.disabled = true;
        d.disabled = false;
        j.disabled = false;
    } else {
        a.disabled = true;
        d.disabled = true;
        j.disabled = false;
        k = true;
    }
}

function full( show ) {
    if ( show ) {
        h.style.display = "block";
        g.style.display = "block";
        r.style.display = "none";
        o.classList.remove('full');

    } else {
        h.style.display = "none";
        g.style.display = "none";
        r.style.display = "block";
        o.classList.add('full');
    }
}