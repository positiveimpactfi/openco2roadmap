import config from "../../../config";
import { Organization, User } from "../../../entity";

export const userCreatedEmail = (
  inviter: User,
  newAccount: User,
  org: Organization,
  password: string
): string => {
  return `
    <div>
    <div>Hei,</div>
    <br/>
    <div>${
      org.name
    } on ottanut matkailualan avoimen hiilijalanjälkilaskurin käyttöön, ja ${
    inviter.firstName && inviter.lastName
      ? inviter.firstName + " " + inviter.lastName
      : inviter.email
  } on nyt luonut sinulle käyttäjätunnuksen.</div>
    <br/>
    <div>Voit kirjautua laskuriin seuraavilla tiedoilla:</div>
    <div>Käyttäjätunnus: ${newAccount.email} </div>
    <div>Salasana: ${password} </div>
    <div>Kirjautumissivun osoite: <span><a href="${config.CORS_ORIGIN}/login">${
    config.CORS_ORIGIN
  }/login</a></span> </div>
    <br/>
    <div>Suosittelemme, että käyt vaihtamassa salasanasi <span><a href="${
      config.CORS_ORIGIN
    }/forgot-password">Uusi salasanasi -sivun</a></span> kautta. Salasanan uusimislinkki löytyy myös kirjautumissivulta. </div> 
    <br />
    <div>Jos sinulla on kysyttävää asiasta, voit olla yhteydessä kutsun lähettäjään sähköpostiosoitteella ${
      inviter.email
    }.</div>
    <div>Saat lisätietoja laskurista osoitteesta <span><a href="https://co2roadmap.fi">https://co2roadmap.fi</a></span><div>
    <br />
    <div>Tervetuloa!<div>
    <br />
    <div>Ystävällisin terveisin</div>
    <div>Matkailun CO2-laskurin tiimi</div>
    </div>
    `;
};
