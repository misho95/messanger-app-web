import { SignIn } from "@/components/sign-in";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello World!</h1>
      <Link href="/login">Login Page</Link>
    </div>
  );
}
