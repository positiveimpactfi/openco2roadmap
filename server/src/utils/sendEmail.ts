import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import config from "../config";

sendgrid.setApiKey(config.SENDGRID_API_KEY);

export interface EmailProps {
  subject: string;
  textBody: string;
  htmlBody: string;
}

export const sendEmail = async (recepient: string, email: EmailProps) => {
  const message: MailDataRequired = {
    to: recepient,
    from: {
      name: "CO2Roadmap noreply",
      email: config.SENDGRID_EMAIL,
    },
    subject: email.subject,
    text: email.textBody,
    html: email.htmlBody,
  };
  const res = await sendgrid.send(message);

  if (res?.[0].statusCode === 202) {
    console.log("email sent to ", recepient);
  } else {
    console.log("email response", res);
  }
};
