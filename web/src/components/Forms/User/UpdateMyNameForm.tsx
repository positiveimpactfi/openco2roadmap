import Button from "components/Button";
import { Form, Formik, FormikProps } from "formik";
import { useUpdateMyNameMutation } from "graphql/mutations/user/updateMyName.generated";
import { MeDocument } from "graphql/queries/users/me.generated";
import { User } from "types/generatedTypes";
import * as Yup from "yup";
import FormField from "../Common/FormField";

interface FormValues {
  firstName: string;
  lastName: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(
    2,
    "Etunimen pitää olla vähintään kaksi merkkiä pitkä"
  ),
  lastName: Yup.string().min(
    2,
    "Sukunimen pitää olla vähintään kaksi merkkiä pitkä"
  ),
});

const UpdateMyNameForm: React.FC<{
  user: User;
  setOpen: (val: boolean) => void;
}> = ({ setOpen, user }) => {
  const [updateMyName] = useUpdateMyNameMutation();
  const initialValues = {
    lastName: user?.lastName ?? "",
    firstName: user?.firstName ?? "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const response = await updateMyName({
          variables: {
            newFirstName: values.firstName,
            newLastName: values.lastName,
          },
          refetchQueries: [MeDocument],
        });
        if (response.data.updateMyName) {
          setSubmitting(false);
          resetForm();
          setOpen(false);
        } else {
          console.error("Failed to update user");
        }
      }}
    >
      {({ isSubmitting, handleReset, errors }: FormikProps<{}>) => (
        <Form>
          <div className="space-y-4 rounded-md">
            <FormField
              showLabel
              label="Etunimi"
              name="firstName"
              placeholder="Etunimi"
              roundedTop
              roundedBottom
            />
            <FormField
              showLabel
              label="Sukunimi"
              name="lastName"
              placeholder="Sukunimi"
              roundedTop
              roundedBottom
            />

            <div className="pt-5">
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => {
                    handleReset();
                    setOpen(false);
                  }}
                >
                  Peruuta
                </Button>
                <Button
                  type="submit"
                  variant="success"
                  disabled={isSubmitting || Object.keys(errors).length !== 0}
                >
                  Tallenna
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateMyNameForm;
