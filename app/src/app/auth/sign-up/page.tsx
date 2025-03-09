import { auth } from "@/auth";
import { SignUpContainer } from "@/components/auth/sing-up-container";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-full">
      <SignUpContainer />
    </div>
  );
}
