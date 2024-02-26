# Website

## Metadata

* **PERSONAGES:** Haal diersoort weg in personagenaam. Zo nodig, maak een pagina aan voor het personage (een bestand onder `characters` en schrijf daarin backstory, met diersoort als YAML metadata.)
  * Ik zet nu meestal toch al notities over personages bij de _notes_.
  * Haal ze daar weg om alvast die karakterpagina's te vullen => dit is ook een goede stap naar minder "one-off" personages en meer hergebruik richting de toekomst.
* Voeg iets meer accurate "teaches" toe bij de eerste verhalen. (Dat ben ik nu aan het begin vaak vergeten. Hoewel die eerste vaak ook niks waargebeurds behandelen.)

## Vertalingen

Gebruik **Seamless-M4T** (tenzij er ondertussen iets beters is uitgekomen).

-   <https://github.com/facebookresearch/seamless_communication>
-   Of bekijk de Hugging Face versie.
-   Verwarrend genoeg noemen ze vertaling "inference". Als je dat begrijpt, kan je lezen hoe het werkt. (Python dingen installeren, juiste parameters geven.)
-   Dit kan *lokaal* op de *CPU*.

## Toekomstige To-Do

**ALS OFFICIEEL BESCHIKBAAR:** Maak de visuele kant van "dit boek is nog niet beschikbaar" duidelijker en mooier.

**TOOL:** Een pagina die de jaartallen uitleest en alle verhalen op de juiste volgorde zet. (Zodat ik het niet meer met de hand hoef te doen.) => Gebruikt "yearstart" (en gemiddelde met "yearend", als die bestaat)

**NOG VEEL GROTERE TOOL:**
* Kan ik _data_ toevoegen (ofwel in data folder, ofwel bij het verhaal zelf het liefst) ...
* ... die precies zegt "dit type ding, met deze naam, verschijnt op deze plek"
* (eventueel met aparte types voor "gebieden" en hun precieze vorm, zoals continenten en landen)
* ... zodat hij _automatisch_ voor mij een wereldkaart maakt door de hele tijd heen
* ... waarin ik simpelweg heen en weer kan gaan en precies kan zien hoe dingen eruitzagen op dat moment?
* Dit zou mij toestaan om per verhaal iets meer metadata bij te houden (zoals ik al doe), om gratis en voor niets de meest geavanceerde wereldkaart ooit te krijgen

**ICOONTJES:** Is er *een manier* om ze groter te laten zien? Want nu moet alles zo klein en versimpeld, dat ik vrij snel geen unieke icoontjes meer kan maken.

**PAGINATION:** Boekenkast---maar hoe?
* Simpele knoppen die URL Parameters toevoegen.
* Die lezen we dan in Javascript, wat bepaalt welk deel van de lijst we pakken.

**SUMMARIES:** Bij *verhaal* summaries (niet hoofdstuk), de titel van de *cyclus* laten zien. (In plaats van de naam van het boek herhalen?) En kan dan ook ergens het icoon van die *cyclus*? (Het icoon van het verhaal *bij het verhaal* is eigenlijk niet iets dat ik wil veranderen.)