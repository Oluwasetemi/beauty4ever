import { Logo, GitHubIcon, GoogleIcon } from "@/app/ui/login-form";
import { RegisterForm } from "@/app/ui/register-form";

export default function Example() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        {/* form */}
        <RegisterForm />
      </div>
    </>
  );
}
