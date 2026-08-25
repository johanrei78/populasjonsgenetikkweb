// ------------------------------------------------------------
// NAVIGASJON
// ------------------------------------------------------------

const innstillingerSide = document.getElementById("innstillinger");
const resultaterSide = document.getElementById("resultater");

const knappInnstillinger =
    document.getElementById("nav-innstillinger");

const knappResultater =
    document.getElementById("nav-resultater");


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


// Start på innstillingssiden
visSide("innstillinger");
