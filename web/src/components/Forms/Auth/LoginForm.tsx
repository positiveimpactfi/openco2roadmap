import FormField from "components/Forms/Common/FormField";
import { Form } from "formik";
import { LockClosedIcon } from "@heroicons/react/solid";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

export const LoginForm: React.FC<{ isSubmitting: boolean }> = ({
  isSubmitting,
}) => {
  const { t } = useTranslation("auth");
  return (
    <Form className="mt-8 space-y-6">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        <FormField
          label={t("common.email")}
          name="email"
          placeholder={t("common.email")}
          autoComplete="email"
          roundedTop
          required
        />
        <FormField
          label={t("common.password")}
          name="password"
          placeholder={t("common.password")}
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
              {t("pages.login.actions.forgot_password")}
            </a>
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-teal-500 group-hover:text-teal-400"
              aria-hidden="true"
            />
          </span>
          {t("pages.login.actions.login")}
        </button>
      </div>
    </Form>
  );
};
