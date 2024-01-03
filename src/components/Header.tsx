import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { navMenu } from "@/lib/constants";
import { Link2Icon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

type Props = {};

const Header = async (props: Props) => {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-theme-800 border-b  py-4 ">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-8 ">
          <Link href="/" className="flex items-center gap-2 text-yellow-300">
            {" "}
            <Link2Icon className="h-6 w-6  rotate-12" />{" "}
            <span className="font-bold">Linker</span>
          </Link>
          <nav className="flex gap-4 text-theme-100 text-sm">
            {navMenu.map((item) => (
              <Link key={item.name} href={item.href}>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex gap-4 text-sm text-theme-100">
          {!!session && (
            <div className="flex items-center gap-4">
              <Link href="/account" className="hover:text-white">
                Hello, {session.user?.name}
              </Link>
              <LogoutButton />
            </div>
          )}
          {!session && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
