"use server";

import { signIn } from "@/auth";
import {
  SignupFormSchema,
  SignInFormSchema,
  FormState,
  SignUpFormState,
} from "@/lib/definitions";
import { prisma } from "@/prisma";
import { hashSync } from "bcrypt-ts";

export async function formSignin(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      console.log(result.error);
      return { message: "Wrong credentials" };
    }
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
}

export async function formSignup(state: SignUpFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, rePassword, name } = validatedFields.data;

  const hashedPass = hashSync(password, 12);

  const createUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPass,
    },
  });

  console.log(createUser);

  return { message: "Success" };
}
