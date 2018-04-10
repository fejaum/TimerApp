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
    botaoFull               = document.querySelector(".full"),
    botaoTipo               = document.querySelector("input[name='tipo']"),
    spanTimer               = document.querySelector(".timer"),
    somBeep                 = document.querySelector(".beep"),
    somBeepFinal            = document.querySelector(".beep-final"),
    exit                    = document.querySelector(".fullscreen-exit"),
    spanTipo                = document.querySelector("span.tipo"),
    spanRodada              = document.querySelector("span.rodada_numero"),
    header                  = document.querySelector("header"),
    form                    = document.querySelector(".botoes"),
    main                    = document.querySelector("main"),
    pause                   = false,
    isFull                  = false,
    cronometro              = 0,
    cronometros             = [],
    tipoCronometro          = "cronometro",
    tempo,
    tipoProgressivo,
    qtdRodadas;

function start() {
    resetTimer( tempo );
    disable( botaoPlay );
    disable( botaoTipo );
    disable( inputAquecimentoSerie );
    disable( inputAquecimento );
    disable( inputCooldown );
    disable( inputCooldownSerie );
    disable( inputExercicioSerie );
    disable( inputDescansoSerie );
    disable( inputRodadasCro );
    disable( inputTempoCro );
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
        case "aquecimento":
            spanRodada.innerHTML = "";
            spanTipo.innerHTML = "Aquecimento";
            main.className = "";
            main.classList.add("grey");
            main.classList.add("lighten-5");
            if ( full ) 
                main.classList.add("full");
        break;

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
            spanTipo.innerHTML = "3, 2, 1!";
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
    minShow = (minShow < 10) ? "0" + minShow : minShow;
    segShow = (changeSeg < 10) ? "0" + changeSeg : (changeSeg === 60) ? "00" : changeSeg;
    spanTimer.innerHTML = minShow + ":" + segShow;
}

function resetTimer( resetTempo ) {
    enable( botaoPlay );
    enable( botaoTipo );
    enable( inputAquecimentoSerie );
    enable( inputAquecimento );
    enable( inputCooldown );
    enable( inputCooldownSerie );
    enable( inputExercicioSerie );
    enable( inputDescansoSerie );
    enable( inputRodadasCro );
    enable( inputTempoCro );
    enable( botaoStop );
    enable( botaoPause );
    clearInterval( tempo );
    pause = false;
    spanTimer.innerHTML = "00:00";
    if (cronometro >= cronometros.length)
        cronometro = 0;
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
                if ( seg <= 3 && seg > 0 && min == 0 )
                    beep();
                if ( seg <= 0 && min == 0 )
                    beep( true );
                changeTime(min, seg);
            }
        }
    }
}

function pausar() {
    pause = !pause;
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

    qtdRodadas = inputRodadasCro.value;

    if ( tipoCronometro == "cronometro" ) {

        for ( let i = 1; i <= parseInt( qtdRodadas ); i++ ) {
            valorInput = parseInt( inputTempoCro.value );
            minutosInput = Math.floor( valorInput / 60 );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "cronometro", i);
            cronometros.push( CronometroInput );
        }

    } else {

        if ( inputAquecimento.checked ) {
            
            valorInput = parseInt( inputAquecimentoSerie.value );
            minutosInput = Math.floor( valorInput / 60 );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "aquecimento");

            cronometros.push( CronometroInput );

        }

        for ( let i = 1; i <= parseInt( qtdRodadas ); i++ ) {

            valorInput = parseInt( inputExercicioSerie.value );
            minutosInput = Math.floor( valorInput / 60 );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "exercicio", i);

            cronometros.push( CronometroInput );
            
            valorInput = parseInt( inputDescansoSerie.value );
            minutosInput = Math.floor( valorInput / 60 );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "descanso", i);

            cronometros.push( CronometroInput );
        }

        if ( inputCooldown.checked ) {

            valorInput = parseInt( inputCooldownSerie.value );
            minutosInput = Math.floor( valorInput / 60 );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "cooldown");

            cronometros.push( CronometroInput );
            
        }
    }
    
    start();
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