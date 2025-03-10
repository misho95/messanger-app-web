import { auth } from "@/auth";
import { SignInContainer } from "@/components/auth/sign-in-container";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-full">
      <SignInContainer />
    </div>
  );
}
