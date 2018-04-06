let Cronometro = function ( tempoMin, tempoSeg, tempoAtual, progressivo ) {
    this.tempoMin       = tempoMin;
    this.tempoSeg       = tempoSeg;
    this.tempoAtual     = tempoAtual;
    this.progressivo    = progressivo;
}

let min             = 0,
    seg             = 3,
    inputTempo      = document.querySelector("#tempo"),
    botaoPlay       = document.querySelector(".play"),
    botaoStop       = document.querySelector(".stop"),
    botaoPause      = document.querySelector(".pause"),
    botaoTipo       = document.querySelector("input[name='tipo']"),
    spanTimer       = document.querySelector(".timer"),
    somBeep         = document.querySelector(".beep"),
    somBeepFinal    = document.querySelector(".beep-final"),
    exit            = document.querySelector(".fullscreen-exit"),
    header          = document.querySelector("header"),
    form            = document.querySelector("form"),
    main            = document.querySelector("main"),
    pause           = false,
    tempo,
    tipoProgressivo,
    cronometro = 0,
    cronometros = [];

function start() {
    resetTimer( tempo );
    disable( botaoPlay );
    disable( botaoTipo );
    enable( botaoPause );
    enable( botaoStop );
    if ( cronometros[cronometro].tempoAtual >= 1 && cronometros[cronometro].tempoAtual <= 60 ) {
        if (cronometro === 0) {   
            min = cronometros[0].tempoMin;
            seg = cronometros[0].tempoSeg;  
            tempo = setInterval( function() {
                timer();
            }, 1000 );
        } else {
            if ( cronometros[cronometro].progressivo )  {
                changeTime( 0, 0 );
                min = 0;
                seg = 0;
            } else {
                changeTime( cronometros[cronometro].tempoAtual, 0 );
                min = cronometros[cronometro].tempoAtual - 1;
                seg = 60;
            }
            tempo = setInterval( function() {
                timer();
            }, 1000 );
        }
        
    }
}

function beep( final ) {
    if ( final )
        somBeepFinal.play();
    else 
        somBeep.play();
}

function changeTime(changeMin, changeSeg) {
    let minShow,
        segShow;
    minShow = (changeSeg === 60) ? (changeMin + 1) : changeMin;
    minShow = (minShow < 10) ? "0" + minShow : minShow;
    segShow = (changeSeg < 10) ? "0" + changeSeg : (changeSeg === 60) ? "00" : changeSeg;
    spanTimer.innerHTML = minShow + ":" + segShow;
}

function resetTimer( resetTempo ) {
    enable( botaoPlay );
    enable( botaoTipo );
    disable( botaoStop );
    disable( botaoPause );
    clearInterval( tempo );
    pause = false;
    spanTimer.innerHTML = "00:00";
    if (cronometro >= cronometros.length)
        cronometro = 0;
}

function timer() {
    if ( !pause ) {
        if ( cronometros[cronometro].progressivo ) {
            if (seg == 0 && min == cronometros[cronometro].tempoAtual) {
                beep( true );
                proximo();
            }
            else {
                seg++;
                if ( seg >= 57 && seg <= 59 && min == (cronometros[cronometro].tempoAtual - 1) )
                    beep();
                if ( seg === 60 && min !== cronometros[cronometro].tempoAtual ) {
                    seg = 0;
                    min++;
                }
                if (seg == 0 && min == cronometros[cronometro].tempoAtual)
                    beep( true );
                changeTime(min, seg);
            }
        } else {
            if (seg <= 0 && min <= 0) {
                proximo();
            }
            else {
                seg--;
                if ( seg <= 3 && seg > 0 && min == 0 )
                    beep();
                if ( seg <= 0 && min == 0 )
                    beep( true );
                if ( seg === 0 && min !== 0 ) {
                    seg = 60;
                    min--;
                }
                changeTime(min, seg);
            }
        }
    }
}

function pausar() {
    if ( pause )
        pause = false;
    else
        pause = true;
}

function proximo() {
    resetTimer( tempo );
    cronometro++;
    if (cronometro < cronometros.length)
        start();
}

function init() {
    cronometros = [];
    cronometro = 0;
    let CountInicial = new Cronometro(0, 4, 1, false);
    cronometros.push(CountInicial);
    let CronometroInput = new Cronometro(inputTempo.value, 0, inputTempo.value, botaoTipo.checked);
    cronometros.push(CronometroInput);
    start();
}

function full( full ) {
    if ( full ) {
        show( header );
        show( form );
        hide( exit );
        main.classList.remove('full');

    } else {
        hide( header );
        hide( form );
        show( exit );
        main.classList.add('full');
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