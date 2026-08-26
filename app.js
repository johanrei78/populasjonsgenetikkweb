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
    nu: 0.0,

    // Genetisk drift
    useDrift: false,
    N: 100,

    // Flaskehals
    useBottleneck: false,
    bottleneckStart: 20,
    bottleneckDuration: 10,
    bottleneckSize: 20,

    // Genflyt
    useMigration: false,
    m12: 0.0,
    m21: 0.0
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

// Genetisk drift
const useDriftInput =
    document.getElementById("use-drift");

const driftInnstillinger =
    document.getElementById("drift-innstillinger");

const populationSizeInput =
    document.getElementById("population-size");

// Flaskehals
const flaskehalsSeksjon =
    document.getElementById("flaskehals-seksjon");

const useBottleneckInput =
    document.getElementById("use-bottleneck");

const flaskehalsInnstillinger =
    document.getElementById("flaskehals-innstillinger");

const bottleneckStartInput =
    document.getElementById("bottleneck-start");

const bottleneckDurationInput =
    document.getElementById("bottleneck-duration");

const bottleneckSizeInput =
    document.getElementById("bottleneck-size");

// Genflyt
const genflytRad =
    document.getElementById("genflyt-rad");

const useMigrationInput =
    document.getElementById("use-migration");

const migrasjonInnstillinger =
    document.getElementById("migrasjon-innstillinger");

const m12Input =
    document.getElementById("m12");

const m21Input =
    document.getElementById("m21");

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

    oppdaterDriftVisning();
    oppdaterMigrasjonVisning();
}

// ------------------------------------------------------------
// GENETISK DRIFT
// ------------------------------------------------------------

function oppdaterDriftVisning() {

    // Driftinnstillingene vises bare når drift er aktivert
    driftInnstillinger.hidden =
        !state.useDrift;


    // Flaskehals er bare tilgjengelig ved én populasjon
    flaskehalsSeksjon.hidden =
        state.numPops !== 1;


    // Detaljene vises bare når flaskehals er aktivert
    flaskehalsInnstillinger.hidden =
        !state.useBottleneck;
}

// ------------------------------------------------------------
// GENFLYT
// ------------------------------------------------------------

function oppdaterMigrasjonVisning() {

    const toPopulasjoner =
        state.numPops === 2;

    // Hele genflytboksen vises bare ved to populasjoner
    genflytRad.hidden =
        !toPopulasjoner;

    // Ratefeltene vises bare ved to populasjoner
    // og når migrasjon er slått på
    migrasjonInnstillinger.hidden =
        !(toPopulasjoner && state.useMigration);
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


    // Genetisk drift
    useDriftInput.checked = state.useDrift;
    populationSizeInput.value = state.N;


    // Flaskehals
    useBottleneckInput.checked =
        state.useBottleneck;

    bottleneckStartInput.value =
        state.bottleneckStart;

    bottleneckDurationInput.value =
        state.bottleneckDuration;

    bottleneckSizeInput.value =
        state.bottleneckSize;


    // Genflyt
    useMigrationInput.checked =
        state.useMigration;

    m12Input.value =
        state.m12;

    m21Input.value =
        state.m21;
    
    oppdaterDriftVisning();
    
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

function sampleBinomial(n, probability) {
    let successes = 0;

    for (let i = 0; i < n; i++) {
        if (Math.random() < probability) {
            successes++;
        }
    }

    return successes;
}

// ------------------------------------------------------------
// SIMULERINGSMOTOR – ÉN POPULASJON
// ------------------------------------------------------------



function simulateOnePopulationDeterministic({
    p0,
    wAA,
    wAa,
    waa,
    mu,
    nu,
    generations,
    N = null,
    bottleneckStart = null,
    bottleneckDuration = null,
    bottleneckSize = null
}) {

    let p = p0;

    const freqs = [];
    const genotypes = [];

    // Generasjon 0
    freqs.push(p);

    genotypes.push({
        AA: p * p,
        Aa: 2 * p * (1 - p),
        aa: (1 - p) * (1 - p)
    });


    for (let generation = 1; generation <= generations; generation++) {

        // Hardy–Weinberg-frekvenser før seleksjon
        const p2 = p * p;
        const pq = 2 * p * (1 - p);
        const q2 = (1 - p) * (1 - p);


        // Naturlig seleksjon
        const meanFitness =
            p2 * wAA +
            pq * wAa +
            q2 * waa;

        let pAfterSelection;

        if (meanFitness === 0) {
            pAfterSelection = p;
        } else {
            pAfterSelection =
                (
                    p2 * wAA +
                    0.5 * pq * wAa
                ) / meanFitness;
        }


        // Mutasjon
        const pAfterMutation =
            pAfterSelection * (1 - mu) +
            (1 - pAfterSelection) * nu;


        // Genetisk drift og eventuell flaskehals
        if (N !== null) {

            let effectiveN = N;

            const bottleneckActive =
                bottleneckStart !== null &&
                bottleneckDuration !== null &&
                bottleneckSize !== null &&
                generation >= bottleneckStart &&
                generation < bottleneckStart + bottleneckDuration;

            if (bottleneckActive) {
            effectiveN = bottleneckSize;
            }

            const numberOfA1 = sampleBinomial(
            2 * effectiveN,
            pAfterMutation
            );

            p = numberOfA1 / (2 * effectiveN);

        } else {
            p = pAfterMutation;
        }

        // Sikre at frekvensen ligger mellom 0 og 1
        p = Math.min(1, Math.max(0, p));


        // Lagre resultatet for denne generasjonen
        freqs.push(p);

        genotypes.push({
            AA: p * p,
            Aa: 2 * p * (1 - p),
            aa: (1 - p) * (1 - p)
        });
    }


    return {
        freqs,
        genotypes
    };
}


// ------------------------------------------------------------
// SIMULERINGSMOTOR – To POPULASJONER
// ------------------------------------------------------------

function simulateTwoPopulations({
    p0_1,
    p0_2,
    wAA_1,
    wAa_1,
    waa_1,
    wAA_2,
    wAa_2,
    waa_2,
    mu,
    nu,
    generations,
    N = null
}) {

    let p1 = p0_1;
    let p2 = p0_2;

    const freqs = [];
    const genotypes = [];

    // Generasjon 0
    freqs.push([p1, p2]);

    genotypes.push([
        {
            AA: p1 * p1,
            Aa: 2 * p1 * (1 - p1),
            aa: (1 - p1) * (1 - p1)
        },
        {
            AA: p2 * p2,
            Aa: 2 * p2 * (1 - p2),
            aa: (1 - p2) * (1 - p2)
        }
    ]);

    for (let generation = 1; generation <= generations; generation++) {

        const currentPs = [p1, p2];

        const fitnessValues = [
            {
                wAA: wAA_1,
                wAa: wAa_1,
                waa: waa_1
            },
            {
                wAA: wAA_2,
                wAa: wAa_2,
                waa: waa_2
            }
        ];

        const nextPs = [];

        for (let i = 0; i < 2; i++) {

            const p = currentPs[i];
            const fitness = fitnessValues[i];

            // Hardy–Weinberg
            const p2Current = p * p;
            const pq = 2 * p * (1 - p);
            const q2 = (1 - p) * (1 - p);

            // Naturlig seleksjon
            const meanFitness =
                p2Current * fitness.wAA +
                pq * fitness.wAa +
                q2 * fitness.waa;

            let pAfterSelection;

            if (meanFitness === 0) {
                pAfterSelection = p;
            } else {
                pAfterSelection =
                    (
                        p2Current * fitness.wAA +
                        0.5 * pq * fitness.wAa
                    ) / meanFitness;
            }

            // Mutasjon
            const pAfterMutation =
                pAfterSelection * (1 - mu) +
                (1 - pAfterSelection) * nu;

            // Eventuell genetisk drift
            let pNext;

            if (N !== null) {
                const numberOfA1 = sampleBinomial(
                    2 * N,
                    pAfterMutation
                );

                pNext = numberOfA1 / (2 * N);
            } else {
                pNext = pAfterMutation;
            }

            // Sikre verdi mellom 0 og 1
            pNext = Math.min(1, Math.max(0, pNext));

            nextPs.push(pNext);
        }

        p1 = nextPs[0];
        p2 = nextPs[1];

        freqs.push([p1, p2]);

        genotypes.push([
            {
                AA: p1 * p1,
                Aa: 2 * p1 * (1 - p1),
                aa: (1 - p1) * (1 - p1)
            },
            {
                AA: p2 * p2,
                Aa: 2 * p2 * (1 - p2),
                aa: (1 - p2) * (1 - p2)
            }
        ]);
    }

    return {
        freqs,
        genotypes
    };
}

const testResultatToPop = simulateTwoPopulations({
    p0_1: 0.2,
    p0_2: 0.8,

    wAA_1: 1,
    wAa_1: 1,
    waa_1: 1,

    wAA_2: 1,
    wAa_2: 1,
    waa_2: 1,

    mu: 0,
    nu: 0,

    generations: 10,
    N: null
});

console.log(testResultatToPop);
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

// Genetisk drift
useDriftInput.addEventListener("change", () => {

    state.useDrift =
        useDriftInput.checked;

    oppdaterDriftVisning();
});


populationSizeInput.addEventListener("change", () => {

    const value =
        Number(populationSizeInput.value);

    if (
        Number.isInteger(value) &&
        value >= 10 &&
        value <= 10000
    ) {
        state.N = value;
    }

    populationSizeInput.value = state.N;
});

// Flaskehals av/på
useBottleneckInput.addEventListener("change", () => {

    state.useBottleneck =
        useBottleneckInput.checked;

    oppdaterDriftVisning();
});


// Startgenerasjon
bottleneckStartInput.addEventListener("change", () => {

    const value =
        Number(bottleneckStartInput.value);

    if (
        Number.isInteger(value) &&
        value >= 1
    ) {
        state.bottleneckStart = value;
    }

    bottleneckStartInput.value =
        state.bottleneckStart;
});


// Varighet
bottleneckDurationInput.addEventListener("change", () => {

    const value =
        Number(bottleneckDurationInput.value);

    if (
        Number.isInteger(value) &&
        value >= 1
    ) {
        state.bottleneckDuration = value;
    }

    bottleneckDurationInput.value =
        state.bottleneckDuration;
});


// Populasjonsstørrelse under flaskehals
bottleneckSizeInput.addEventListener("change", () => {

    const value =
        Number(bottleneckSizeInput.value);

    if (
        Number.isInteger(value) &&
        value >= 2 &&
        value <= 10000
    ) {
        state.bottleneckSize = value;
    }

    bottleneckSizeInput.value =
        state.bottleneckSize;
});

// ------------------------------------------------------------
// GENFLYT
// ------------------------------------------------------------

useMigrationInput.addEventListener("change", () => {

    state.useMigration =
        useMigrationInput.checked;

    oppdaterMigrasjonVisning();
});


m12Input.addEventListener("change", () => {

    oppdaterSannsynlighet(
        m12Input,
        "m12",
        1
    );
});


m21Input.addEventListener("change", () => {

    oppdaterSannsynlighet(
        m21Input,
        "m21",
        1
    );
});


// ------------------------------------------------------------
// OPPSTART
// ------------------------------------------------------------

oppdaterInnstillingerFraState();

visSide("innstillinger");
