import Button from "components/Button";
import { Form, Formik, FormikProps } from "formik";
import { useCreateUserMutation } from "graphql/mutations/user/createUser.generated";
import { useIntiveUserMutation } from "graphql/mutations/user/inviteUser.generated";
import { useAllOrganizationsQuery } from "graphql/queries/organization/allOrganizations.generated";
import { AllUsersDocument } from "graphql/queries/users/allUsers.generated";
import { MyOrganizationUsersDocument } from "graphql/queries/users/myOrganizationUsers.generated";
import { useUser } from "hooks/useUser";
import { Organization, User } from "types/generatedTypes";
import { isSuperAdmin } from "utils/isAdmin";
import * as Yup from "yup";
import FormField from "../Common/FormField";
import Select from "../Common/Select";

interface FormValues {
  email: string;
  organization: Organization;
  role: { name: string; id: number };
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Tarkista antamasi sähköpostiosoite")
    .min(5)
    .required("Sähköpostiosoite vaaditaan!"),
  organization: Yup.object().required("Organisaatio vaaditaan!"),
  role: Yup.object().required("Rooli vaaditaan!"),
});

const InviteUserForm: React.FC<{ setOpen: (val: boolean) => void }> = ({
  setOpen,
}) => {
  const { user } = useUser();
  const [inviteUser] = useIntiveUserMutation();
  const initialValues = {
    email: "",
    organization: user?.organizations[0],
    role: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
        const response = await inviteUser({
          variables: {
            email: values.email,
            organizationID: values.organization?.id,
            role: values.role?.name.toUpperCase().replace(" ", "_"),
          },
          refetchQueries: [
            isSuperAdmin(user) ? AllUsersDocument : MyOrganizationUsersDocument,
          ],
        });
        if (response.data.inviteUser) {
          setSubmitting(false);
          resetForm();
          setOpen(false);
        } else {
          console.error("Failed to invite user");
        }
      }}
    >
      {({
        isSubmitting,
        handleReset,
        setFieldValue,
        errors,
      }: FormikProps<{}>) => (
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

            {isSuperAdmin(user) ? (
              <AllOrgsSelect setFieldValue={setFieldValue} />
            ) : (
              <MyOrgSelect user={user} />
            )}
            <Select
              options={[
                { name: "Company Admin", id: 3 },
                // { name: "Company user", id: 4 },
              ]}
              showLabel
              label="Rooli"
              name="role"
              setFieldValue={setFieldValue}
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

export default InviteUserForm;
