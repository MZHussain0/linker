"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, CircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UsernameFormResult from "./UsernameFormResult";
import grabUsername from "./actions/grabUsername";

type Props = {
  desiredUsername: string;
};

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
});
const GrabUsername = ({ desiredUsername }: Props) => {
  const [taken, setTaken] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: desiredUsername,
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async () => {
    const result = await grabUsername({
      desiredUsername: form.getValues("username"),
    });

    setTaken(result === false);
    if (result) {
      router.push(`/account?created=${form.getValues("username")}`);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold mb-2">
        Grab your username
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>linker.to/</FormLabel>
                <FormControl>
                  <Input placeholder="myprotfolioname" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display username.
                </FormDescription>
                <FormMessage />
                {taken && <UsernameFormResult />}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-theme-300 text-lg hover:bg-theme-400 w-full"
            disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin mr-2">
                  <CircleIcon className="h-4 w-4 text-red-800" />
                </div>
                <span>Loading...</span>
              </div>
            ) : (
              <>
                Claim your username
                <ArrowRightIcon className="ml-2 h-6 w-6 animate-pulse text-red-800" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default GrabUsername;
