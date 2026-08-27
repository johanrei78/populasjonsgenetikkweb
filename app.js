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

const runSimulationButton =
    document.getElementById("run-simulation");

// Resultater
const resultSection =
    document.getElementById("resultater");

const resultContent =
    document.getElementById("resultat-innhold");

const alleleGraph =
    document.getElementById("allelgraf");

const generationReadoutInput =
    document.getElementById("avlesning-generasjon");

const generationReadoutButton =
    document.getElementById("les-av-generasjon");

const generationReadoutResult =
    document.getElementById("avlesning-resultat");

const resultViewInputs =
    document.querySelectorAll(
        'input[name="resultatvisning"]'
    );

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

function hentResultatvisning() {
    const valgt = document.querySelector(
        'input[name="resultatvisning"]:checked'
    );

    return valgt ? valgt.value : "alleler";
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
    N = null,
    migrate = false,
    m12 = 0,
    m21 = 0
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

        // Genflyt mellom populasjonene
        if (migrate) {
            const p1BeforeMigration = p1;
            const p2BeforeMigration = p2;

            p1 =
                (1 - m21) * p1BeforeMigration +
                m21 * p2BeforeMigration;

            p2 =
                (1 - m12) * p2BeforeMigration +
                m12 * p1BeforeMigration;
        }

        // Sikre verdier mellom 0 og 1
        p1 = Math.min(1, Math.max(0, p1));
        p2 = Math.min(1, Math.max(0, p2));

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

// ------------------------------------------------------------
// FIGURER
// ------------------------------------------------------------

const alleleViewInput =
    document.querySelector(
        'input[name="resultatvisning"][value="alleler"]'
    );

alleleViewInput.checked = true;

function visAllelfrekvensEnPopulasjon(resultat) {

    const generasjoner =
        resultat.freqs.map((_, index) => index);

    const frekvenser = resultat.freqs;

    const data = [
        {
            x: generasjoner,
            y: frekvenser,
            type: "scatter",
            mode: "lines",
            name: "A₁",
            hovertemplate:
                "Generasjon %{x}<br>Frekvens A₁: %{y:.3f}<extra></extra>"
        }
    ];

    const layout = {
        title: {
            text: "Allelfrekvens A₁"
        },
        xaxis: {
            title: {
                text: "Generasjon"
            },
            fixedrange: true
        },
        yaxis: {
            title: {
                text: "Frekvens"
            },
            range: [0, 1],
            fixedrange: true
        },
        margin: {
            l: 60,
            r: 20,
            t: 60,
            b: 60
        }
    };

    const config = {
        responsive: true,
        displayModeBar: false,
        scrollZoom: false
    };

    Plotly.newPlot(
        alleleGraph,
        data,
        layout,
        config
    );
}

function visGenotypefrekvenserEnPopulasjon(resultat) {

    const generasjoner =
        resultat.genotypes.map((_, index) => index);

    const frekvensAA =
        resultat.genotypes.map(genotype => genotype.AA);

    const frekvensAa =
        resultat.genotypes.map(genotype => genotype.Aa);

    const frekvensaa =
        resultat.genotypes.map(genotype => genotype.aa);

    const data = [
        {
            x: generasjoner,
            y: frekvensAA,
            type: "scatter",
            mode: "lines",
            name: "A₁A₁",
            hovertemplate:
                "Generasjon %{x}<br>Frekvens A₁A₁: %{y:.3f}<extra></extra>"
        },
        {
            x: generasjoner,
            y: frekvensAa,
            type: "scatter",
            mode: "lines",
            name: "A₁A₂",
            hovertemplate:
                "Generasjon %{x}<br>Frekvens A₁A₂: %{y:.3f}<extra></extra>"
        },
        {
            x: generasjoner,
            y: frekvensaa,
            type: "scatter",
            mode: "lines",
            name: "A₂A₂",
            hovertemplate:
                "Generasjon %{x}<br>Frekvens A₂A₂: %{y:.3f}<extra></extra>"
        }
    ];

    const layout = {
        title: {
            text: "Genotypefrekvenser"
        },
        xaxis: {
            title: {
                text: "Generasjon"
            },
            fixedrange: true
        },
        yaxis: {
            title: {
                text: "Frekvens"
            },
            range: [0, 1],
            fixedrange: true
        },
        margin: {
            l: 60,
            r: 20,
            t: 60,
            b: 60
        },

        height: smalSkjerm ? 700 : 450,
    };

    const config = {
        responsive: true,
        displayModeBar: false,
        scrollZoom: false
    };

    Plotly.newPlot(
        alleleGraph,
        data,
        layout,
        config
    );
}




function visAllelfrekvensToPopulasjoner(resultat) {

    const generasjoner =
        resultat.freqs.map((_, index) => index);

    const frekvensPop1 =
        resultat.freqs.map(frekvenser => frekvenser[0]);

    const frekvensPop2 =
        resultat.freqs.map(frekvenser => frekvenser[1]);

    const smalSkjerm = window.innerWidth <= 600;
    
    const data = [
        {
            x: generasjoner,
            y: frekvensPop1,
            type: "scatter",
            mode: "lines",
            name: "A₁",
            showlegend: false,
            xaxis: "x",
            yaxis: "y",
            hovertemplate:
                "Generasjon %{x}<br>Frekvens A₁: %{y:.3f}<extra></extra>"
        },
        {
            x: generasjoner,
            y: frekvensPop2,
            type: "scatter",
            mode: "lines",
            name: "A₁",
            showlegend: false,
            xaxis: "x2",
            yaxis: "y2",
            hovertemplate:
                "Generasjon %{x}<br>Frekvens A₁: %{y:.3f}<extra></extra>"
        }
    ];

    const layout = {
        title: {
            text: "Allelfrekvens A₁"
        },


        xaxis: {
            title: {
                text: "Generasjon"
            },
            fixedrange: true,
            domain: smalSkjerm ? [0, 1] : [0, 0.45]
        },

        yaxis: {
            title: {
                text: "Frekvens"
            },
            range: [0, 1],
            fixedrange: true,
            domain: smalSkjerm ? [0.57, 1] : [0, 1]
        },

        xaxis2: {
            title: {
                text: "Generasjon"
            },
            fixedrange: true,
            domain: smalSkjerm ? [0, 1] : [0.55, 1]
        },

        yaxis2: {
            title: {
                text: "Frekvens" 
            },    
            range: [0, 1],
            fixedrange: true,
            showticklabels: true,
            ticks: "outside",
            domain: smalSkjerm ? [0, 0.43] : [0, 1]
        },

        annotations: smalSkjerm
            ? [
                {
                    text: "Populasjon 1",
                    x: 0.5,
                    y: 1.05,
                    xref: "paper",
                    yref: "paper",
                    showarrow: false
                },
                {
                    text: "Populasjon 2",
                    x: 0.5,
                    y: 0.48,
                    xref: "paper",
                    yref: "paper",
                    showarrow: false
                }
            ]
            : [
                {
                    text: "Populasjon 1",
                    x: 0.225,
                    y: 1.08,
                    xref: "paper",
                    yref: "paper",
                    showarrow: false
                },
                {
                    text: "Populasjon 2",
                    x: 0.775,
                    y: 1.08,
                    xref: "paper",
                    yref: "paper",
                    showarrow: false
                }
            ],

        margin: {
            l: 60,
            r: 20,
            t: 85,
            b: 60
        }
    };

    const config = {
        responsive: true,
        displayModeBar: false,
        scrollZoom: false
    };

    Plotly.newPlot(
        alleleGraph,
        data,
        layout,
        config
    );
}

// Lagrer resultatet fra siste simulering
let sisteResultat = null;

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


runSimulationButton.addEventListener("click", () => {

    let resultat;

    if (state.numPops === 1) {

        resultat = simulateOnePopulationDeterministic({
            p0: state.p0,

            wAA: state.wAA_1,
            wAa: state.wAa_1,
            waa: state.waa_1,

            mu: state.mu,
            nu: state.nu,

            generations: state.generations,

            N: state.useDrift
                ? state.N
                : null,

            bottleneckStart:
                state.useDrift && state.useBottleneck
                    ? state.bottleneckStart
                    : null,

            bottleneckDuration:
                state.useDrift && state.useBottleneck
                    ? state.bottleneckDuration
                    : null,

            bottleneckSize:
                state.useDrift && state.useBottleneck
                    ? state.bottleneckSize
                    : null
        });

        console.log("Resultat én populasjon:", resultat);

    } else {

        resultat = simulateTwoPopulations({
            p0_1: state.p0_1,
            p0_2: state.p0_2,

            wAA_1: state.wAA_1,
            wAa_1: state.wAa_1,
            waa_1: state.waa_1,

            wAA_2: state.wAA_2,
            wAa_2: state.wAa_2,
            waa_2: state.waa_2,

            mu: state.mu,
            nu: state.nu,

            generations: state.generations,

            N: state.useDrift
                ? state.N
                : null,

            migrate: state.useMigration,
            m12: state.m12,
            m21: state.m21
        });

        console.log("Resultat to populasjoner:", resultat);
    }

    sisteResultat = resultat;

    visSide("resultater");
    
    if (state.numPops === 1) {
        const startFrequency = resultat.freqs[0];
        const endFrequency =
            resultat.freqs[resultat.freqs.length - 1];

        resultContent.innerHTML = `
            <p>
                Startfrekvens A₁:
                ${startFrequency.toFixed(3)}
            </p>
            <p>
                Frekvens A₁ etter ${state.generations} generasjoner:
                ${endFrequency.toFixed(3)}
            </p>
        `;
        generationReadoutInput.max = state.generations;
        generationReadoutInput.value = 0;
        generationReadoutResult.textContent = "";

        const alleleViewInput = document.querySelector(
            'input[name="resultatvisning"][value="alleler"]'
        );

        if (alleleViewInput) {
            alleleViewInput.checked = true;
        }
        
        visAllelfrekvensEnPopulasjon(resultat);
    
    } else {

        const alleleViewInput = document.querySelector(
            'input[name="resultatvisning"][value="alleler"]'
        );

        if (alleleViewInput) {
            alleleViewInput.checked = true;
        }

        generationReadoutInput.max = state.generations;
        generationReadoutInput.value = 0;
        generationReadoutResult.textContent = "";

        visAllelfrekvensToPopulasjoner(resultat);
    }
    

    
});

//AVLESNING GENERASJON

generationReadoutButton.addEventListener("click", () => {

    if (!sisteResultat || state.numPops !== 1) {
        return;
    }

    const generation =
        Number(generationReadoutInput.value);

    if (
        !Number.isInteger(generation) ||
        generation < 0 ||
        generation >= sisteResultat.freqs.length
    ) {
        generationReadoutResult.textContent =
            `Skriv inn en generasjon mellom 0 og ${sisteResultat.freqs.length - 1}.`;

        return;
    }

    const visning = hentResultatvisning();

    if (visning === "alleler") {

        const frequency =
            sisteResultat.freqs[generation];

        generationReadoutResult.textContent =
            `I generasjon ${generation} er frekvensen av A₁ ${frequency.toFixed(3)}.`;

    } else {

        const genotype =
            sisteResultat.genotypes[generation];

        generationReadoutResult.textContent =
            `I generasjon ${generation} er frekvensene A₁A₁: ${genotype.AA.toFixed(3)}, A₁A₂: ${genotype.Aa.toFixed(3)} og A₂A₂: ${genotype.aa.toFixed(3)}.`;
    }
});

//RESULTATVISNING

resultViewInputs.forEach(input => {
    input.addEventListener("change", () => {

        if (!sisteResultat || state.numPops !== 1) {
            return;
        }

        const visning = hentResultatvisning();

        if (visning === "alleler") {
            visAllelfrekvensEnPopulasjon(sisteResultat);
        } else {
            visGenotypefrekvenserEnPopulasjon(sisteResultat);
        }
    });
});

window.addEventListener("resize", () => {

    if (!sisteResultat) {
        return;
    }

    if (state.numPops === 2) {

        const visning = hentResultatvisning();

        if (visning === "alleler") {
            visAllelfrekvensToPopulasjoner(sisteResultat);
        }
    }
});

// ------------------------------------------------------------
// OPPSTART
// ------------------------------------------------------------

oppdaterInnstillingerFraState();

visSide("innstillinger");
