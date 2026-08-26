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
    p0_2: 0.5,

    // Fitness – populasjon 1
    wAA_1: 1.0,
    wAa_1: 1.0,
    waa_1: 1.0,

    // Fitness – populasjon 2
    wAA_2: 1.0,
    wAa_2: 1.0,
    waa_2: 1.0,

    // Mutasjon
    mu: 0.0,
    nu: 0.0
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

const p01Input =
    document.getElementById("p0-1");

const p02Input =
    document.getElementById("p0-2");


// Fitness
const fitnessEnPop =
    document.getElementById("fitness-en-pop");

const fitnessToPop =
    document.getElementById("fitness-to-pop");

const wAA1Input =
    document.getElementById("wAA-1");

const wAa1Input =
    document.getElementById("wAa-1");

const waa1Input =
    document.getElementById("waa-1");

const wAA1TwoInput =
    document.getElementById("wAA-1-two");

const wAa1TwoInput =
    document.getElementById("wAa-1-two");

const waa1TwoInput =
    document.getElementById("waa-1-two");

const wAA2Input =
    document.getElementById("wAA-2");

const wAa2Input =
    document.getElementById("wAa-2");

const waa2Input =
    document.getElementById("waa-2");


// Mutasjon
const muInput =
    document.getElementById("mu");

const nuInput =
    document.getElementById("nu");


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

    const enPop = state.numPops === 1;

    startfrekvensEnPop.hidden = !enPop;
    startfrekvensToPop.hidden = enPop;

    fitnessEnPop.hidden = !enPop;
    fitnessToPop.hidden = enPop;
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


    // Startfrekvenser
    p0Input.value = state.p0;
    p01Input.value = state.p0_1;
    p02Input.value = state.p0_2;


    // Fitness – populasjon 1
    wAA1Input.value = state.wAA_1;
    wAa1Input.value = state.wAa_1;
    waa1Input.value = state.waa_1;

    wAA1TwoInput.value = state.wAA_1;
    wAa1TwoInput.value = state.wAa_1;
    waa1TwoInput.value = state.waa_1;


    // Fitness – populasjon 2
    wAA2Input.value = state.wAA_2;
    wAa2Input.value = state.wAa_2;
    waa2Input.value = state.waa_2;


    // Mutasjon
    muInput.value = state.mu;
    nuInput.value = state.nu;


    oppdaterPopulasjonsvisning();
}


// ------------------------------------------------------------
// HJELPEFUNKSJONER
// ------------------------------------------------------------

function oppdaterSannsynlighet(input, stateKey, maxValue = 1) {

    const value = Number(input.value);

    if (value >= 0 && value <= maxValue) {
        state[stateKey] = value;
    }

    input.value = state[stateKey];
}


function oppdaterFitness(input, stateKey) {

    oppdaterSannsynlighet(input, stateKey, 1);

    oppdaterInnstillingerFraState();
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


// Startfrekvens
p0Input.addEventListener("change", () => {
    oppdaterSannsynlighet(p0Input, "p0");
});

p01Input.addEventListener("change", () => {
    oppdaterSannsynlighet(p01Input, "p0_1");
});

p02Input.addEventListener("change", () => {
    oppdaterSannsynlighet(p02Input, "p0_2");
});


// Fitness – populasjon 1
wAA1Input.addEventListener("change", () => {
    oppdaterFitness(wAA1Input, "wAA_1");
});

wAa1Input.addEventListener("change", () => {
    oppdaterFitness(wAa1Input, "wAa_1");
});

waa1Input.addEventListener("change", () => {
    oppdaterFitness(waa1Input, "waa_1");
});


// Fitness – populasjon 1 i to-populasjonsvisningen
wAA1TwoInput.addEventListener("change", () => {
    oppdaterFitness(wAA1TwoInput, "wAA_1");
});

wAa1TwoInput.addEventListener("change", () => {
    oppdaterFitness(wAa1TwoInput, "wAa_1");
});

waa1TwoInput.addEventListener("change", () => {
    oppdaterFitness(waa1TwoInput, "waa_1");
});


// Fitness – populasjon 2
wAA2Input.addEventListener("change", () => {
    oppdaterFitness(wAA2Input, "wAA_2");
});

wAa2Input.addEventListener("change", () => {
    oppdaterFitness(wAa2Input, "wAa_2");
});

waa2Input.addEventListener("change", () => {
    oppdaterFitness(waa2Input, "waa_2");
});


// Mutasjon
muInput.addEventListener("change", () => {
    oppdaterSannsynlighet(muInput, "mu", 0.01);
});

nuInput.addEventListener("change", () => {
    oppdaterSannsynlighet(nuInput, "nu", 0.01);
});


// ------------------------------------------------------------
// OPPSTART
// ------------------------------------------------------------

oppdaterInnstillingerFraState();

visSide("innstillinger");
