"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState, useState } from "react";
import { formSignup } from "@/actions/auth";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(formSignup, undefined);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form action={action}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="john"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {state?.errors?.name && (
            <p className="text-red-500 text-xs">{state.errors.name}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-xs">{state.errors.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/recovery"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
          />
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error} className="text-red-500 text-xs">
                    - {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rePassword">Re-password</Label>
          <Input
            id="rePassword"
            type="password"
            name="rePassword"
            placeholder="********"
          />
          {state?.errors?.rePassword && (
            <p className="text-red-500 text-xs">{state.errors.rePassword}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          Sign up
        </Button>
        {state?.message && (
          <p className="text-red-500 text-xs">{state.message}</p>
        )}
      </div>
    </form>
  );
}
