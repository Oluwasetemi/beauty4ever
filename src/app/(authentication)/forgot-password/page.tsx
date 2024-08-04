import { Button } from "@/components/button";
import { Field, FieldGroup, Label } from "@/components/fieldset";
import { Input } from "@/components/input";
import { Link } from "@/components/link";
import { Logo, GitHubIcon, GoogleIcon } from "@/app/ui/login-form";

export default function Page() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/">
            <Logo />
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password
          </h2>
        </div>
        {/* form */}
        <ForgotPasswordForm />
      </div>
    </>
  );
}

function ForgotPasswordForm() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form action="#" method="POST" className="space-y-6">
          <FieldGroup>
            <Field>
              <Label className="block text-sm font-medium leading-6 text-black dark:text-black">
                Email address
              </Label>
              <Input
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Field>
          </FieldGroup>
          <div>
            <Button
              className="flex w-full font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              color="indigo"
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
