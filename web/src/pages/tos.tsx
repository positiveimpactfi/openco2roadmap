import Head from "next/head";
import { Header } from "./privacy-policy";

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
          <Header />
          <h1 className="text-3xl font-extrabold text-gray-900">
            Matkailun CO2-laskurin käyttöehdot
          </h1>
          <div className="flex flex-col space-y-6">
            <Foreword />
            <General />
            <ImmaterialRights />
            <Registration />
            <ServiceContent />
            <ContentRights />
            <UseOfContent />
            <Responsibility />
            <DataCollection />
            <Cookies />
            <ForceMajeure />
            <Changes />
            <Applicability />
          </div>
        </div>
      </div>
    </main>
  );
};

export default TOSPage;

const Foreword = () => {
  return (
    <div className="space-y-4">
      <p>
        {" "}
        Nämä palveluehdot (“Ehdot”) sääntelevät rekisteröitymistäsi Matkailun
        CO2-laskurin käyttäjäksi sekä laskurin käyttöä, sähköposti-ilmoituksia,
        sovelluksia, painikkeita ja muita toiminnollisuuksia (yhdessä,
        “Palvelut”) sekä kaikkia Palveluihin ladattuja, sieltä koneelle
        ladattavia tai Palveluissa esiintyviä tietoja, tekstiä, grafiikoita,
        valokuvia tai muita aineistoja (yhdessä jäljempänä “Sisältö”). Pääsysi
        Palveluihin sekä niiden käyttäminen edellyttää, että olet hyväksynyt
        nämä Ehdot ja noudatat niitä. Avaamalla Palvelut tai käyttämällä niitä,
        sitoudut noudattamaan näitä Ehtoja.
      </p>
      <p>
        Palvelua hallinnoi Business Finland Oy, Porkkalankatu 1, PL 358, 00181
        Helsinki (“Business Finland/Visit Finland”).
      </p>
      <p>Palvelun tekninen ylläpitäjä on Positive Impact Finland Oy.</p>
    </div>
  );
};

const General = () => {
  return (
    <section id="general" className="space-y-2">
      <h2 className="text-base font-bold">Yleistä</h2>
      <div className="space-y-4">
        <p>
          Käyttäessäsi Palveluja hyväksyt nämä Ehdot edustamasi organisaation
          puolesta ja vahvistat, että sinulla on oikeus tehdä näin. Samalla
          edustamasi organisaatio sitoutuu noudattamaan näitä Ehtoja.
        </p>
        <p>
          Palvelujen muoto ja luonne voi ajoittain muuttua ilman
          etukäteisilmoitusta sinulle. Business Finland/Visit Finland voi myös
          muuttaa Palveluun rekisteröitymisen ja käytönrekisteröitymisen
          vaatimuksia ja sillä on aina oikeus pyytää todisteita siitä, että
          vaatimukset on täytetty.
        </p>
        <p>
          Lisäksi Business Finland/Visit Finland voi lopettaa (pysyvästi tai
          väliaikaisesti) Palvelujen (tai Palvelujen jonkin ominaisuuden)
          tarjoamisen sinulle tai käyttäjille yleisesti eikä se välttämättä
          pysty ilmoittamaan sinulle asiasta etukäteen. Oman harkintansa
          puitteissa, Business Finland/Visit Finland myös pidättää oikeuden
          asettaa rajoituksia Palveluiden käytölle ja tallentamiselle milloin
          tahansa ilman ennakkoilmoitusta sinulle.
        </p>
        <p>
          Business Finland/Visit Finland kehittää CO2-laskuria harkintansa
          mukaan jatkuvasti, ja voi esimerkiksi saattaa CO2-laskurin osaksi
          muita tarjoamiaan palveluja. Tarkoitus on, että Palvelu tarjotaan
          yhtenä osana laajempaa Sustainable Travel Finland -alustan kautta
          matkailuelinkeinolle tarjottavaa palvelukokonaisuutta.
        </p>
        <p>
          Business Finland/Visit Finland voi siirtää Matkailun CO2-laskurin,
          mukaan lukien Sisällön, kolmansille osapuolille, jotka jatkaisivat
          Palveluiden tarjoamista Business Finland/Visit Finlandin sijasta.
        </p>
      </div>
    </section>
  );
};

const ImmaterialRights = () => {
  return (
    <section id="immaterial-rights" className="space-y-2">
      <h2 className="text-base font-bold">Immateriaalioikeudet</h2>
      <div className="space-y-4">
        <p>
          CO2-laskuri hyödyntää avointa lähdekoodia osoitteessa{" "}
          <span>
            <a
              href="https://co2calc.visitfinland.fi/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-600"
            >
              https://co2calc.visitfinland.fi/
            </a>
          </span>{" "}
          esitettyjen tietojen ja ehtojen mukaisesti.
        </p>
        <p>
          Muilta osin oikeudet Palveluihin (pois lukien toimittamaasi Sisältöön)
          ovat ja pysyvät Business Finland/Visit Finlandin ja sen
          lisenssinantajien yksinomaisena omaisuutena.
        </p>
        <p>
          Sinulla ei ole oikeutta käyttää tai toisintaa tai myöntää kolmansille
          osapuolille oikeutta käyttää tai toisintaa Business Finland/Visit
          Finlandin tai sen lisenssinantajien tavaramerkkejä ilman Business
          Finland/Visit Finlandin etukäteen antamaa kirjallista lupaa.
        </p>
      </div>
    </section>
  );
};

const Registration = () => {
  return (
    <section id="registration-and-passwords" className="space-y-2">
      <h2 className="text-base font-bold">Rekisteröityminen ja salasanat </h2>
      <div className="space-y-4">
        <p>
          Palvelun käyttäjäksi voi rekisteröityä useampia henkilöitä saman
          organisaation puolesta. Palvelussa on eri käyttäjätasoja kuten
          pääkäyttäjät ja muut käyttäjät.
        </p>
        <p>
          Vastaat itse käyttäjätunnustasi ja/tai salasanaasi käyttäen
          tapahtuvasta Palvelujen käytöstä tai Sisällön toimittamisesta. Sinun
          on ilmoitettava välittömästi Business Finland/Visit Finlandille,
          mikäli tietoosi tulee käyttäjätunnuksesi, salasanasi tai
          sähköpostiosoitteesi tai Sisällön tai sen osan katoaminen,
          varastaminen tai luvaton käyttö.
        </p>
        <p>
          Olet vastuussa Palvelujen käyttämiseksi käyttämäsi salasanan
          suojaamisesta sekä kaikista salasanallasi toteutetuista toimista tai
          toimenpiteistä. Kehotamme sinua käyttämään tilisi yhteydessä “vahvoja”
          salasanoja (salasanoja, joissa on yhdistelmä isoja ja pieniä
          kirjaimia, numeroita ja merkkejä). Business Finland/Visit Finland ei
          voi olla eikä ole vastuussa mistään tappioista tai vahingoista, jotka
          aiheutuvat siitä, että laiminlyöt edellä todettua.
        </p>
        <p>
          Business Finland/Visit Finlandilla voi tarpeen vaatiessa sulkea
          rekisteröitymisesi eli profiilisi ja täten pääsyn CO2-laskuriin ilman
          ennakkovaroitusta.
        </p>
      </div>
    </section>
  );
};

const ServiceContent = () => {
  return (
    <section id="service-content" className="space-y-2">
      <h2 className="text-base font-bold">Palveluiden Sisältö </h2>
      <div className="space-y-4">
        <p>
          Yrityksen hiilijalanjälkilaskenta Palvelun avulla perustuu yrityksen
          toimipaikkarakenteeseen, eri päästölähteisiin liittyviin kuukausi- ja
          vuositason kulutustietoihin ja niihin liitettyihin päästökertoimiin ja
          erilaisiin tunnisteisiin. Hiilijalanjäljen tunnuslukujen laskemista
          varten CO2-laskuriin on mahdollista syöttää myös yrityksen toimintaa
          kuvaavia tunnuslukuja, kuten liikevaihto, asiakasmäärät tai hotellin
          yöpymismäärät.
        </p>
        <p>
          Sinä tietojen syöttäjänä ja edustamasi yritys olette vastuussa siitä,
          ettei CO2-laskuriin syötetä sellaisia salassa pidettävää Sisältöä,
          joiden päätyminen julkisuuteen aiheuttaisi haittaa yritykselle.
          Esimerkiksi liikevaihtotietoa tai yöpymistilastoja ei tule kirjata
          laskuriin ennen kuin tieto on muutenkin julkinen.
        </p>
        <p>
          Velvollisuutenasi on varmistaa, että kaikki toimittamasi Sisältö on
          paikkansapitävää ja sinun tulee viipymättä päivittää tai poistaa
          kaikki sellainen Sisältö, joka ei enää ole paikkansapitävää tai
          ajankohtaista.
        </p>
      </div>
    </section>
  );
};

const ContentRights = () => {
  return (
    <section id="content-rights" className="space-y-2">
      <h2 className="text-base font-bold">Oikeudet Sisältöön </h2>
      <div className="space-y-4">
        <p>
          Edustamasi yritys säilyttää oikeudet kaikkeen Palvelun kautta
          toimittamaasi, julkaisemaasi tai näyttämääsi Sisältöön. Hyväksyt sen,
          että Business Finland/Visit Finland voi tarvittaessa muokata
          toimittamaasi Sisältöä Palvelun sisällä. Hyväksyt sen, että Business
          Finland/Visit Finland voi hyödyntää Sisältöäsi tilastoinnissa ja
          julkaisuissaan alla kohdassa Sisällön käyttö kuvatulla tavalla.
        </p>
        <p>
          Toimita vain sellaista Sisältöä, jota sinulla on oikeudellisesti lupa
          jakaa ja jota sinua myös muutoin ei haittaa jakaa toisten kanssa
          näiden Ehtojen mukaisesti. Hyväksymällä ehdot vakuutat ja takaat, että
          sinulla on kaikki oikeudet, toimivalta ja luvat toimittaa Sisältöä.
        </p>
      </div>
    </section>
  );
};

const UseOfContent = () => {
  return (
    <section id="use-of-content" className="space-y-2">
      <h2 className="text-base font-bold">Sisällön käyttö </h2>
      <div className="space-y-4">
        <h4 className="underline">Kuka tahansa rekisteröitynyt käyttäjä</h4>
        <p>
          Palvelun kautta kuka tahansa rekisteröitynyt käyttäjä voi tarkastella
          järjestelmän yleisiä, kaikkien yritysten käytössä olevia
          päästökertoimia.
        </p>
      </div>
      <div className="space-y-4">
        <h4 className="underline">
          Yrityksen puolesta rekisteröityneet käyttäjät
        </h4>
        <p>
          Palveluun rekisteröitynyt käyttäjä pääsee käsittelemään kaikkia itse
          syöttämiään tietoja. Lisäksi kaikki yrityksen tiedot, yrityksen omat
          päästökertoimet sekä kaikki kulutustiedot ovat yrityksen kaikkien
          pääkäyttäjien nähtävissä ja muokattavissa.
        </p>
      </div>
      <div className="space-y-4">
        <h4 className="underline">
          Matkailudestinaatioita edustavat organisaatiot
        </h4>
        <p>
          Lapin liitolla on pääsy laskurin käyttäjätietoihin. Business
          Finland/Visit Finland voi antaa myös muille matkailudestinaatioita
          edustaville organisaatioille pääsyn käyttäjätietoihin.
        </p>
      </div>
      <div className="space-y-4">
        <h4 className="underline">
          Business Finland/Visit Finland ja tekninen ylläpito
        </h4>
        <p>
          Palvelun omistajalla Business Finlandilla on pääsy kaikkiin tietoihin.
          Kaikki järjestelmään syötetyt tiedot ovat tarvittaessa myös teknisen
          järjestelmänvalvojan nähtävillä ylläpitotehtävien suorittamista
          varten.
        </p>
        <p>
          Laskurin käyttäjätietoja käytetään järjestelmän kehittämiseen sekä
          käyttäjämäärien seurantaan, sekä hankkeen viestintään ja raportointiin
          siten, että yksittäisiä käyttäjiä tai yrityksiä ei voi tunnistaa.
        </p>
        <p>
          Kerättyjä tietoja voidaan hyödyntää laskurin käytettävyyden
          parantamisessa ja jatkokehittämisessä. Tiedoista voidaan muodostaa ja
          julkaista tilastoja, jotka kertovat laskurin suosiosta, käytön
          aktiivisuudesta sekä esimerkiksi alueellisesta jakaumasta. Myös
          yritysten laskentatuloksia voidaan siten hyödyntää alueellisen tai
          kansallisen tason tilastoinnissa ja ne voidaan julkaista. Tilastot
          muodostetaan aina niin, etteivät yksittäiset järjestelmän käyttäjät ja
          yritykset ole niistä tunnistettavissa.
        </p>
        <p>
          Henkilötietojen käsittely on kuvattu tarkemmin CO2 -laskurin
          käyttäjärekisterin rekisteriselosteessa.
        </p>
      </div>
    </section>
  );
};

const Responsibility = () => {
  return (
    <section id="responsibility" className="space-y-2">
      <h2 className="text-base font-bold">Vastuu ja vahingonkorvaus </h2>
      <div className="space-y-4">
        <p>
          Business Finland/Visit Finland tarjoaa Palvelut &apos;sellaisena kuin
          ne ovat&apos; -periaatteella.
        </p>
        <p>
          Business Finland/Visit Finland ei anna mitään nimenomaisia tai
          implisiittisiä takuita koskien Palveluja, Sisältöä tai mitään
          ohjelmistoa, joka toimitetaan “sellaisena kuin se on” –periaatteella.
        </p>
        <p>
          Business Finland/Visit Finland ja tämän alihankkijat sulkee
          nimenomaisesti pois kaikki takuut, mukaan lukien, rajoituksetta,
          takuut koskien soveltuvuutta tiettyyn käyttötarkoitukseen sekä
          myyntikelpoisuutta koskevat takuut. Missään tapauksessa Business
          Finland/Visit Finland ja sen alihankkijat tai lisenssinantajat eivät
          ole vastuussa mistään välillisistä, erityisistä, satunnaisista ja/tai
          seuraamusluonteisista vahingoista (mukaan lukien, rajoituksetta,
          vahingot liittyen liiketoiminnan voittojen menetykseen, liiketoiminnan
          keskeytymiseen, liiketoimintatietojen menetykseen tai muuhun
          taloudelliseen tappioon), jotka mahdollisesti aiheutuvat suoraan tai
          välillisesti Palvelujen käytöstä (tai siitä että niitä ei ole voitu
          käyttää) tai Palveluihin turvautumisesta, siinäkään tapauksessa, että
          Business Finland/Visit Finlandille on ilmoitettu tällaisten vahinkojen
          aiheutumisen mahdollisuudesta. Business Finland/Visit Finland ei takaa
          Palveluiden tai Sisällön paikkansapitävyyttä, sisältöä tai
          oikea-aikaisuutta eikä sitä, että ne ovat viruksista tai muista
          saastuttavista tai tuhoisista ominaisuuksista vapaita.
        </p>
        <p>
          Business Finland/Visit Finland eivät missään tapauksessa ole millään
          tavalla vastuussa Sisällöstä, mukaan lukien, rajoituksetta, Sisällön
          virheistä tai puutteista, tai mistään tappioista tai vahingoista,
          jotka aiheutuvat Palveluissa julkaistun, sähköpostilla lähetetyn,
          välitetyn tai muutoin Palveluissa saatavilla olevan Sisällön käytöstä.
        </p>
        <p>
          Business Finland/Visit Finland ei ole missään tapauksessa vastuussa
          muiden Palvelua käyttävien organisaatioiden käyttäytymisestä tai
          linkitettyjen ulkopuolisten verkkosivustojen sisällöstä.
        </p>
      </div>
    </section>
  );
};

const DataCollection = () => {
  return (
    <section id="data-collection" className="space-y-2">
      <h2 className="text-base font-bold">
        Henkilötietojen kerääminen ja käyttö{" "}
      </h2>
      <div className="space-y-4">
        <p>
          Business Finland/Visit Finland noudattaa tietosuojamääräyksiä
          käsitellessään henkilötietoja. Vakuutat ja vastaat siitä, että sinulla
          on kaikki tarvittavat oikeudet, toimivalta ja lupa toimittaa Sisältöön
          mahdollisesti sisältyvät henkilötiedot ja että rekisteröity henkilö on
          tietoinen häntä koskevien tietojen käsittelystä.
        </p>
        <p>
          Kuvaus henkilötietojen käsittelystä ja rekisteröityjen henkilöiden
          (=rekisteröity) oikeuksista löytyy erillisestä{" "}
          <span>
            <a
              href="https://co2calc.visitfinland.fi/privacy-policy/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-900 hover:text-gray-600"
            >
              tietosuojaselosteesta.
            </a>
          </span>
        </p>
      </div>
    </section>
  );
};

const Cookies = () => {
  return (
    <section id="cookies" className="space-y-2">
      <h2 className="text-base font-bold">Evästeet</h2>
      <div className="space-y-4">
        <p>
          Käyttäessäsi Palvelua sivusto tallentaa päätelaitteellesi evästeitä.
          Tämän Palvelun käyttöön liittyvät evästeet ovat teknisiä evästeitä,
          jotka ovat tarpeellisia Palvelun toimivuuden kannalta. Evästeitä
          käytetään esimerkiksi käyttäjien tunnistamiseen ja kielivalintaan.
          Evästeitä ei käytetä käyttäjien toiminnan seuraamiseen.
        </p>
      </div>
    </section>
  );
};

const ForceMajeure = () => {
  return (
    <section id="force-majeure" className="space-y-2">
      <h2 className="text-base font-bold">Ylivoimainen este</h2>
      <div className="space-y-4">
        <p>
          Business Finland/Visit Finland ei vastaa vaikutusvaltansa ulkopuolella
          olevista olosuhteista, mukaan lukien, rajoituksetta, sähköisten tai
          mekaanisten laitteiden tai tietoliikenneyhteyksien toimintahäiriöt,
          puhelin- tai muut yhdistämisongelmat, tietokonevirukset, luvaton
          pääsy, varkaus, operaattorin virheet, äärimmäiset sääolosuhteet,
          maanjäristykset tai luonnonmullistukset, lakot ja muut
          työvoimaongelmat, sodat tai hallituksen tai viranomaisten asettamat
          rajoitukset.
        </p>
      </div>
    </section>
  );
};

const Changes = () => {
  return (
    <section id="change-of-tos" className="space-y-2">
      <h2 className="text-base font-bold">Näiden Ehtojen muuttaminen</h2>
      <div className="space-y-4">
        <p>
          Business Finland/Visit Finland voi harkintansa mukaan muuttaa näitä
          Ehtoja. Jos Ehtoja muutetaan, Business Finland/Visit Finland julkaisee
          muutetut ehdot verkkosivustolla. Mikäli käytät Palveluja ja/tai
          Sisältöä sen jälkeen, kun Business Finland/Visit Finland on julkaissut
          muutetut ehdot, sitoudut noudattamaan kyseisiä muutoksia. Mikäli et
          sitoudu noudattamaan kyseisiä muutoksia, sinun ei tulisi käyttää
          Palveluja ja/tai Sisältöä enää sen jälkeen, kun muutokset on
          julkaistu.
        </p>
        <p>
          Business Finland/Visit Finland voi harkintansa mukaan lopettaa tai
          keskeyttää pääsysi Palveluihin ja/tai Sisältöön milloin tahansa syystä
          tai ilman syytä, ilmoittamalla asiasta sinulle.
        </p>
        <p>
          Nämä oikeudet täydentävät muita Business Finland/Visit Finlandin
          käytössä olevia näihin Ehtoihin tai lakiin perustuvia oikeuksia ja
          oikeussuojakeinoja.
        </p>
      </div>
    </section>
  );
};

const Applicability = () => {
  return (
    <section id="applicability" className="space-y-2">
      <h2 className="text-base font-bold">Sovellettava laki ja oikeuspaikka</h2>
      <div className="space-y-4">
        <p>
          Kaikkiin vaateisiin ja erimielisyyksiin Business Finland/Visit
          Finlandin ja sinun välillä, jotka aiheutuvat näistä Käyttöehdoista
          ja/tai Palvelujen ja/tai Sisällön käytöstäsi tai jollakin tavalla
          liittyvät niihin, sovelletaan Suomen lakia, pois lukien sen
          lainvalintasäännökset. Kaikki vaateet ja/tai erimielisyydet tulee
          jättää Helsingin käräjäoikeuden ratkaistaviksi. Mikäli kuitenkin oma
          kotipaikkasi sijaitsee tai edustat EU/ETA –alueen ulkopuolella
          kotipaikkansa omaavaa yhteisöä, Business Finland/Visit Finlandilla on
          oikeus esittää vaatimuksia sinun/edustamasi yhteisön kotipaikan
          paikallisten tuomioistuinten lainkäyttöalueella.
        </p>
      </div>
    </section>
  );
};
