import AppSidebar from "@/components/AppSidebar";
import ClientOnly from "@/components/ClientOnly";
import { Page } from "@/models/Page";
import { Link2Icon, MenuIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
  children: React.ReactNode;
};

const Accountlayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const page = await Page.findOne({ owner: session.user?.email });

  return (
    <ClientOnly>
      <div className="flex md:hidden bg-muted/20  p-4 sticky top-0 ">
        <MenuIcon /> Menu
      </div>
      <main className="flex items-stretch">
        <div className="flex-none w-48 bg-muted/50 p-4 border-r shadow-sm hidden md:block">
          <aside className=" flex justify-start flex-col items-center ">
            <div className="sticky top-0">
              <div className="relative h-24 w-24 mt-16 border-white border-4 rounded-full">
                <Image
                  src={session.user?.image || ""}
                  fill
                  alt="avatar"
                  className="rounded-full object-cover"
                />
              </div>
              <Link
                target="_blank"
                href={`/${page.uri}`}
                className="flex items-center gap-2 text-yellow-300 mt-6 hover:-translate-y-1 transition-all duration-300">
                {" "}
                <Link2Icon className="h-8 w-8  rotate-12" />{" "}
                <span className="font-semibold text-2xl text-white">/</span>
                <span className="font-bold text-lg text-white">
                  {" "}
                  {page.uri}
                </span>
              </Link>
              <AppSidebar />
            </div>
          </aside>
        </div>

        <div className="grow p-4 bg-muted/20">
          <div className="flex-grow max-w-4xl mx-auto">{children}</div>
        </div>
      </main>
    </ClientOnly>
  );
};

export default Accountlayout;
