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
            ========================================
            New feedback received!\n
            User: ${user.email}\n
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
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <p className="mt-2 text-sm text-gray-500">
                  Kirjoita tähän kenttään palautteesi:
                </p>
                <Field
                  id="feedback"
                  name="feedback"
                  rows={10}
                  className="max-w-lg shadow-sm block w-full focus:ring-teal-500 focus:border-teal-500 sm:text-sm border border-gray-300 rounded-md"
                  as="textarea"
                />
              </div>
              <div className="mt-5 sm:flex space-x-2">
                <Button variant="success" type="submit">
                  Lähetä
                </Button>
                <Button onClick={() => console.log("form closed")}>
                  Peruuta
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FeedbackForm;
