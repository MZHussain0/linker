import AppSidebar from "@/components/AppSidebar";
import ClientOnly from "@/components/ClientOnly";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import Image from "next/image";
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

  const headerList = headers();

  return (
    <ClientOnly>
      <main className="flex items-start">
        <aside className="bg-theme-800 w-48 min-h-screen p-4 border-r shadow-sm">
          <div className=" rounded-full overflow-hidden mx-auto w-24 aspect-square">
            <Image
              src={session.user?.image || ""}
              width={256}
              height={256}
              alt="avatar"
              className="object-cover"
            />
          </div>

          <AppSidebar />
        </aside>

        <div className=" grow bg-theme-600 m-8 p-4 shadow-md shadow-white">
          {children}
        </div>
      </main>
    </ClientOnly>
  );
};

export default Accountlayout;
