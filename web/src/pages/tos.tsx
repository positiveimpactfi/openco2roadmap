import Head from "next/head";

const TOSPage = () => {
  return (
    <>
      <Head>
        <title>Käyttöehdot | Matkailun CO2-laskuri</title>
      </Head>
      <MainContent />
    </>
  );
};

const MainContent = () => {
  return (
    <main className="flex w-full flex-1 flex-col justify-between text-center">
      <div className="max-auto max-w-6xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8 xl:px-56">
        <div className="space-y-10 text-left">
          <h1 className="text-3xl font-extrabold text-gray-900">
            <span className="text-lg font-semibold">
              Matkailun CO2-laskuri:
            </span>
            <br />
            Henkilötietojen käsittelyn kuvaus ja laskurin käyttöehdot
          </h1>
          <PersonalDataSection />
          <TermsAndConditionsSection />
        </div>
      </div>
    </main>
  );
};

export default TOSPage;

export const PersonalDataSection = () => {
  return (
    <section id="personal-data-handling" className="flex flex-col space-y-6">
      <h2 className="text-base font-bold underline">
        1. Henkilötietojen käsittelyn kuvaus (pilottikäyttäjien rekisteri)
      </h2>
      <div>
        <h4 className="text-base font-bold">Rekisterin nimi</h4>
        <p>Matkailun CO2-laskurin käyttäjärekisteri (pilottikäyttäjät) </p>
      </div>
      <div>
        <h4 className="text-base font-bold">Rekisterinpitäjä</h4>
        <p>Business Finland Oy (Y-tunnus: 2725690-3)</p>
        <p>Käyntiosoite: Porkkalankatu 1, 00180 Helsinki</p>
        <p>Puhelinvaihde: 029 50 55000</p>
      </div>
      <div>
        <h4 className="text-base font-bold">Rekisterin yhteystaho</h4>
        <p>
          Pyydämme lähettämään sähköpostit osoitteeseen:
          tietosuoja@businessfinland.fi
        </p>
      </div>
      <div>
        <h4 className="text-base font-bold">
          Henkilötietojen käsittelyn tarkoitukset
        </h4>
        <p>
          Henkilötietoja käsitellään hiilijalanjälkilaskurin pilotointia varten.
          Henkilötietoja käsitellään, jotta yritysten edustajat voivat kirjautua
          sisälle järjestelmään tekemään yrityksen hiilijalanjälkilaskentaa.
        </p>
      </div>
      <div>
        <h4 className="text-base font-bold">Käsittelyn oikeusperuste</h4>
        <p>
          EU:n yleisen tietosuoja-asetuksen (679/2016) 6 artiklan 1 e-kohta:
          käsittely on tarpeen yleistä etua koskevan tehtävän suorittamiseksi ja
          tietosuojalain 4 §:n 1 momentin 2-kohta: käsittely on tarpeen ja
          oikeasuhtaista viranomaisen toiminnassa yleisen edun mukaisen tehtävän
          suorittamiseksi.
        </p>
      </div>
      <div>
        <h4 className="text-base font-bold">Kerättävät henkilötiedot</h4>
        <div className="space-y-4">
          <p>Yrityksen edustajista kerätään seuraavat tiedot:</p>
          <ul className="list-inside list-disc">
            <li>Nimi</li>
            <li>Sähköpostiosoite</li>
            <li>Rooli yrityksessä</li>
          </ul>
          <p>Yrityksistä kerätään seuraavat tiedot:</p>
          <ul className="list-inside list-disc">
            <li>Yrityksen nimi, Y-tunnus, toimialat</li>
            <li>
              Tunnusluvut (asiakasmäärät, liikevaihto, yöpymismäärät,
              työntekijämäärät, myytyjen tuotteiden määrät yms.)
            </li>
            <li>Yritykseen liitetyt käyttäjät</li>
            <li>
              Toimipaikkojen tiedot (toimipaikan nimi, tyyppi, sijaintikunta,
              rakenne)
            </li>
            <li>Kulutustiedot</li>
          </ul>
          <p>
            Rekisterissä ei käsitellä erityisiä henkilötietoryhmiä koskevia
            tietoja.
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-base font-bold">Tietojen käsittelyoikeus</h4>
        <div className="space-y-4">
          <p>
            Järjestelmään rekisteröitynyt käyttäjä pääsee itse järjestelmässä
            käsittelemään syöttämiään tietoja. Kaikki yrityksen tiedot sekä
            kaikki kulutustiedot ovat kaikkien yrityksen pääkäyttäjien
            nähtävissä ja muokattavissa.
          </p>
          <p>
            Kaikki järjestelmään syötetyt tiedot ovat tarvittaessa
            järjestelmänvalvojan nähtävillä ylläpitotehtävien suorittamista
            varten. Käyttäjien toimenpiteet laskurissa tallentuvat
            lokitiedostoon ylläpitotehtävien toteuttamista varten.
          </p>
          <p>
            Käyttäjätietoihin on pääsy myös laskurin alkuperäisellä
            tilaajaorganisaatiolla Lapin liitolla sekä 6Aika - Carbon Neutral
            Tourism -hankkeella (CNT-hanke). Tietoja käytetään vain järjestelmän
            kehittämiseen sekä käyttäjämäärien seurantaan, sekä hankkeen
            viestintään ja raportointiin siten, että yksittäisiä käyttäjiä tai
            yrityksiä ei voi tunnistaa.
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-base font-bold">
          Henkilötietojen säännönmukaiset luovutukset
        </h4>
        <div className="space-y-4">
          <p>
            Rekisteriin sisältyviä tietoja ei luovuteta säännönmukaisesti
            ulkopuolisille. Rekisterin sisältämät tiedot ovat pääosin julkisia,
            mutta yritysten kohdalla kerättäviin tietoihin voi sisältyä
            julkisuuslain 24 § :n 1 momentin 20-kohdan mukaan salassa pidettäviä
            tietoja (liikesalaisuus ja muut vastaavat yksityisen
            elinkeinotoimintaa koskevasta seikat).
          </p>
          <p>Rekisteristä ei siirretä tietoja EU:n tai ETA:n ulkopuolelle.</p>
        </div>
      </div>
      <div>
        <h4 className="text-base font-bold">Henkilötietojen säilytysajat</h4>
        <div className="space-y-4">
          <p>
            Kerättyjä henkilötietoja säilytetään hiilijalanjälkilaskurin
            pilotoinnin ajan. Hiilijalanjälkilaskuri siirtyy 1.3.2022 Business
            Finlandin hallintaan. Siirron yhteydessä tulevat voimaan uudet
            käyttöehdot ja rekisterinpitäjä vaihtuu. Asiasta tiedotetaan
            käyttäjiä ajoissa ja siten, että käyttäjä voi halutessaan pyytää
            tietojensa poistamista. Poistamista pyytäneiden käyttäjien ja
            yritysten tiedot poistetaan 28.2.2022 mennessä, ennen
            ylläpitovastuun muutoksia.
          </p>
          <p>
            Pilotoinnin ajan käyttäjän on mahdollista poistaa omat tietonsa
            lähettämällä tukipyyntö ylläpitoon. Käyttäjän järjestelmään lisäämät
            kulutustiedot tai yrityksen perustiedot eivät tässä yhteydessä
            kuitenkaan poistu. Kulutustiedot ja yrityksen perustiedot on
            mahdollista pyytää poistettavaksi hiilijalanjälkilaskurin siirtyessä
            Business Finlandin hallintaan.
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-base font-bold">Henkilötietojen tietolähteet</h4>
        <div className="space-y-4">
          <p>
            Kaikki tiedot saadaan järjestelmään rekisteröityneiltä yritysten
            edustajilta. Rekisterinpitäjä ei kerää henkilötietoa muista
            lähteistä.
          </p>
        </div>
      </div>
    </section>
  );
};

export const TermsAndConditionsSection = () => {
  return (
    <section id="terms-and-conditions" className="flex flex-col space-y-6">
      <h2 className="text-base font-bold underline">2. Käyttöehdot</h2>
      <div>
        <h4 className="text-base font-bold">
          Hiilijalanjälkilaskurin toimittaja
        </h4>
        <p>
          Laskurin kehitysvaiheen tuotantopalvelimen osoite on syyskuusta 2021
          alkaen{" "}
          <span>
            <a
              href="https://app.co2roadmap.fi"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-600"
            >
              https://app.co2roadmap.fi
            </a>
          </span>{" "}
          ja sitä ylläpitää Positive Impact Finland Oy. Laskuri on saatavilla
          1.3.2022 alkaen myös osoitteessa{" "}
          <span>
            <a
              href="https://co2calc.visitfinland.fi"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-600"
            >
              https://co2calc.visitfinland.fi
            </a>
          </span>
          .
        </p>
      </div>
      <div>
        <h4 className="text-base font-bold">Laskuriin syötettävät tiedot</h4>
        <div className="space-y-4">
          <p>
            Hiilijalanjälkilaskenta perustuu yrityksen toimipaikkarakenteeseen,
            eri päästölähteisiin liittyviin kuukausi- ja vuositason
            kulutustietoihin ja niihin liitettyihin päästökertoimiin ja
            erilaisiin tunnisteisiin. Hiilijalanjäljen tunnuslukujen laskemista
            varten laskuriin on mahdollista syöttää myös yrityksen toimintaa
            kuvaavia tunnuslukuja, kuten liikevaihto, asiakasmäärät tai hotellin
            yöpymismäärät.
          </p>
          <p>
            Käyttäjän tulee itse vastata siitä, että tämä ei syötä laskuriin
            sellaisia salassa pidettäviä tietoja, joiden päätyminen julkisuuteen
            aiheuttaisi haittaa yritykselle. Esimerkiksi liikevaihtotietoa tai
            yöpymistilastoja ei pidä kirjata laskuriin ennen kuin tieto on
            muutenkin julkinen.
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-base font-bold">Evästeiden käyttö</h4>
        <div className="space-y-4">
          <p>
            Käyttäjien tunnistaminen tapahtuu evästeiden avulla. Evästeitä ei
            käytetä käyttäjien toiminnan seuraamiseen. Jatkossa evästeet
            määrittävät myös kielivalinnan.
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-base font-bold">Korvausvastuu</h4>
        <div className="space-y-4">
          <p>
            Rekisterinpitäjä eikä laskurin tekninen ylläpitäjä eivät vastaa
            mahdollisesta vahingosta, mikä aiheutuu järjestelmän käyttöehtojen
            vastaisesta käytöstä.
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-base font-bold">
          Laskuriin syötettyjen tietojen käyttö kehittämiseen ja tilastointiin
        </h4>
        <div className="space-y-4">
          <p>
            Kerättyjä tietoja voidaan hyödyntää laskurin käytettävyyden
            parantamisessa ja jatkokehittämisessä. Käyttäjätiedoista voidaan
            muodostaa ja julkaista tilastoja jotka kertovat laskurin suosiosta,
            käytön aktiivisuudesta sekä esim. alueellisesta jakaumasta. Tilastot
            muodostetaan aina niin, etteivät yksittäiset järjestelmän käyttäjät
            ja yritykset ole niistä tunnistettavissa.
          </p>
          <p>
            Palvelun ylläpitäjällä (Positive Impact Oy) on lisäksi oikeus
            tallentaa käyttäjän toimittamat viestit ja palautteet laskurin
            käyttöä ja rekisteröitymistä koskien, palvelun laadun turvaamiseksi.
            Näitä viestejä ei tallenneta ohjelmiston tietokantaan vaan ne
            toimitetaan suoraan viestinä Positive Impact Finland Oy:n
            palautekanavaan. Palauteviestiin liitetään automaattisesti:
          </p>
          <ul className="list-inside list-disc">
            <li>Käyttäjän ID</li>
            <li>Yrityksen nimi</li>
            <li>URL, josta raportoidaan</li>
            <li>Aikaleima</li>
            <li>Selain ja versio</li>
            <li>Palauteviesti</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
