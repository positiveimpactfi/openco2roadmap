import { Form, Formik, FormikProps } from "formik";
import { useCreateUserMutation } from "graphql/mutations/user/createUser.generated";
import { useAllOrganizationsQuery } from "graphql/queries/organization/allOrganizations.generated";
import { AllUsersDocument } from "graphql/queries/users/allUsers.generated";
import { MyOrganizationUsersDocument } from "graphql/queries/users/myOrganizationUsers.generated";
import { useUser } from "hooks/useUser";
import { Organization, User } from "types/generatedTypes";
import { isSuperAdmin } from "utils/isAdmin";
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
  const { user } = useUser();
  const [createUser] = useCreateUserMutation();
  const initialValues = {
    email: "",
    password: "",
    organization: user?.organizations[0],
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
          refetchQueries: [
            isSuperAdmin(user) ? AllUsersDocument : MyOrganizationUsersDocument,
          ],
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
            {isSuperAdmin(user) ? (
              <AllOrgsSelect setFieldValue={setFieldValue} />
            ) : (
              <MyOrgSelect user={user} />
            )}
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

const AllOrgsSelect: React.FC<{
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}> = ({ setFieldValue }) => {
  const { data } = useAllOrganizationsQuery();
  return (
    <Select
      options={data?.allOrganizations ?? []}
      showLabel
      label="Liitä yritykseen"
      name="organization"
      setFieldValue={setFieldValue}
    />
  );
};

const MyOrgSelect: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-6">
      <label
        htmlFor="user-org"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Liitä yritykseen
      </label>
      <div
        id="user-org"
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-t-md rounded-b-md"
      >
        {user?.organizations[0].name}
      </div>
    </div>
  );
};

export default CreateUserForm;
