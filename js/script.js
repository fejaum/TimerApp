let Cronometro = function ( tempoMin, tempoSeg, tempoAtual, progressivo, tipo, rodada, rodadas ) {
    this.tempoMin              = tempoMin;
    this.tempoSeg              = tempoSeg;
    this.tempoAtual            = tempoAtual;
    this.progressivo           = progressivo;
    this.tipo                  = tipo;
    this.rodada                = rodada;
    this.rodadas               = rodadas;
}

let Serie = function (active, number, isDeletable, rodada, tempoMinutoCronometro, tempoSegundoCronometro, tempoMinutoDescanso, tempoSegundoDescanso) {
    this.active                 = active;
    this.number                 = number;
    this.isDeletable            = isDeletable;
    this.rodada                 = ( rodada ) ? rodada : 1;
    this.tempoMinutoCronometro  = ( tempoMinutoCronometro ) ? tempoMinutoCronometro : 2;
    this.tempoSegundoCronometro = ( tempoSegundoCronometro ) ? tempoSegundoCronometro : 0;
    this.tempoMinutoDescanso    = ( tempoMinutoDescanso ) ? tempoMinutoDescanso : 2;
    this.tempoSegundoDescanso   = ( tempoSegundoDescanso ) ? tempoSegundoDescanso : 0;
}

function deleteSerie(elem) {
    const numberSerie = parseInt(elem.closest("li").id);
    series = series.filter(function( value ){
        return value.number !== numberSerie;
    });
    montaSerie();
}

function changeValue(number, type, value) {
    series.forEach(serie => {
        if ( serie.number == number ) {
            switch ( type ) {
                case 'em' :
                    serie.tempoMinutoCronometro = parseInt( value );
                break;
                case 'es' :
                    serie.tempoSegundoCronometro = parseInt( value );
                break;
                case 'dm' :
                    serie.tempoMinutoDescanso = parseInt( value );
                break;
                case 'ds' :
                    serie.tempoSegundoDescanso = parseInt( value );
                break;
                case 'rd' :
                    serie.rodada = parseInt( value );
                break;
            }
        }
    });
}

function montaSerie() {
    
    const templateSerie =
    `
        <ul class="collapsible">
            ${series.map((s) => 
            `<li class="${s.active}" id="${s.number}">
                <div class="collapsible-header">Circuito ${s.number} ${(() =>  (s.isDeletable) ?  `<a class="btn-flat right" onclick="deleteSerie(this)"><i class="material-icons">delete_forever</i></a>` : ``)()}
                </div>
                <div class="collapsible-body">                                    
                    <div class="card-panel gruppe-amarelo z-depth-0">
                        <div class="row">
                            <div class="col s12">
                                <label>Tempo de Exercício</label>
                            </div>
                            <div class="col s6">
                                <div class="input-field">
                                    <input id="exercicio_minutos_${s.number}" type="number" value="${s.tempoMinutoCronometro}" min="0" max="60" onkeypress="return isNumeric(event);" onchange="changeValue(${s.number}, 'em', this.value);" oninput="maxLengthCheck(this)" autofocus />    
                                    <span class="helper-text" data-error="wrong" data-success="right">Minutos</span> 
                                </div>
                            </div>
                            <div class="col s6">
                                <div class="input-field">
                                    <input id="exercicio_segundos_${s.number}" type="number" value="${s.tempoSegundoCronometro}" min="0" max="59" onkeypress="return isNumeric(event);" onchange="changeValue(${s.number}, 'es', this.value);" oninput="maxLengthCheck(this)"  />     
                                    <span class="helper-text" data-error="wrong" data-success="right">Segundos</span> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-panel z-depth-0">
                        <div class="row">
                            <div class="col s12">
                                <label>Tempo de Descanso</label>
                            </div>
                            <div class="col s6">
                                <div class="input-field">
                                    <input id="descanso_minutos_${s.number}" type="number" value="${s.tempoMinutoDescanso}" min="0" max="60" onkeypress="return isNumeric(event);" onchange="changeValue(${s.number}, 'dm', this.value);" oninput="maxLengthCheck(this)" autofocus />    
                                    <span class="helper-text" data-error="wrong" data-success="right">Minutos</span> 
                                </div>
                            </div>
                            <div class="col s6">
                                <div class="input-field">
                                    <input id="descanso_segundos_${s.number}" type="number" value="${s.tempoSegundoDescanso}" min="0" max="59" onkeypress="return isNumeric(event);" onchange="changeValue(${s.number}, 'ds', this.value);" oninput="maxLengthCheck(this)"  />     
                                    <span class="helper-text" data-error="wrong" data-success="right">Segundos</span> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-panel z-depth-0">
                        <div class="row">
                            <div class="col s12">
                                <div class="input-field">
                                    <input id="rodadas_${s.number}" type="number" value="${s.rodada}" min="1" max="60" onkeypress="return isNumeric(event);" onchange="changeValue(${s.number}, 'rd', this.value);" oninput="maxLengthCheck(this)" />
                                    <label for="rodadas_${s.number}">Rodadas</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>`
            ).join('')}
        </ul>
    `;

    document.getElementById("collapsible").innerHTML = templateSerie;    

    let elems = document.querySelectorAll('.collapsible');
    let collapsible = M.Collapsible.init( elems , { 'accordion' : true } );
}

let min                     = 0,
    seg                     = 0,
    segs                    = 0,
    inputMinutosCro         = document.querySelector("#minutos_cronometro"),
    inputSegundosCro        = document.querySelector("#segundos_cronometro"),
    inputRodadasCro         = document.querySelector("#rodadas_cronometro"),
    //inputExerMinutosSerie   = document.querySelector("#exercicio_minutos"),
    //inputExerSegundosSerie  = document.querySelector("#exercicio_segundos"),
    //inputDescMinutosSerie   = document.querySelector("#descanso_minutos"),
    //inputDescSegundosSerie  = document.querySelector("#descanso_segundos"),
    //inputCooldownSerie      = document.querySelector("#cooldown_tempo"),
    //inputCooldown           = document.querySelector("input[name='cooldown']"),
    botaoPlay               = document.querySelector(".play"),
    botaoStop               = document.querySelector(".stop"),
    botaoPause              = document.querySelector(".pause"),
    botaoFull               = document.querySelector(".full"),
    botaoClock              = document.querySelector(".clock"),
    botaoTipo               = document.querySelector("input[name='tipo']"),
    spanTimer               = document.querySelector(".timer"),
    beepSM                  = document.querySelector(".beep-sm"),
    beepMD                  = document.querySelector(".beep-md"),
    beepLG                  = document.querySelector(".beep-lg"),
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
    series                  = [],
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
    //disable( inputExerMinutosSerie );
    //disable( inputExerSegundosSerie );
    //disable( inputDescMinutosSerie );
    //disable( inputDescSegundosSerie );
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

function beep( size ) {
    switch (size) {
        case 'sm' :
            beepSM.play();
        break;
        case 'md' :
            beepMD.play();
        break;
        case 'lg' :
            beepLG.play();
        break;
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
    //enable( inputExerMinutosSerie );
    //enable( inputExerSegundosSerie );
    //enable( inputDescMinutosSerie );
    //enable( inputDescSegundosSerie );
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
            if ( cronometro === 0 && seg >= (cronometros[cronometro].tempoSeg - 2) && seg < cronometros[cronometro].tempoSeg && min >= (cronometros[cronometro].tempoMin - 1) )
                beep( 'sm' );
            else if ( seg === 60 && min !== cronometros[cronometro].tempoMin ) {
                seg = 0;
                min++;
            } else if ( (cronometro + 1) == cronometros.length && segs == cronometros[cronometro].tempoAtual ) {
                beep( 'lg' );
                proximo();
            } else if ( segs == cronometros[cronometro].tempoAtual ) {
                beep( 'md' );
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
                if ( cronometro === 0 && seg <= 2 && seg > 0 && min == 0 )
                    beep( 'sm' );
                else if ( (cronometro + 1) == cronometros.length && seg <= 0 && min == 0 )
                    beep( 'lg' );
                else if ( seg <= 0 && min == 0 )
                    beep( 'md' );
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
    if (cronometro < cronometros.length) {
        qtdRodadas = cronometros[cronometro].rodadas;
        start();
    }
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

            inputSegundosCro.value = ( inputSegundosCro.value ) ? inputSegundosCro.value : 0;
            inputMinutosCro.value = ( inputMinutosCro.value ) ? inputMinutosCro.value : 0;

            valorInput = parseInt( inputSegundosCro.value ) + ( parseInt( inputMinutosCro.value ) * 60 );
            minutosInput = parseInt( inputMinutosCro.value );
            segundosInput =  valorInput - (minutosInput * 60);
            CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "cronometro", i, qtdRodadas);
            cronometros.push( CronometroInput );
        }

    } else {

        series.forEach(serie => {

            qtdRodadas = parseInt( document.querySelector("#rodadas_" + serie.number).value );
            
            for ( let i = 1; i <= qtdRodadas ; i++ ) {

                let inputExerMinutosSerie = document.querySelector("#exercicio_minutos_" + serie.number);
                let inputExerSegundosSerie = document.querySelector("#exercicio_segundos_" + serie.number);

                inputExerMinutosSerie.value = ( inputExerMinutosSerie.value ) ? inputExerMinutosSerie.value : 0;
                inputExerSegundosSerie.value = ( inputExerSegundosSerie.value ) ? inputExerSegundosSerie.value : 0;

                valorInput = parseInt( inputExerSegundosSerie.value ) + ( parseInt( inputExerMinutosSerie.value ) * 60 );
                minutosInput = Math.floor( valorInput / 60 );
                segundosInput =  valorInput - (minutosInput * 60);
                CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "exercicio", i, qtdRodadas);

                cronometros.push( CronometroInput );

                let inputDescMinutosSerie = document.querySelector("#descanso_minutos_" + serie.number);
                let inputDescSegundosSerie = document.querySelector("#descanso_segundos_" + serie.number);

                inputDescMinutosSerie.value = ( inputDescMinutosSerie.value ) ? inputDescMinutosSerie.value : 0;
                inputDescSegundosSerie.value = ( inputDescSegundosSerie.value ) ? inputDescSegundosSerie.value : 0;
                
                valorInput = parseInt( inputDescSegundosSerie.value ) + ( parseInt( inputDescMinutosSerie.value ) * 60 );
                minutosInput = Math.floor( valorInput / 60 );
                segundosInput =  valorInput - (minutosInput * 60);
                CronometroInput = new Cronometro(minutosInput, segundosInput, valorInput, botaoTipo.checked, "descanso", i, qtdRodadas);

                cronometros.push( CronometroInput );
            }
        });

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

function addCircuito() {
    const numberCircuito = parseInt( series[series.length - 1 ].number ) + 1;
    series.push(new Serie("", numberCircuito, true));
    montaSerie();
}

series.push(new Serie("", 1, false));
montaSerie();