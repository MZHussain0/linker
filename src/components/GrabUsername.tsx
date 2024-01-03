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
import { ArrowRightIcon } from "lucide-react";
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: desiredUsername || "",
    },
  });

  return (
    <>
      <h1 className="text-4xl text-center font-bold mb-2">
        Grab your username
      </h1>
      <Form {...form}>
        <form
          action={(formData: FormData) => grabUsername({ desiredUsername })}
          className="space-y-8">
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
              </FormItem>
            )}
          />
          <div className="text-destructive">Username already taken.</div>
          <Button
            type="submit"
            className="bg-theme-300 text-lg hover:bg-theme-400 w-full">
            Claim your username
            <ArrowRightIcon className="ml-2 h-6 w-6 animate-pulse text-red-800" />
          </Button>
        </form>
      </Form>
    </>
  );
};

export default GrabUsername;
