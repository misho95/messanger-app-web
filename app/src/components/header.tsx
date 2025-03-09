import { auth } from "@/auth";
import SignOut from "./sign-out";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = async () => {
  const session = await auth();

  return (
    <header className="px-10 py-3 fixed top-0 flex justify-between w-full items-center h-[90px]">
      <nav>
        <Link href="/" className="mx-3">
          Home
        </Link>
        {!session?.user && (
          <>
            <Link href="/auth/sign-in" className="mx-3">
              Sign-In
            </Link>
            <Link href="/auth/sign-up" className="mx-3">
              Sign-Up
            </Link>
          </>
        )}
      </nav>
      {session?.user && (
        <div className="flex gap-3 items-center p-3">
          <Avatar>
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback>{session.user.name}</AvatarFallback>
          </Avatar>
          <h1>hello {session.user.name}</h1>
          <SignOut />
        </div>
      )}
    </header>
  );
};

export default Header;
