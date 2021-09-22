# Henkilötietojen käsittely ja tietojen julkisuus 
Laskurin luotettava toiminta vaatii erilaisten käyttäjä- ja yritystietojen tallentamista. Tiedot tarvitaan käyttäjien tunnistamiseen, käyttöoikeuksien määrittämiseen sekä laskurin ylläpitoa ja päivityksiä koskevaan viestintään. Tämä tulee huomioida käytössä olevan ohjelmiston tietosuojalausekkeissa ja käyttäjiltä kysyttävissä suostumuksissa. 

## Käyttäjästä kerättävät tiedot
Käyttäjästä tallennetaan seuraavat tiedot tunnistautumista ja käyttäjien yksilöimistä sekä käyttäjäkokemuksen räätälöintiä (esim. nimen esittäminen järjestelmän lähettämissä viesteissä tai etusivulla) varten:  
- Nimi
- Sähköpostiosoite
- Yrityksen nimi
- Käyttäjän rooli yrityksessä

Käyttäjätunnus tallennetaan jokaisen kulutustiedon yhteyteen (kuka tiedot syötti) mutta ei yrityksen tietojen muokkaamisen yhteydessä. 

Käyttäjän on mahdollista poistaa omat tietonsa (alkuvaiheessa tämä tehdään laittamalla tukipyyntö ylläpitoon) järjestelmästä mutta käyttäjän järjestelmään lisäämät kulutustiedot tai yrityksen perustiedot eivät tässä yhteydessä poistu. 

## Yrityksestä kerättävät tiedot
Yrityksestä kerättävät tiedot ovat osin julkisia mutta mukana paljon myös liikesalaisuuden alaista tietoa. Tämän vuoksi tiedot ovat lähtökohtaisesti vain yrityksen omien käyttäjien sekä koko järjestelmän pääkäyttäjän nähtävillä (ylläpitotehtävien suorittamista varten). 

Yrityksistä kerättävät tiedot: 
- Yrityksen nimi, Y-tunnus, toimialat
- Tunnusluvut (asiakasmäärät, liikevaihto, yöpymismäärät, työntekijämäärät, myytyjen tuotteiden määrät yms.) 
- Yritykseen liitetyt käyttäjät
- Toimipaikkojen tiedot (toimipaikan nimi, tyyppi, sijaintikunta, rakenne) 
- Kulutustiedot tässä dokumentissa kuvatulla tavalla. 
- Evästeitä käytetään käyttäjien tunnistamiseen. 

Yrityksen laskentatulosten julkisuus määritellään tarkemmin jatkokehityksen yhteydessä. Lähtökohtaisesti kaikki yrityksen tiedot ovat näkyvillä kaikille yrityksen käyttäjille, ja lisäksi muokattavissa yrityksen pääkäyttäjille. 

## Palauteviestit ja bugiraportit
Ohjelmiston kautta on mahdollista lähettää palautetta kehittäjille. Näitä viestejä ei tallenneta ohjelmiston tietokantaan vaan ne toimitetaan suoraan viestinä Positive Impact Finland Oy:n palautekanavaan. Palauteviestiin liitetään automaattisesti: 
- käyttäjän ID
- Yrityksen nimi
- url, josta raportoidaan
- aikaleima
- selain ja versio
- palauteviesti

Laskurin kehitysvaiheen tuotantopalvelimen osoite on syyskuusta 2021 alkaen https://app.co2roadmap.fi ja sitä ylläpitää Positive Impact Finland Oy. Käyttäjätietoihin on pääsy myös laskurin tilaajaorganisaatiolla Lapin liitolla. Tietoja käytetään vain järjestelmän kehittämiseen sekä käyttäjämäärien seurantaan, sekä hankkeen viestintään ja raportointiin siten, että yksittäisiä käyttäjiä ei voi tunnistaa. 
