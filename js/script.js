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
    n = document.querySelector("input[name='tipo']"),
    k = false,
    v = y.value;

function start() {
    v = y.value;
    resetTimer( t );
    disable(a);
    disable(n);
    enable(d);
    enable(j);
    if ( v >= 1 && v <= 60 ) {
        beep();
        if ( n.checked )  {
            changeTime( 0, 0 );
            m = 0;
            s = 0;
        } else {
            changeTime( v, 0 );
            m = v - 1;
            s = 60;
        }
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
    enable(a);
    enable(n);
    disable(d);
    disable(j);
    clearInterval( t );
    k = false;
    x.innerHTML = "00:00";
}

function timer() {
    if ( !k ) {
        if ( n.checked ) {
            if (s == 0 && m == v) {
                beep( true );
                resetTimer( t );
            }
            else {
                s++;
                if ( s >= 57 && s <= 59 && m == (v - 1) )
                    beep();
                if ( s === 60 && m !== v ) {
                    s = 0;
                    m++;
                }
                if (s == 0 && m == v)
                    beep( true );
                changeTime(m, s);
            }
        } else {
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
}

function pause() {
    if ( k ) {
        k = false;
        disable(a);
        enable(d);
        enable(j);
    } else {
        enable(a);
        disable(d);
        disable(j);
        k = true;
    }
}

function full( show ) {
    if ( show ) {
        show(h);
        show(g);
        hide(r);
        o.classList.remove('full');

    } else {
        hide(h);
        hide(g);
        show(r);
        o.classList.add('full');
    }
}

function show( elem ) {
    elem.style.display = "block";
}

function hide( elem ) {
    elem.style.display = "none";
}

function disable ( elem ) {
    elem.disabled = true;
}

function enable ( elem ) {
    elem.disabled = false;
}