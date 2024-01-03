"use client";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

type Props = {};

function LogoutButton({}: Props) {
  return (
    <Button variant={"outline"} onClick={() => signOut()}>
      Logout <LogOutIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default LogoutButton;
