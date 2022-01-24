import config from "../../../config";
import { Organization, User } from "../../../entity";

export const userInvitationEmail = (
  user: User,
  org: Organization,
  token: string
): string => {
  return `
    <div>
    <div>Hei,</div>
    <br/>
    <div>${
      org.name
    } on ottanut matkailualan avoimen hiilijalanjälkilaskurin käyttöön, ja ${
    user.firstName && user.lastName
      ? user.firstName + " " + user.lastName
      : user.email
  } on nyt kutsunut sinut osallistumaan työhön.</div>
    <br/>
    <div>Voit rekisteröityä laskurin käyttäjäksi seuraavan linkin kautta:</div>
    <br/>
    <div><span><a href="${config.CORS_ORIGIN}/register/${token}">${
    config.CORS_ORIGIN
  }/register/${token}</a></span></div>
    <br/>
    <div>Jos sinulla on kysyttävää asiasta, voit olla yhteydessä kutsun lähettäjään sähköpostiosoitteella ${
      user.email
    }.</div>
    <div>Saat lisätietoja laskurista osoitteesta <span><a href="https://co2laskuri.fi">https://co2laskuri.fi</a></span><div>
    <br />
    <div>Tervetuloa!<div>
    <br />
    <div>Ystävällisin terveisin</div>
    <div>Matkailun CO2-laskurin tiimi</div>
    </div>
    `;
};
