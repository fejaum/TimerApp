let Cronometro = function ( tempoMin, tempoSeg, tempoAtual, progressivo, tipo, rodada ) {
    this.tempoMin       = tempoMin;
    this.tempoSeg       = tempoSeg;
    this.tempoAtual     = tempoAtual;
    this.progressivo    = progressivo;
    this.tipo           = tipo;
    this.rodada         = rodada
}

let min                     = 0,
    seg                     = 0,
    segs                    = 0,
    inputMinutosCro         = document.querySelector("#minutos_cronometro"),
    inputSegundosCro        = document.querySelector("#segundos_cronometro"),
    inputRodadasCro         = document.querySelector("#rodadas_cronometro"),
    inputExerMinutosSerie   = document.querySelector("#exercicio_minutos"),
    inputExerSegundosSerie  = document.querySelector("#exercicio_segundos"),
    inputDescMinutosSerie   = document.querySelector("#descanso_minutos"),
    inputDescSegundosSerie  = document.querySelector("#descanso_segundos"),
    //inputCooldownSerie      = document.querySelector("#cooldown_tempo"),
    //inputCooldown           = document.querySelector("input[name='cooldown']"),
    botaoPlay               = document.querySelector(".play"),
    botaoStop               = document.querySelector(".stop"),
    botaoPause              = document.querySelector(".pause"),
    botaoFull               = document.querySelector(".full"),
    botaoClock              = document.querySelector(".clock"),
    botaoTipo               = document.querySelector("input[name='tipo']"),
    spanTimer               = document.querySelector(".timer"),
    somBeep                 = document.querySelector(".beep"),
    somBeepFinal            = document.querySelector(".beep-final"),
    exit                    = document.querySelector(".fullscreen-exit"),
    clockExit               = document.querySelector(".clock-exit"),
    spanTipo                = document.querySelector("span.tipo"),
    spanRodada              = document.querySelector("span.rodada_numero"),
    header                  = document.querySelector("header"),
    form                    = document.querySelector(".botoes"),
    main                    = document.querySelector("main"),
    pause                   = false,
    isFull                  = false,
    isClock                 = false,
    cronometro              = 0,
    cronometros             = [],
    tipoCronometro          = "cronometro",
    tempo,
    clockTime,
    tipoProgressivo,
    qtdRodadas;

function start() {
    resetTimer();
    disable( botaoPlay );
    disable( botaoTipo );
    //disable( inputCooldown );
    //disable( inputCooldownSerie );
    disable( inputExerMinutosSerie );
    disable( inputExerSegundosSerie );
    disable( inputDescMinutosSerie );
    disable( inputDescSegundosSerie );
    disable( inputRodadasCro );
    disable( inputSegundosCro );
    disable( inputMinutosCro );
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
        mudarTipo(cronometros[cronometro].tipo, cronometros[cronometro].rodada );
        tempo = setInterval( function() {
            timer();
        }, 1000 );
    }
}

function mudarTipo( tipo, rodada ) {
    switch (tipo) {

        case "exercicio":
            spanRodada.innerHTML =  rodada + " / " + qtdRodadas;
            spanTipo.innerHTML = "Exercício";
            main.className = "";
            main.classList.add("gruppe-amarelo");
            if ( full ) 
                main.classList.add("full");
        break;

        case "descanso":
            spanRodada.innerHTML =  rodada + " / " + qtdRodadas;
            spanTipo.innerHTML = "Descanso";
            main.className = "";
            if ( full ) 
                main.classList.add("full");
        break;

        case "cooldown":
            spanRodada.innerHTML = "";
            spanTipo.innerHTML = "Cooldown";
            main.className = "";
            main.classList.add("gray");
            main.classList.add("lighten-2");
            if ( full ) 
                main.classList.add("full");
        break;

        case "cronometro":
            spanRodada.innerHTML =  rodada + " / " + qtdRodadas;
            spanTipo.innerHTML = "Cronômetro";
            main.className = "";
            main.classList.add("gruppe");
            if ( full ) 
                main.classList.add("full");
        break;

        default :
            spanRodada.innerHTML = "";
            spanTipo.innerHTML = "Começando!!";
            main.className = "";
            if ( full ) 
                main.classList.add("full");
        break;
    }
}

function beep( final ) {
    if ( final ) {
        var teste = somBeepFinal.play();
        if (teste !== undefined) {
            teste.then(function() {
                console.log( "FOI!" );
            }).catch(function(error) {
                console.log( "NÃO FOI!" );
            });
        }
        console.log("beeeeeeeeeeeeep");
    }
    else {
        somBeep.play();
        console.log("beep");
    }
}

function changeTime(changeMin, changeSeg) {
    let minShow,
        segShow;
    minShow = (changeSeg === 60) ? (changeMin + 1) : changeMin;
    minShow = showZero( minShow );
    segShow = (changeSeg < 10) ? "0" + changeSeg : (changeSeg === 60) ? "00" : changeSeg;
    spanTimer.innerHTML = minShow + ":" + segShow;
}

function resetTimer() {
    enable( botaoPlay );
    enable( botaoTipo );
    //enable( inputCooldown );
    //enable( inputCooldownSerie );
    enable( inputExerMinutosSerie );
    enable( inputExerSegundosSerie );
    enable( inputDescMinutosSerie );
    enable( inputDescSegundosSerie );
    enable( inputRodadasCro );
    enable( inputSegundosCro );
    enable( inputMinutosCro );
    disable( botaoStop );
    disable( botaoPause );
    clearInterval( tempo );
    pause = false;
    spanTimer.innerHTML = "00:00";
    if (cronometro >= cronometros.length)
        cronometro = 0;
}

function clock() {
    const time = new Date();
    spanTimer.innerHTML = showZero( time.getHours() ) + ":" + showZero( time.getMinutes() ) + ":" + showZero( time.getSeconds() );
}

function showZero(s) {
    return (s < 10) ? '0' + s : s;
}
    
function callClock() {
    if ( !isClock ) {
        resetTimer();
        isClock = true;
        full( false );
        hide( exit );
        show( clockExit );
        spanTipo.innerHTML = "";
        clockTime = setInterval(clock, 0);
    } else {
        isClock = false;
        hide( clockExit );
        clearInterval( clockTime );
        full( true );
        resetTimer();
    }
}

function timer() {
    if ( !pause ) {
        if ( cronometros[cronometro].progressivo ) {
            seg++;
            segs++;
            if ( seg >= (cronometros[cronometro].tempoSeg - 3) && seg < cronometros[cronometro].tempoSeg && min >= (cronometros[cronometro].tempoMin - 1) )
                beep();
            if ( seg === 60 && min !== cronometros[cronometro].tempoMin ) {
                seg = 0;
                min++;
            }
            if (segs == cronometros[cronometro].tempoAtual) {
                beep( true );
                proximo();
            }
            changeTime(min, seg);
        } else {
            if (seg <= 0 && min <= 0) {
                proximo();
            }
            else {                
                if ( seg === 0 && min !== 0 ) {
                    seg = 60;
                    min--;
                }
                seg--;
                segs--;
                if ( cronometro === 0 && seg <= 3 && seg > 0 && min == 0 )
                    beep();
                else if ( (cronometro + 1) == cronometros.length && seg <= 0 && min == 0 )
                    beep( true );
                else if ( seg <= 0 && min == 0 )
                    beep();
                changeTime(min, seg);
            }
        }
    }
}

function pausar() {
    pause = !pause;
}

function proximo() {
    resetTimer();
    cronometro++;
    if (cronometro < cronometros.length)
        start();
}

function init() {

    cronometros = [];
    cronometro = 0;

    let CountInicial = new Cronometro(0, 11, 1, false);
    cronometros.push( CountInicial );

    let valorInput,
        minutosInput,
        segundosInput,
        CronometroInput;

    qtdRodadas = inputRodadasCro.value;

    if ( tipoCronometro == "cronometro" ) {

        for ( let i = 1; i <= parseInt( qtdRodadas ); i++ ) {
            valorInput = parseInt( inputSegundosCro.value ) + ( parseInt( inputMinutosCro.value ) * 60 );
            minutosInput = parseInt( inputMinutosCro.value );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "cronometro", i);
            cronometros.push( CronometroInput );
        }

    } else {

        for ( let i = 1; i <= parseInt( qtdRodadas ); i++ ) {

            valorInput = parseInt( inputExerSegundosSerie.value ) + ( parseInt( inputExerMinutosSerie.value ) * 60 );
            minutosInput = Math.floor( valorInput / 60 );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "exercicio", i);

            cronometros.push( CronometroInput );
            
            valorInput = parseInt( inputDescSegundosSerie.value ) + ( parseInt( inputDescMinutosSerie.value ) * 60 );
            minutosInput = Math.floor( valorInput / 60 );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "descanso", i);

            cronometros.push( CronometroInput );
        }

        // if ( inputCooldown.checked ) {

        //     valorInput = parseInt( inputCooldownSerie.value );
        //     minutosInput = Math.floor( valorInput / 60 );
        //     segundosInput =  valorInput - (minutosInput * 60);
        //     CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "cooldown");

        //     cronometros.push( CronometroInput );
            
        // }
    }
    
    start();
}

function maxLengthCheck(object) {
    if (object.value.length > object.max.length)
        object.value = object.value.slice(0, object.max.length)
    }
    
  function isNumeric (evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode (key);
    var regex = /[0-9]|\./;
    if ( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function full( x ) {
    isFull = x;
    if ( isFull ) {
        show( header );
        show( form );
        hide( exit );
        enable ( botaoFull );
        main.classList.remove('full');

    } else {
        hide( header );
        hide( form );
        show( exit );
        disable ( botaoFull );
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