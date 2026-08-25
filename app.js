// ------------------------------------------------------------
// APP-STATE
// ------------------------------------------------------------

const state = {

    // Tid
    generations: 100,

    // Antall populasjoner
    numPops: 1,

    // Startfrekvens for allel A₁
    p0: 0.5,
    p0_1: 0.5,
    p0_2: 0.5
};


// ------------------------------------------------------------
// ELEMENTER
// ------------------------------------------------------------

// Sider
const innstillingerSide =
    document.getElementById("innstillinger");

const resultaterSide =
    document.getElementById("resultater");


// Navigasjon
const knappInnstillinger =
    document.getElementById("nav-innstillinger");

const knappResultater =
    document.getElementById("nav-resultater");


// Tid
const generationsInput =
    document.getElementById("generations");

const generationsValue =
    document.getElementById("generations-value");


// Antall populasjoner
const numPopsInputs =
    document.querySelectorAll('input[name="num-pops"]');


// Startfrekvenser
const startfrekvensEnPop =
    document.getElementById("startfrekvens-en-pop");

const startfrekvensToPop =
    document.getElementById("startfrekvens-to-pop");

const p0Input =
    document.getElementById("p0");

const p0Value =
    document.getElementById("p0-value");

const p01Input =
    document.getElementById("p0-1");

const p01Value =
    document.getElementById("p0-1-value");

const p02Input =
    document.getElementById("p0-2");

const p02Value =
    document.getElementById("p0-2-value");


// ------------------------------------------------------------
// NAVIGASJON
// ------------------------------------------------------------

function visSide(side) {

    if (side === "innstillinger") {
        innstillingerSide.hidden = false;
        resultaterSide.hidden = true;
    }

    if (side === "resultater") {
        innstillingerSide.hidden = true;
        resultaterSide.hidden = false;
    }
}


knappInnstillinger.addEventListener("click", () => {
    visSide("innstillinger");
});


knappResultater.addEventListener("click", () => {
    visSide("resultater");
});


// ------------------------------------------------------------
// VISNING AV ÉN ELLER TO POPULASJONER
// ------------------------------------------------------------

function oppdaterPopulasjonsvisning() {

    if (state.numPops === 1) {
        startfrekvensEnPop.hidden = false;
        startfrekvensToPop.hidden = true;
    }

    else {
        startfrekvensEnPop.hidden = true;
        startfrekvensToPop.hidden = false;
    }
}


// ------------------------------------------------------------
// OPPDATER GRENSESNITTET FRA STATE
// ------------------------------------------------------------

function oppdaterInnstillingerFraState() {

    // Tid
    generationsInput.value = state.generations;
    generationsValue.textContent = state.generations;


    // Antall populasjoner
    numPopsInputs.forEach(input => {
        input.checked =
            Number(input.value) === state.numPops;
    });


    // Startfrekvens – én populasjon
    p0Input.value = state.p0;
    p0Value.textContent =
        state.p0.toFixed(2);


    // Startfrekvenser – to populasjoner
    p01Input.value = state.p0_1;
    p01Value.textContent =
        state.p0_1.toFixed(2);

    p02Input.value = state.p0_2;
    p02Value.textContent =
        state.p0_2.toFixed(2);


    // Vis riktig sett med innstillinger
    oppdaterPopulasjonsvisning();
}


// ------------------------------------------------------------
// EVENT-LYTTERE
// ------------------------------------------------------------

// Antall generasjoner
generationsInput.addEventListener("input", () => {

    state.generations =
        Number(generationsInput.value);

    generationsValue.textContent =
        state.generations;
});


// Antall populasjoner
numPopsInputs.forEach(input => {

    input.addEventListener("change", () => {

        if (input.checked) {

            state.numPops =
                Number(input.value);

            oppdaterPopulasjonsvisning();
        }
    });
});


// Startfrekvens – én populasjon
p0Input.addEventListener("input", () => {

    state.p0 =
        Number(p0Input.value);

    p0Value.textContent =
        state.p0.toFixed(2);
});


// Startfrekvens – populasjon 1
p01Input.addEventListener("input", () => {

    state.p0_1 =
        Number(p01Input.value);

    p01Value.textContent =
        state.p0_1.toFixed(2);
});


// Startfrekvens – populasjon 2
p02Input.addEventListener("input", () => {

    state.p0_2 =
        Number(p02Input.value);

    p02Value.textContent =
        state.p0_2.toFixed(2);
});


// ------------------------------------------------------------
// OPPSTART
// ------------------------------------------------------------

oppdaterInnstillingerFraState();

visSide("innstillinger");
