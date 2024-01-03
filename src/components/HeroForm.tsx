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
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
});

export function HeroForm() {
  useEffect(() => {
    if ("localStorage" in window && window.localStorage.getItem("username")) {
      const username = window.localStorage.getItem("username");
      window.localStorage.removeItem("username");
      redirect(`/account?username=${username}`);
    }
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const username = values.username;
    window.localStorage.setItem("username", username);
    await signIn("google");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit" className="bg-theme-300 hover:bg-theme-400">
          Join for FREE
        </Button>
      </form>
    </Form>
  );
}
