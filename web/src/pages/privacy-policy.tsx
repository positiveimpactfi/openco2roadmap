import Head from "next/head";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Head>
        <title>Tietosuojaseloste | Matkailun CO2-laskuri</title>
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
          <Header />
          <h1 className="text-3xl font-extrabold text-gray-900">
            Matkailun CO2-laskurin tietosuojaseloste
          </h1>
          <p>Laadittu 10.3.2022</p>
          <PrivacyPolicySection />
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;

export const Header = () => {
  return (
    <header className="text-lg font-semibold leading-8">
      <p>
        Matkailun CO2-laskuri on digitaalinen palvelu, jolla matkailualan yritys
        voi laskea yrityksen hiilijalanjäljen ja kartoittaa suurimmat
        päästölähteet.
      </p>
      <p className="mt-4">
        Matkailun CO2-laskuri löytyy osoitteesta{" "}
        <span>
          <a
            href="https://co2calc.visitfinland.fi/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-600"
          >
            https://co2calc.visitfinland.fi/
          </a>
        </span>
      </p>
    </header>
  );
};

export const PrivacyPolicySection = () => {
  return (
    <section className="flex flex-col space-y-6">
      <div>
        <h2 className="text-base font-bold ">1. Rekisterinpitäjä</h2>
        <p>Business Finland Oy (Y-tunnus: 2725690-3)</p>
        <p>Käyntiosoite: Porkkalankatu 1, 00180 Helsinki</p>
        <p>Puhelinvaihde: 029 50 55000</p>
      </div>
      <div>
        <h2 className="text-base font-bold">2. Yhteystaho</h2>
        <p>
          Pyydämme lähettämään sähköpostit osoitteeseen:{" "}
          <span>
            <a href="mailto:tietosuoja@businessfinland.fi">
              tietosuoja@businessfinland.fi
            </a>
          </span>
        </p>
      </div>
      <div>
        <h2 className="text-base font-bold">3. Rekisterin nimi</h2>
        <p>Matkailun CO2-laskurin käyttäjärekisteri (pilottikäyttäjät) </p>
      </div>
      <div>
        <h2 className="text-base font-bold">
          4. Henkilötietojen käsittelyn tarkoitus ja käsittelyperuste{" "}
        </h2>
        <table className="my-4 divide-y divide-gray-300">
          <thead>
            <tr className="divide-x divide-gray-200">
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Rekisteröityjen ryhmä
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Tietojen käyttötarkoitus
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Käsittelyperuste
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr className="divide-x divide-gray-200">
              <td className="whitespace-normal py-4 pl-4 pr-4 text-sm font-medium text-gray-500 sm:pl-6">
                CO2-laskuriin rekisteröityneiden organisaatioiden edustajat
              </td>
              <td className="whitespace-normal p-4 text-sm text-gray-500">
                Henkilötietoja käsitellään hiilijalanjälkilaskurin pilotointia
                ja käyttöä varten,
                <ul className="list-inside list-disc">
                  <li>
                    jotta yritysten edustajat voivat kirjautua sisälle
                    järjestelmään tekemään yrityksen hiilijalanjälkilaskentaa
                  </li>
                  <li>
                    jotta rekisteröidylle henkilölle voidaan lähettää
                    uudistamisilmoituksia ja/tai palveluilmoituksia
                  </li>
                  <li>asiakastyytyväisyyskyselyiden suorittamiseksi</li>
                  <li>
                    laskurin tekniseen ylläpitoon, kehittämiseen ja
                    käytettävyyden parantamiseen sekä raportointiin
                  </li>
                </ul>
              </td>
              <td className="whitespace-nowrap p-4 text-sm text-gray-500 sm:pr-6">
                Sopimus, oikeutettu etu
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Käsittelytehtäviä voidaan antaa ulkopuolisten palveluntarjoajien
          suoritettaviksi tietosuojalainsäädännön ja sen asettamien reunaehtojen
          mukaisesti. Palvelun tekninen ylläpito on ulkoistettu Positive Impact
          Finland Oy:lle.
        </p>
      </div>
      <div className="space-y-2">
        <h2 className="text-base font-bold">5. Rekisterin tietosisältö</h2>
        <div>
          <h3 className="font-medium">5.1 Käyttäjän antamat tiedot</h3>
          <div className="mt-4 space-y-4">
            <div>
              <p>
                Organisaation edustaja antaa rekisteröitymisensä yhteydessä
                seuraavat tiedot:
              </p>
              <ul className="list-inside list-disc">
                <li>Nimi</li>
                <li>Sähköpostiosoite</li>
                <li>Rooli yrityksessä</li>
              </ul>
            </div>
            <div>
              <p>Yrityksistä kerätään seuraavat tiedot:</p>
              <ul className="list-inside list-disc">
                <li>Yrityksen nimi, Y-tunnus, toimialat</li>
                <li>
                  Tunnusluvut (asiakasmäärät, liikevaihto, yöpymismäärät,
                  työntekijämäärät, myytyjen tuotteiden määrät yms.)
                </li>
                <li>Yritykseen liitetyt käyttäjät</li>
                <li>
                  Toimipaikkojen tiedot (toimipaikan nimi, tyyppi,
                  sijaintikunta, rakenne)
                </li>
                <li>Kulutustiedot</li>
              </ul>
            </div>
            <p>
              Lisäksi Palvelun käyttäjä voi antaa palvelun tekniselle
              ylläpitäjälle palautetta suoraan tämän palvelukanavaan Palvelun
              omien viestilomakkeiden kautta.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">
            5.2 Palvelun käytön yhteydessä syntyvät tiedot{" "}
          </h3>
          <div>
            <p>
              Palvelun käyttöön liittyen tallennetaan ja kerätään palvelun
              tunnistamis- ja käyttäjätietoja verkkopalvelun mahdollistamiseksi
              ja kehittämiseksi:
            </p>
            <ul className="list-inside list-disc">
              <li>käyttäjän ID, salasana ja käyttäjälokitiedot</li>
              <li>
                teknisen ylläpitäjän palautekanavaan lähetettyihin viesteihin
                liittyvät tekniset tiedot:
                <ul className="ml-8 list-inside list-[circle]">
                  <li>Käyttäjän ID</li>
                  <li>Yrityksen nimi</li>
                  <li>URL, josta raportoidaan</li>
                  <li>Aikaleima</li>
                  <li>Selain ja versio</li>
                  <li>Palauteviesti</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">5.3 Anonyymi raportointi</h3>
          <p>
            Käyttäjätiedoista voidaan muodostaa ja julkaista tilastoja, jotka
            kertovat laskurin suosiosta, käytön aktiivisuudesta sekä esim.
            alueellisesta jakaumasta. Tilastot muodostetaan aina niin, etteivät
            yksittäiset järjestelmän käyttäjät ja yritykset ole niistä
            tunnistettavissa.
          </p>
          <p>
            Rekisterissä ei käsitellä erityisiä henkilötietoryhmiä koskevia
            tietoja.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-base font-bold">6. Henkilötietojen säilytysaika</h2>
        <div className="space-y-4">
          <p>
            Rekisteröidyn itsensä vastuulla on viipymättä päivittää tai poistaa
            kaikki sellainen sisältö, joka ei enää ole voimassa olevaa tai
            ajankohtaista.
          </p>
          <p>
            Rekisterinpitäjällä on oikeus poistaa henkilötiedot rekisteristä
            viimeistään, mikäli yhteyshenkilön edustaman organisaation tietoja
            ei ole päivitetty viiteen vuoteen.
          </p>
          <p>
            Poistaminen tapahtuu poistamalla tiedot kokonaisuudessaan,
            muuttamalla tiedot passiivisiksi niin, että tietoja ei enää
            käsitellä ja pääsy tietoihin on rajoitettu, käyttämällä salausta tai
            ylikirjoitusta.
          </p>
        </div>
        <p>
          Henkilötietoja käsitellään hiilijalanjälkilaskurin pilotointia varten.
          Henkilötietoja käsitellään, jotta yritysten edustajat voivat kirjautua
          sisälle järjestelmään tekemään yrityksen hiilijalanjälkilaskentaa.
        </p>
      </div>
      <div>
        <h2 className="text-base font-bold">7. Säännönmukaiset tietolähteet</h2>
        <p>
          Tiedot antaa yhteyshenkilö itse, joka rekisteröityy Palvelun
          käyttäjäksi.
        </p>
      </div>
      <div>
        <h2 className="text-base font-bold">
          8. Tietojen säännönmukaiset luovutukset ja tietojen siirto EU:n tai
          ETA-alueen ulkopuolelle{" "}
        </h2>
        <div className="space-y-4">
          <p>
            Tietoja voidaan luovuttaa matkailudestinaatioita edustaville
            organisaatioille. Myös palveluun kirjautuneet yritysten edustajat
            näkevät oman yrityksensä muita käyttäjiä koskevia tietoja. Palveluun
            voidaan kirjautua mistä tahansa maantieteellisestä paikasta.{" "}
          </p>

          <p>
            Palvelun tunnistamis- ja käyttäjätietoja (käyttäjätunnuksia,
            salasanoja tai lokitietoja) ei luovuteta kolmansille osapuolille.
          </p>

          <p>
            Tietoja voidaan luovuttaa myös Innovaatiorahoituskeskus Business
            Finlandia ja Business Finland Oy:tä koskevan lain (1146/2017)
            puitteissa Innovaatiorahoituskeskus Business Finlandille sekä
            Yrityspalvelujen asiakastietojärjestelmästä annetun lain (293/2017)
            perusteella laissa tarkoitetuille toimijoille.{" "}
          </p>

          <p>
            Business Finland Oy voi siirtää henkilötietoja EU:n ja Euroopan
            talousalueen ulkopuolelle vain tietosuojalainsäädännön mukaisesti ja
            sen asettamissa rajoissa Business Finlandin omassa
            ulkomaanverkostossa työskenteleville työntekijöille, Business
            Finland Oy:n tytäryhtiöille ja alihankkijoille sekä tietojen
            käsittelyssä käyttämilleen palveluntarjoajille.
          </p>

          <p>Tietoja säilytetään Suomessa sijaitsevalla palvelimella.</p>
        </div>
      </div>
      <div>
        <h2 className="text-base font-bold">
          9. Rekisterin suojaamisen periaatteet{" "}
        </h2>
        <p>
          Pääsy henkilötietojen hallinnointiin annetaan ainoastaan nimetyille
          henkilöille ja pääsy suojataan käyttäjänimellä ja salasanalla.
        </p>
      </div>
      <div>
        <h2 className="text-base font-bold">10. Automatisoitu päätöksenteko</h2>
        <p>
          Rekisterin tietoja ei käytetä sellaiseen päätöksentekoon, jolla on
          oikeudellisia vaikutuksia henkilöön ja joka perustuu automatisoituun
          tiedonkäsittelyyn, kuten profilointiin.
        </p>
      </div>
      <div>
        <h2 className="text-base font-bold">
          11. Rekisteröidyn muut henkilötietojen käsittelyyn liittyvät oikeudet{" "}
        </h2>
        <div className="mt-4 space-y-2">
          <div className="space-y-4">
            <h4 className="font-medium underline">
              Rekisteröidyn oikeus saada pääsy tietoihin (Pääsyoikeus){" "}
            </h4>
            <p>
              Rekisteröidyllä on oikeus tarkistaa mitä häntä koskevia tietoja
              rekisterissä säilytetään. Paitsi mikäli henkilöllä on itsellään
              pääsy tietoihin Palvelun kautta, pääsyoikeutta koskeva pyyntö
              tulee toimittaa tässä tietosuojailmoituksessa esitettyjä ohjeita
              noudattaen. Pääsyoikeus voidaan evätä laissa esitetyillä
              perusteilla. Lähtökohtaisesti pääsyoikeuden käyttäminen
              tavanomaisella tavalla on maksutonta.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium underline">
              Rekisteröidyn oikeus vaatia tietojen oikaisua tai poistamista tai
              käsittelyn rajoittamista
            </h4>
            <p>
              Siltä osin kuin rekisteröity pystyy toimimaan itse, rekisteröidyn
              tulee ilman mitään aiheetonta viivytystä tultuaan tietoiseksi
              virheestä tai havaittuaan virheen itse, oikaista, poistaa tai
              täydentää jotakin rekisterissä olevaa tietoa, joka on rekisterin
              tarkoituksen vastainen, virheellinen, tarpeeton, puutteellinen tai
              vanhentunut.
            </p>
            <p>
              Mikäli rekisteröity ei pysty korjaamaan tietoja itse,
              oikaisupyyntö tulee toimittaa tämän tietosuojailmoituksen kohdan
              12 mukaisesti.
            </p>
            <p>
              Rekisteröidyllä on lisäksi oikeus vaatia rekisterinpitäjää
              rajoittamaan henkilötietojensa käsittelyä, esimerkiksi
              tilanteessa, jossa rekisteröity odottaa rekisterinpitäjän
              vastausta henkilötietojensa oikaisua tai poistamista koskevaan
              pyyntöön.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium underline">
              Rekisteröidyn oikeus tehdä valitus valvontaviranomaiselle{" "}
            </h4>
            <p>
              Rekisteröidyllä on oikeus tehdä valitus toimivaltaiselle
              valvontaviranomaiselle, mikäli rekisterinpitäjä ei ole noudattanut
              toiminnassaan sovellettavia tietosuojamääräyksiä.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-base font-bold">12. Yhteystiedot</h2>
        <div className="space-y-4">
          <p>
            Kaikissa henkilötietojen käsittelyä koskevissa kysymyksissä ja
            rekisteröidyn oikeuksien käyttämistä koskevissa tilanteissa
            rekisteröidyn tulisi olla yhteydessä rekisterinpitäjään.
            Rekisteröity voi käyttää oikeuksiaan ottamalla yhteyttä osoitteeseen{" "}
            <span>
              <a href="mailto:tietosuoja@businessfinland.fi">
                tietosuoja@businessfinland.fi
              </a>
              .
            </span>
          </p>
          <p>
            Seuraamme tietosuojalainsäädännön muutoksia sekä haluamme kehittää
            toimintaamme jatkuvasti, ja pidätämme siksi oikeuden päivittää tätä
            tietosuojaselostetta.
          </p>
        </div>
      </div>
    </section>
  );
};
