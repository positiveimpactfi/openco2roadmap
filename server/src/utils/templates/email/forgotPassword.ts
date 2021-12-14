import config from "../../../config";

export const forgotPasswordEmail = (
  email: string,
  token: string
): { text: string; html: string } => {
  const html = `
    <div>
      <div>Hei,</div>
      <br />
      <div>saimme pyynnön asettaa uusi salasana käyttäjätilillesi ${email}. Jos pyyntö oli tarpeeton tai et itse edes lähettänyt sitä, voit vain unohtaa tämän viestin. Mitään ei tule tapahtumaan.</div>
      <br />
      <div>Jos haluat asettaa uuden salasanan, piipahda seuraavassa osoitteessa:</div>
      <br />
      <div><span><a href="${config.CORS_ORIGIN}/change-password/${token}">Nollaa salasanasi</a></span></div>
      <br />
      <div>Linkki on voimassa kolme päivää.</div> 
      <br />
      <div>Pääset kirjautumaan laskuriin osoitteessa <span><a href="https://app.co2roadmap.fi">https://app.co2roadmap.fi/</a></span></div>
      <br />
      <div>Ystävallisin terveisin</div>
      <div>Matkailun CO2-laskurin tiimi</div>
    </div
    `;
  const text = `Hei, saimme pyynnön asettaa uusi salasana käyttäjätilillesi ${email}. Jos pyyntö oli tarpeeton tai et itse edes lähettänyt sitä, voit vain unohtaa tämän viestin. Mitään ei tule tapahtumaan.
    Jos haluat asettaa uuden salasanan, piipahda seuraavassa osoitteessa: ${config.CORS_ORIGIN}/change-password/${token}.
    Linkki on voimassa kolme päivää.
    Pääset kirjautumaan laskuriin osoitteessa https://app.co2roadmap.fi.
    Ystävällisin terveisin
    Matkailun CO2-laskurin tiimi
    `;
  return { text, html };
};
