"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { signIn } from '@/auth'
import type { User, RegisterState } from './type-definitions'
import { EmailTemplate as GenerateEmailTemplate } from "@/app/ui/email-template/sample";
import { sql } from "@vercel/postgres";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function authenticate(formData: FormData) {
  console.log("credentials", formData);
  await signIn("credentials", {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
}

const RegisterSchema = z.object({
  email: z.string().email().trim(),
  name: z.string().min(3).max(100).trim(),
  password: z.string().min(8).max(100).trim(),
  "confirm-password": z.string().min(8).max(100).trim(),
});

let RegisterSchemaRefined = RegisterSchema.refine(
  (data) => data["confirm-password"] === data.password,
  {
    message: "Passwords do not match",
    path: ["confirm-password"],
  },
);

export async function register(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
  console.log("registering", prevState, formData);

  const validatedData = RegisterSchemaRefined.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    "confirm-password": formData.get("confirm-password"),
  });

  if (validatedData.error) {
    // console.log("error", validatedData.error.errors);
    let fields = validatedData.error.errors.map((e) => e.path.join("."));
    let val = fields.join(", ");
    // console.log("val", val);

    return {
      error: validatedData.error.flatten().fieldErrors,
      message: `Validation failed, check ${val} field${fields.length > 1 ? "s" : ""}`,
    };

  }
  console.log("validatedData", validatedData.error, validatedData.data);

  // hash password
  const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);
  // console.log(hashedPassword)
  // save to database
  const savedUser = await createUser({
    email: validatedData.data.email,
    name: validatedData.data.name,
    password: hashedPassword,
  });

  console.log(savedUser)

  if (savedUser.rowCount !== 1) {
    return {
      message: "Error saving user",
    }
  }
  // send email
  await sendEmail("Welcome to Beauty4ever", validatedData.data.email, validatedData.data.name);
  // return success message and redirect to login page | login user directly
  await signIn("credentials", {
    email: validatedData.data.email,
    password: validatedData.data.password,
  });

  return {
    message: "User created"
  }
}

export async function createUser(user: Omit<User, 'id'>) {
  console.log("creating user", user);

  const savedUser = await sql`
    INSERT INTO users (email, name, password) VALUES (${user.email}, ${user.name}, ${user.password})
  `;

  return savedUser;
}

export async function getUserFromDb(email: string) {
  console.log("getting user from db", email);

  const user = await sql`
    SELECT * FROM users WHERE email = ${email}`;

  if (user?.rowCount !== null && user.rowCount === 0) {
    return {
      message: "User not found",
    };
  }

  return user.rows[0];
}

export async function sendEmail(subject: string, email: string, name: string) {
  console.log("sending email");
  try {
    await resend.emails.send({
      from: "Beaty4ever Team <hello@oluwasetemi.dev>",
      to: [email],
      subject: subject,
      react: GenerateEmailTemplate({ name, subject }),
    });
  } catch (error) {
    console.log("Error sending email", error);
    throw new Error("Error sending email");
  }
}
