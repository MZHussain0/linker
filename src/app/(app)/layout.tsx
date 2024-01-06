import AppSidebar from "@/components/AppSidebar";
import ClientOnly from "@/components/ClientOnly";
import { getServerSession } from "next-auth";
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

  return (
    <ClientOnly>
      <main className="flex items-start">
        <aside className="bg-theme-800 w-48 min-h-screen p-4 border-r shadow-sm flex justify-start flex-col items-center">
          <div className="relative h-24 w-24 border-white border-4 rounded-full">
            <Image
              src={session.user?.image || ""}
              fill
              alt="avatar"
              className="rounded-full object-cover"
            />
          </div>

          <AppSidebar />
        </aside>

        <div className=" grow p-4">{children}</div>
      </main>
    </ClientOnly>
  );
};

export default Accountlayout;
