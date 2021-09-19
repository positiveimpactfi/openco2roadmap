import Button from "components/Button";
import { Formik, Form, Field } from "formik";

const FeedbackForm = () => {
  return (
    <Formik
      initialValues={{ feedback: "" }}
      onSubmit={() => console.log("form submitted")}
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
              <Button
                variant="success"
                onClick={() => console.log("button clicked")}
              >
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
  );
};

export default FeedbackForm;
