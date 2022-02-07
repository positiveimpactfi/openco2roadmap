import Button from "components/Button";
import { Field, Form, Formik } from "formik";
import { useUser } from "hooks/useUser";
import { useRouter } from "next/router";

const FeedbackForm: React.FC<{
  setShowNotification: (arg: boolean) => void;
  setShowModal: (arg: boolean) => void;
}> = ({ setShowNotification, setShowModal }) => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{ feedback: "" }}
        onSubmit={async ({ feedback }) => {
          const requestOptions = {
            method: "POST",
            body: JSON.stringify({
              text: `
            New feedback received!\n
            User: ${user.email}\n
            Organization: ${user.organizations[0].name}\n
            User agent: ${navigator.userAgent}\n
            URL: ${router.pathname}\n
            Date: ${new Date().toLocaleString("fi")}\n
            Feedback: ${feedback}\n
            ========================================`,
            }),
          };
          const response = await fetch(
            process.env.NEXT_PUBLIC_SLACK_WEBHOOK,
            requestOptions
          );
          if (response.ok) {
            setShowModal(false);
            setShowNotification(true);
            console.log("form submitted, response", response);
          }
        }}
      >
        {() => (
          <Form className="mt-8">
            <div className="rounded-md">
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <p className="mt-2 text-sm text-gray-500">
                  Kirjoita tähän kenttään palautteesi:
                </p>
                <Field
                  id="feedback"
                  name="feedback"
                  rows={10}
                  className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  as="textarea"
                />
              </div>

              <div className="mt-5 space-x-2 sm:flex">
                <Button variant="success" type="submit">
                  Lähetä
                </Button>
                <Button onClick={() => setShowModal(false)}>Peruuta</Button>
              </div>
              <div className="mt-10 max-w-prose text-xs text-gray-500">
                Palautteesi yhteyteen tallennetaan automaattisesti seuraavat
                tiedot:
                <ul className="list-inside list-disc">
                  <li>käyttäjätunnus</li>
                  <li>yrityksen nimi</li>
                  <li>lomakkeen avaussivun osoite (URL)</li>
                  <li>päivämäärä ja kellonaika</li>
                  <li>
                    käyttämäsi käyttöjärjestelmän ja selaimen nimi ja versio
                  </li>
                </ul>
                Tiedot tallennetaan suoraan Positive Impactin
                palautejärjestelmään, ja niistä ei jää kopiota laskurin
                tietokantoihin.
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FeedbackForm;
