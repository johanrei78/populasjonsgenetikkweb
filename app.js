// ------------------------------------------------------------
// APP-STATE
// ------------------------------------------------------------

const state = {
    generations: 100,
    numPops: 1
};


// ------------------------------------------------------------
// ELEMENTER
// ------------------------------------------------------------

const innstillingerSide = document.getElementById("innstillinger");
const resultaterSide = document.getElementById("resultater");

const knappInnstillinger =
    document.getElementById("nav-innstillinger");

const knappResultater =
    document.getElementById("nav-resultater");


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
// INNSTILLINGER
// ------------------------------------------------------------

const generationsInput =
    document.getElementById("generations");

const generationsValue =
    document.getElementById("generations-value");

const numPopsInputs =
    document.querySelectorAll('input[name="num-pops"]');


function oppdaterInnstillingerFraState() {
    generationsInput.value = state.generations;
    generationsValue.textContent = state.generations;

    numPopsInputs.forEach(input => {
        input.checked = Number(input.value) === state.numPops;
    });
}


generationsInput.addEventListener("input", () => {
    state.generations = Number(generationsInput.value);
    generationsValue.textContent = state.generations;
});


numPopsInputs.forEach(input => {
    input.addEventListener("change", () => {
        if (input.checked) {
            state.numPops = Number(input.value);
        }
    });
});


// ------------------------------------------------------------
// OPPSTART
// ------------------------------------------------------------

oppdaterInnstillingerFraState();
visSide("innstillinger");
