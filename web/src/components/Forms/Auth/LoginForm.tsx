import FormField from "components/Forms/Common/FormField";
import { Form } from "formik";
import { LockClosedIcon } from "@heroicons/react/solid";
import Link from "next/link";

export const LoginForm: React.FC<{ isSubmitting: boolean }> = ({
  isSubmitting,
}) => {
  return (
    <Form className="mt-8 space-y-6">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <FormField
          label="Sähköpostiosoite"
          name="email"
          placeholder="Sähköpostiosoite"
          autoComplete="email"
          roundedTop
          required
        />
        <FormField
          label="Salasana"
          name="password"
          placeholder="Salasana"
          type="password"
          roundedBottom
          required
        />
      </div>

      <div className="flex items-center justify-between">
        {/* <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Muista minut
          </label>
        </div> */}

        <div className="text-sm">
          <Link href="/forgot-password" passHref>
            <a className="font-medium text-teal-600 hover:text-teal-500">
              Salasana hukassa?
            </a>
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-teal-500 group-hover:text-teal-400"
              aria-hidden="true"
            />
          </span>
          Kirjaudu
        </button>
      </div>
    </Form>
  );
};
