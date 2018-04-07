let Cronometro = function ( tempoMin, tempoSeg, tempoAtual, progressivo, tipo ) {
    this.tempoMin       = tempoMin;
    this.tempoSeg       = tempoSeg;
    this.tempoAtual     = tempoAtual;
    this.progressivo    = progressivo;
    this.tipo           = tipo
}

let min                     = 0,
    seg                     = 0,
    segs                    = 0,
    inputTempoCro           = document.querySelector("#tempo_cronometro"),
    inputRodadasCro         = document.querySelector("#rodadas_cronometro"),
    inputAquecimentoSerie   = document.querySelector("#aquecimento_tempo"),
    inputExercicioSerie     = document.querySelector("#exercicio_tempo"),
    inputDescansoSerie      = document.querySelector("#descanso_tempo"),
    inputCooldownSerie      = document.querySelector("#cooldown_tempo"),
    inputCooldown           = document.querySelector("input[name='cooldown']"),
    inputAquecimento        = document.querySelector("input[name='aquecimento']"),
    botaoPlay               = document.querySelector(".play"),
    botaoStop               = document.querySelector(".stop"),
    botaoPause              = document.querySelector(".pause"),
    botaoTipo               = document.querySelector("input[name='tipo']"),
    spanTimer               = document.querySelector(".timer"),
    somBeep                 = document.querySelector(".beep"),
    somBeepFinal            = document.querySelector(".beep-final"),
    exit                    = document.querySelector(".fullscreen-exit"),
    spanTipo                = document.querySelector("span.tipo"),
    header                  = document.querySelector("header"),
    form                    = document.querySelector("form"),
    main                    = document.querySelector("main"),
    pause                   = false,
    cronometro              = 0,
    cronometros             = [],
    tipoCronometro          = "cronometro",
    tempo,
    tipoProgressivo;

function start() {
    resetTimer( tempo );
    disable( botaoPlay );
    disable( botaoTipo );
    enable( botaoPause );
    enable( botaoStop );
    if (cronometro === 0) {   
        min = cronometros[0].tempoMin;
        seg = cronometros[0].tempoSeg;
        segs = cronometros[0].tempoAtual;
        mudarTipo();
        tempo = setInterval( function() {
            timer();
        }, 1000 );
    } else {
        if ( cronometros[cronometro].progressivo )  {
            changeTime( 0, 0 );
            min = 0;
            seg = 0;
            segs = 0;
        } else {
            changeTime( cronometros[cronometro].tempoMin, cronometros[cronometro].tempoSeg );
            min = cronometros[cronometro].tempoMin;
            seg = cronometros[cronometro].tempoSeg;
            segs = cronometros[cronometro].tempoAtual;
        }
        mudarTipo(cronometros[cronometro].tipo);
        tempo = setInterval( function() {
            timer();
        }, 1000 );
    }
}

function mudarTipo( tipo ) {
    switch (tipo) {
        case "aquecimento":
            spanTipo.innerHTML = "Aquecimento";
            main.className = "";
            main.classList.add("yellow");
            main.classList.add("lighten-5");
        break;

        case "exercicio":
            spanTipo.innerHTML = "Exercício";
            main.className = "";
            main.classList.add("green");
            main.classList.add("lighten-5");
        break;

        case "descanso":
            spanTipo.innerHTML = "Descanso";
            main.className = "";
            main.classList.add("red");
            main.classList.add("lighten-5");
        break;

        case "cooldown":
            spanTipo.innerHTML = "Cooldown";
            main.className = "";
            main.classList.add("blue");
            main.classList.add("lighten-5");
        break;

        default :
            spanTipo.innerHTML = "3, 2, 1!";
            main.className = "";
        break;
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
            if (segs == cronometros[cronometro].tempoAtual) {
                beep( true );
                proximo();
            } else {
                seg++;
                segs++;
                if ( seg >= (cronometros[cronometro].tempoSeg - 3) && seg < cronometros[cronometro].tempoSeg && min >= (cronometros[cronometro].tempoMin - 1) )
                    beep();
                if ( seg === 60 && min !== cronometros[cronometro].tempoMin ) {
                    seg = 0;
                    min++;
                }
                changeTime(min, seg);
            }
        } else {
            if (seg <= 0 && min <= 0) {
                proximo();
            }
            else {
                seg--;
                segs--;
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
    cronometros.push( CountInicial );

    let valorInput,
        minutosInput,
        segundosInput,
        CronometroInput;

    if ( tipoCronometro == "cronometro" ) {

        for ( let i = 0; i < parseInt( inputRodadasCro.value ); i++ ) {
            valorInput = inputTempoCro.value;
            minutosInput = Math.floor( valorInput / 60 );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked);
            cronometros.push( CronometroInput );
        }

    } else {

        if ( inputAquecimento.checked ) {
            
            valorInput = inputAquecimentoSerie.value;
            minutosInput = Math.floor( valorInput / 60 );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "aquecimento");

            cronometros.push( CronometroInput );

        }

        for ( let i = 0; i < parseInt( inputRodadasCro.value ); i++ ) {

            valorInput = inputExercicioSerie.value;
            minutosInput = Math.floor( valorInput / 60 );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "exercicio");

            cronometros.push( CronometroInput );
            
            valorInput = inputDescansoSerie.value;
            minutosInput = Math.floor( valorInput / 60 );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "descanso");

            cronometros.push( CronometroInput );
        }

        if ( inputCooldown.checked ) {

            valorInput = inputCooldownSerie.value;
            minutosInput = Math.floor( valorInput / 60 );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "cooldown");

            cronometros.push( CronometroInput );
            
        }
    }
    
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

let elem = document.querySelector('.sidenav');
let instance = M.Sidenav.init( elem );

let el = document.querySelector('.tabs');
let instances = M.Tabs.init( el );

let tabSerie = document.querySelector( "a[href='#serie']" );

tabSerie.onclick = function() {
    tipoCronometro = "serie";
};

let tabCronometro = document.querySelector( "a[href='#cronometro']" );

tabCronometro.onclick = function() {
    tipoCronometro = "cronometro";
};