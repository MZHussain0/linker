"use client";
import { cn } from "@/lib/utils";
import { ArrowLeftToLineIcon, BarChartBigIcon, FilesIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { Button } from "./ui/button";

type Props = {};

const AppSidebar = (props: Props) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <nav className="flex flex-col text-white text-lg justify-center  mt-16 gap-4 font-semibold">
      <Button
        variant={path === "/account" ? "secondary" : "ghost"}
        onClick={() => router.push("/account")}
        className={cn(
          path === "/account" ? "text-theme-300 font-semibold duration-300" : ""
        )}>
        <FilesIcon className="h-5 w-5 mr-2 text-theme-400" /> My Pages
      </Button>

      <Button
        variant={path === "/analytics" ? "secondary" : "ghost"}
        onClick={() => router.push("/analytics")}
        className={cn(
          path === "/analytics"
            ? "text-theme-300 font-semibold duration-300"
            : ""
        )}>
        <BarChartBigIcon className="h-5 w-5 mr-2 text-theme-400" /> Analytics
      </Button>

      <LogoutButton />

      <Button
        className="flex items-center gap-2 border-t border-white mt-4 hover:bg-none"
        variant={"link"}
        onClick={() => router.push("/")}>
        <ArrowLeftToLineIcon className="text-theme-400 w-5 h-5" />
        <span className="text-theme-50 text-base underline">Homepage</span>
      </Button>
    </nav>
  );
};

export default AppSidebar;
