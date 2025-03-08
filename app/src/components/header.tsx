import { auth } from "@/auth";
import SignOut from "./sign-out";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  const session = await auth();

  return (
    <header className="px-10 py-3 fixed top-0">
      <Link href="/" className="mx-3">
        Home
      </Link>
      {!session?.user ? (
        <>
          <Link href="/auth/sign-in" className="mx-3">
            Sign-In
          </Link>
        </>
      ) : (
        <div className="flex gap-3 items-center p-3">
          <Image
            className="size-5 rounded-full object-cover object-center"
            src={session.user.image || ""}
            width={200}
            height={200}
            alt={session.user.name || "avatar"}
          />
          <h1>hello {session.user.name}</h1>
          <SignOut />
        </div>
      )}
    </header>
  );
};

export default Header;
