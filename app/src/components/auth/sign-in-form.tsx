"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/actions/auth";

export default function SignInForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
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
          <Input id="password" name="password" type="password" />
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
        <Button type="submit" className="w-full" disabled={pending}>
          Login
        </Button>
        {state?.message && (
          <p className="text-red-500 text-xs">{state.message}</p>
        )}
      </div>
    </form>
  );
}
