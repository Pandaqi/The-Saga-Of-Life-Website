# Hoe werkt de website?

## Lettertypes

Hoe je een nieuw lettertype toevoegt:

-   Partial "site-font-select.html" => voeg knop toe om deze te kiezen

-   JS "font_selector.js" => voeg Google Fonts URL toe

-   SASS "modules/\_fonts.scss" => voeg toe en speel tot juiste waardes

In de toekomst het proces in de partial misschien automatiseren? Ik weet gewoon niet hoe ik Hugo dingen kan laten uitvoeren in externe JS bestanden.

## Boekenkast

Alleen op deze pagina print het systeem een JSON object met alle boeken en info in de console. Kopieer + plak in de **caches** (assets) voor elke taal.

## Zoekfunctie

Geregeld door PageFind. Na bouwen website run ik "npx pagefind \--source public" en het regelt alles vanzelf.

## Nog-niet-beschikbare verhalen

Zet deze dingen in de frontmatter:

locked: true

cascade:

\- \_target:

    kind: page

  draft: true

Zo wordt het verhaal wél weergegeven en netjes overal meegenomen. Maar de hoofdstukken bestaan niet. En de bezoeker wordt duidelijk verteld dat ze het kunnen kopen (en waar).

## Structuur

Het is een statische website gemaakt met **Hugo.**

De structuur is als volgt:

-   Books

    -   \<folder met boektitel>

        -   \<losse hoofdstukken van het boek>

Elke laag moet een "\_index.md" bestand hebben zodat het als *section* wordt gemarkeerd.

Hoofdstukken/boeken worden geordend op *datum ascending*. (Dus hoe eerder de datum, hoe eerder in het boek.)

Elk *boek* heeft metadata:

-   Timeperiod => het tijdvak waarin het verhaal afspeelt

-   Bundle => de bundel waarin het is uitgegeven

-   Characters => lijst van karakters in het verhaal

-   *To Do: nog meer? Genre? Blurb? Geweld?*

Het heeft twee thema's:

-   Ananke (*development*) = gebruik als ik aan het boek werk om snel resultaat te zien

-   Epub (*deploy*) = gebruik alleen als ik de website wil ombouwen tot epub

## Hoe maak ik een epub?

**Stap 1:** Switch "config.toml" naar de "config_epub.toml"

(**Stap 2 (optioneel):** Voeg de bestanden uit "content_epub" toe aan de root van "content", als ze zijn verdwenen.)

**Stap 3:** in "config.toml", verander de "ignoreFiles" door de titels van de boeken in te vullen die je *wel* wilt hebben.

**Stap 4:** type "hugo" (vanuit de website directory) om het te bouwen.

**Stap 5:** je epub is nu de inhoud van de *public* folder. Zip het. Verander extensie.

Klaar.

## Hoe verander ik de opmaak

Drie plekken

-   Het epub thema heeft een **stylesheet.css**.

-   Het "single.html" bestand is voor de inhoudsopgave *en* individuele hoofdstukken.

-   Het "section.html" bestand is voor de secties (eerste pagina's van boeken)

## Media

Plaatjes:

-   Maak alles origineel in **.png**. Laat deze staan, de epubs hebben het nodig.

-   Maar zet daarna om in **.webp** en gebruik dat op de website zelf.

## Notities

Er zijn een hele hoop bestanden waar we praktisch dezelfde *dubbele loop* uitvoeren (door boeken + chapters in boeken):

-   Index.opf => slaat op welke bestanden er precies in het ebook zitten, inclusief ID en de volgorde

-   Index.ncx => genereert de navigatieboom achter de schermen

-   Single.xhtml => genereert de HTML voor *table of contents*. (Voor epub 3 kan dit ook worden gebruikt als navigatie, dus zo markeren we het ook.)

**Les:** een lijst in een lijst doe je door de sublijst *in* de \<li> te zetten van het element er exact boven.

**Les:** "\_index.md" maakt van een folder een sectie. ".Section" pakt normaal gesproken alleen de *root section*. Als je een andere wil, kan je hem beter direct pakken met "site.GetPages \<url>"

Dan heb je hem sowieso én je kan makkelijk door alle directe kinderen met ".Pages". Als je door *alle* kinderen wil (ook in verdere subsecties), doe je "RecursivePages"

**Les:** je kan heel wat bereiken met je *config.toml*

-   ignoreFiles = *regex* om hele delen niet te exporteren

-   disableKinds = allerlei dingen die het standaard aanmaakt uitzetten

-   permalinks = hele URLs herschrijven

## Ideeën

**Voeg een header/footer toe aan de uiteindelijke PDF**. (Met paginanummers, icoontjes, welk verhaal/hoofdstuk je nu in zit.)

> Dit doe je met de footer/header template van Calibre. Gebruik JavaScript om alleen zinnige dingen te laten zien. (Geen paginanummers aan begin, geen "sectie \> subsectie" als die leeg zijn of hetzelfde.)
>
> <https://manual.calibre-ebook.com/conversion.html#converting-to-pdf>
>
> <https://www.reddit.com/r/selfpublish/comments/8dfxx7/doc_to_epub_is_it_possible_to_retain_my/>

**Laat een mooi plaatje zien rondom de hoofdstuktitel van elk nieuw hoofdstuk.** Dit kan gewoon in de website HTML.

**Maak de eerste pagina** (met het gedicht enzo) **mooi** **en uniek op.** Dit kan ook gewoon in de website HTML.

# Genres

-   **Breinbreker:** alles dat meer diepgaand, psychologisch of filosofisch is.

-   **Gesprekken:** alles dat vooral gaat over dialoog en gesprekken.

-   **Actief**: alles waarin voornamelijk dingen *gebeuren* en actie plaatsvindt.

-   **Gevecht:** alles met oorlog, of vechten, of een verhaal rondom geweld

-   **Maatschappij:** alles dat met politiek, sociaal of stromingen (in een omgeving) te maken heeft.

-   **Magie:** alles met magie, tovenarij, speciale krachten

-   **Mythe**: alles dat te maken heeft of lijkt op een mythe, legende, sprookje, saga, volksverhaal

-   **Mysterie:** alles met een groot mysterie dat men probeert op te lossen, meestal detectives

-   **Wetenschap:** alles dat draait om wetenschappelijke uitleg, feitjes of uitvindingen

-   **Technologie:** alles richting science-fiction (robots, geavanceerde technologie, ruimtereizen, \...)

-   **Eng:** alles rondom horror, spook en griezelverhalen. (Griezelen was mijn andere keuze, maar dat richt iets té veel op kinderen.)

-   **Avontuur:** alles waarin men ergens naartoe gaat voor een bepaalde missie of doel, met constant grotere obstakels, meestal verafgelegen en grootschalig

-   **Reizen:** alles waarin men voornamelijk rondreist of het verhaal eindigt als ze een bekend einddoel bereiken

-   **Goden:** alles dat te maken heeft met religie, godsdienst, spiritualiteit (of de letterlijke goden in mijn wereld)

-   **Creativiteit:** alles dat te maken heeft met creativiteit en de kunsten, zoals muziek, sport, tekenen, spelletjes => **wordt eventueel nog onderverdeeld**

-   **Grappig:** alles met voornamelijk grappige en komische scenes, of gestructureerd als een parodie of satirische kijk op iets

-   **Verdrietig:** alles waarbij het verhaal droevige onderdelen heeft of een einde dat niet voor iedereen goed afloopt.

-   **Familie:** alles waarbij een familie de hoofdrol speelt óf het algemene concept/thema van familie.

-   **Vriendschap:** alles waarbij vrienden de hoofdrol spelen óf het algemene concept/thema van vriendschap.

-   **Liefde:** alles waarbij een verhaallijn over liefde is, ofwel letterlijk ofwel metaforisch

-   **Educatief:** alles met als doel iets te leren óf dat bewust leerzame onderdelen bevat (waarin bijvoorbeeld letterlijk een feitje wordt verteld of een systeem in de wereld uitgelegd)

-   **Groeien:** alles waarbij het gaat over een personage dat opgroeit of iets dat zich ontwikkelt van het ene naar het andere => is eventueel duidelijker als \"opgroeien\" of \"ontwikkeling\"

-   **Ontstaan:** alles dat het ontstaan van een belangrijk onderdeel van mijn wereld uitlegt.

-   **Ontdekking:** alles waarbij het doel is, of het eindresultaat, dat iets belangrijks wordt gezocht of ontdekt

-   **Overleven:** alles waarbij de hoofdpersonen moeten reageren op hun omgeving en moeten zien te overleven

-   **Misdaad:** alles waarbij misdaden worden gepleegd of misdadigers de hoofdrol hebben (maar niet per se een misdaad wordt opgelost, zoals bij *mysterie/detective*)

-   **Spionage:** alles waarbij hoofdpersonen iets stiekem moeten doen, of ergens moeten binnendringen, of letterlijk spionnen zijn/spioneren.

-   **Waargebeurd:** alles dat grotendeels is gebaseerd op échte verhalen of onderdelen van de échte wereld.

-   **Belangrijk:** sommige korte verhalen in de levenssaga zijn extreem belangrijk, want ze leggen een grote gebeurtenis met grote gevolgen uit, en dat is dan ook 90% van het verhaal. Lijkt me fijn om dat aan te kunnen geven.
