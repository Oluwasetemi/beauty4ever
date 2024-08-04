"use client";

import {
  FieldGroup,
  Field,
  ErrorMessage,
  Description,
} from "@/components/fieldset";
import { InputGroup, Input } from "@/components/input";
import { Label, Button } from "@headlessui/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { GoogleIcon, GitHubIcon, LoginButton } from "./login-form";
import { register } from "../lib/actions";
import { useFormState } from "react-dom";
import { RegisterState } from "../lib/type-definitions";

export function RegisterForm() {
  const [show, setShow] = useState(false);
  const initialState: RegisterState = {}

  // TODO: fix type error
  const [state, dispatch, pending] = useFormState(register, initialState);
  console.log(state);
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form action={dispatch} className="space-y-6">
          <FieldGroup>
            <Field>
              <Label className="block font-medium leading-6 text-black dark:text-black">
                Name
              </Label>
              <Input
                name="name"
                type="text"
                // required
                invalid={Boolean(
                  state?.error?.name && state?.error?.name.length > 0
                    ? state?.error?.name[0]
                    : "",
                )}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {state?.error?.name && state?.error?.name.length > 0 && (
                <ErrorMessage>{state?.error?.name[0]}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label className="block font-medium leading-6 text-black dark:text-black">
                Email address
              </Label>
              <Input
                name="email"
                type="text"
                // required
                invalid={Boolean(
                  state?.error?.email && state?.error?.email.length > 0
                    ? state?.error?.email[0]
                    : "",
                )}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {state?.error?.email && state?.error?.email.length > 0 && (
                <ErrorMessage>{state?.error?.email[0]}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label
                htmlFor="password"
                className="block font-medium leading-6 text-black"
              >
                Password
              </Label>
              <InputGroup>
                <Input
                  name="password"
                  id="password"
                  type={show ? "text" : "password"}
                  // required
                  invalid={Boolean(
                    state?.error?.password && state?.error?.password.length > 0
                      ? state?.error?.password[0]
                      : "",
                  )}
                  className="block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {state?.error?.password &&
                  state?.error?.password.length > 0 && (
                    <ErrorMessage>{state?.error?.password[0]}</ErrorMessage>
                  )}
                {show ? (
                  <EyeSlashIcon
                    className="cursor-auto"
                    onClick={() => {
                      setShow(!show);
                    }}
                  />
                ) : (
                  <EyeIcon
                    className="cursor-pointer pointer-events-auto"
                    onClick={() => {
                      setShow(!show);
                    }}
                  />
                )}
              </InputGroup>
            </Field>
            <Field>
              <Label
                htmlFor="confirm-password"
                className="block font-medium leading-6 text-black"
              >
                Confirm Password
              </Label>
              <InputGroup>
                <Input
                  name="confirm-password"
                  id="confirm-password"
                  type={show ? "text" : "password"}
                  // required
                  invalid={Boolean(
                    state?.error?.["confirm-password"] &&
                      state?.error?.["confirm-password"].length > 0
                      ? state?.error?.["confirm-password"][0]
                      : "",
                  )}
                  className="block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {state?.error?.["confirm-password"] &&
                  state?.error?.["confirm-password"].length > 0 && (
                    <ErrorMessage>
                      {state?.error?.["confirm-password"][0]}
                    </ErrorMessage>
                  )}
                {show ? (
                  <EyeSlashIcon
                    className="cursor-auto"
                    onClick={() => {
                      setShow(!show);
                    }}
                  />
                ) : (
                  <EyeIcon
                    className="cursor-pointer pointer-events-auto"
                    onClick={() => {
                      setShow(!show);
                    }}
                  />
                )}
              </InputGroup>
            </Field>
          </FieldGroup>
          <div className="flex items-center justify-between">
            <div className="text-sm leading-6">
              <Link
                href="/forgot-password"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <LoginButton type="register" pending={pending} />
          {/* general error message */}
          <div className="text-red-600">{state?.message}</div>
        </form>

        <div>
          <div className="relative mt-10">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-6 text-gray-900">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <GoogleIcon />
              <span className="text-sm font-semibold leading-6">Google</span>
            </a>

            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <GitHubIcon />
              <span className="text-sm font-semibold leading-6">GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        If you have an account?{" "}
        <Link
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          href="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
