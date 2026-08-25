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

const p01Input =
    document.getElementById("p0-1");

const p02Input =
    document.getElementById("p0-2");


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


    // Antall populasjoner
    numPopsInputs.forEach(input => {
        input.checked =
            Number(input.value) === state.numPops;
    });


    // Startfrekvenser
    p0Input.value = state.p0;
    p01Input.value = state.p0_1;
    p02Input.value = state.p0_2;


    // Vis riktig sett med innstillinger
    oppdaterPopulasjonsvisning();
}


// ------------------------------------------------------------
// EVENT-LYTTERE
// ------------------------------------------------------------

// Antall generasjoner
generationsInput.addEventListener("change", () => {

    const value = Number(generationsInput.value);

    if (value >= 10 && value <= 500) {
        state.generations = Math.round(value);
    }

    generationsInput.value = state.generations;
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


// ------------------------------------------------------------
// HJELPEFUNKSJON FOR ALLELFREKVENSER
// ------------------------------------------------------------

function oppdaterAllelfrekvens(input, stateKey) {

    const value = Number(input.value);

    if (value >= 0 && value <= 1) {
        state[stateKey] = value;
    }

    input.value = state[stateKey];
}


// ------------------------------------------------------------
// ALLELFREKVENSER
// ------------------------------------------------------------

p0Input.addEventListener("change", () => {
    oppdaterAllelfrekvens(p0Input, "p0");
});


p01Input.addEventListener("change", () => {
    oppdaterAllelfrekvens(p01Input, "p0_1");
});


p02Input.addEventListener("change", () => {
    oppdaterAllelfrekvens(p02Input, "p0_2");
});


// ------------------------------------------------------------
// OPPSTART
// ------------------------------------------------------------

oppdaterInnstillingerFraState();

visSide("innstillinger");
