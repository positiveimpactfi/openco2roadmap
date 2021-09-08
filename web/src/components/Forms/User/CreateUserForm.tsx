import { Form, Formik, FormikProps } from "formik";
import { useCreateUserMutation } from "graphql/mutations/user/createUser.generated";
import { useAllOrganizationsQuery } from "graphql/queries/organization/allOrganizations.generated";
import { AllUsersDocument } from "graphql/queries/users/allUsers.generated";
import { Organization } from "types";
import FormField from "../Common/FormField";
import Select from "../Common/Select";

interface FormValues {
  email: string;
  password: string;
  organization: Organization;
  role: { name: string; id: number };
}

const CreateUserForm: React.FC<{ setOpen: (val: boolean) => void }> = ({
  setOpen,
}) => {
  const [createUser] = useCreateUserMutation();
  const { data } = useAllOrganizationsQuery();
  const initialValues = {
    email: "",
    password: "",
    organization: null,
    role: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const response = await createUser({
          variables: {
            email: values.email,
            password: values.password,
            organizationID: values.organization?.id,
            role: values.role?.name.toUpperCase().replace(" ", "_"),
          },
          refetchQueries: [AllUsersDocument],
        });
        if (response.data.createUser.user) {
          setSubmitting(false);
          resetForm();
          setOpen(false);
        } else {
          console.error("Failed to create user");
        }
      }}
    >
      {({ isSubmitting, handleReset, setFieldValue }: FormikProps<{}>) => (
        <Form>
          <div className="rounded-md space-y-4">
            <FormField
              showLabel
              label="Sähköposti"
              name="email"
              placeholder="Sähköposti"
              autoComplete="email"
              roundedTop
              roundedBottom
              required
            />
            <FormField
              showLabel
              label="Salasana"
              name="password"
              placeholder="Salasana"
              roundedTop
              roundedBottom
              required
              type="password"
            />
            <Select
              options={data?.allOrganizations ?? []}
              showLabel
              label="Liitä yritykseen"
              name="organization"
              setFieldValue={setFieldValue}
            />
            <Select
              options={[
                { name: "Company Admin", id: 3 },
                { name: "Company user", id: 4 },
              ]}
              showLabel
              label="Rooli"
              name="role"
              setFieldValue={setFieldValue}
            />
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    // setSlideoverOpen(false);
                  }}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Peruuta
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Tallenna
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUserForm;
