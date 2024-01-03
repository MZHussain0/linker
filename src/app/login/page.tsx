"use client";
import { Button } from "@/components/ui/button";
import {} from "lucide-react";
import { signIn } from "next-auth/react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-32">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login to your linker account</h1>
          <p className="text-zinc-500 dark:text-zinc-400 pb-8">
            Login to your account using one of the methods below
          </p>

          <Button
            onClick={() => {
              signIn("google");
            }}
            className="w-full bg-theme-300 hover:bg-theme-400"
            size={"lg"}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
