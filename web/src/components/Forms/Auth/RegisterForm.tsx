import FormField from "components/Forms/Common/FormField";
import { Form } from "formik";

export const RegisterForm: React.FC<{ isSubmitting: boolean }> = ({
  isSubmitting,
}) => {
  return (
    <Form className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <FormField
          label="email"
          name="email"
          autoComplete="email"
          required
          placeholder="Sähköpostiosoite"
          roundedTop
        />
        <FormField
          label="password"
          name="password"
          required
          type="password"
          placeholder="Salasana"
          roundedBottom
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
          Rekisteröi
        </button>
      </div>
    </Form>
  );
};
