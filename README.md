# Evolusjonssimulator

En interaktiv simulator for utforsking av populasjonsgenetikk og evolusjon, utviklet med tanke på bruk i Biologi 2 på NDLA.

Simulatoren lar brukeren undersøke hvordan ulike evolusjonsmekanismer kan påvirke allelfrekvenser og genotypefrekvenser over tid.

## Funksjonalitet

Simulatoren støtter:

* naturlig seleksjon gjennom ulik fitness for genotypene A₁A₁, A₁A₂ og A₂A₂
* mutasjon mellom allelene A₁ og A₂
* genetisk drift, inkludert flaskehalseffekt
* genflyt mellom to populasjoner

Simuleringen kan kjøres med én eller to populasjoner. Resultatene vises grafisk som allelfrekvenser eller genotypefrekvenser, og frekvensene kan leses av for en bestemt generasjon.

## Teknisk løsning

Appen er en klientbasert webapp laget med:

* HTML
* CSS
* JavaScript
* Plotly.js for visualisering av resultater

Alle simuleringer og beregninger utføres lokalt i brukerens nettleser. Appen krever ingen backend, database, Python-miljø eller annen serverbasert kjøring og kan distribueres som statiske filer.

## Filer

```text
index.html
styles.css
app.js
```

* `index.html` inneholder strukturen og brukergrensesnittet.
* `styles.css` inneholder stil og responsiv tilpasning.
* `app.js` inneholder simuleringsmodellen, brukergrensesnittlogikken og visualiseringen av resultater.

## Plotly

Plotly.js brukes til å generere de interaktive grafene.

I den nåværende versjonen lastes Plotly inn eksternt fra Plotlys CDN. Appen er derfor statisk og klientbasert, men krever nettilgang til CDN-et for å laste Plotly-biblioteket.

Ved behov kan Plotly.js i stedet distribueres som en lokal fil sammen med appen.

## Kjøring lokalt

Siden appen består av statiske filer, kan den åpnes og testes i en vanlig nettleser.

For utvikling og testing kan repoet også kjøres med en enkel lokal webserver, for eksempel gjennom funksjonaliteten i en kodeeditor.

## Tilgjengelighet

Brukergrensesnittet er utviklet med vekt på tilgjengelighet, blant annet:

* tastaturnavigasjon
* tydelig fokusmarkering
* semantiske HTML-elementer som `fieldset`, `legend` og `label`
* status- og valideringsmeldinger som kan formidles til hjelpemiddelteknologi
* responsiv visning for smale skjermer
* tekst og grafisk presentasjon med tydelig kontrast

## Pedagogisk formål

Simulatoren er utviklet for utforskende arbeid med populasjonsgenetikk. Elevene kan endre én eller flere evolusjonsmekanismer og undersøke hvordan disse påvirker utviklingen av allel- og genotypefrekvenser over generasjoner.

