"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageIcon, PaletteIcon, UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  type: z.enum(["color", "image"], {
    required_error: "You need to select a notification type.",
  }),
  location: z.string().min(1, {
    message: "Location must be at least 1 characters.",
  }),
  bio: z.string().min(5, {
    message: "Bio must be at least 5 characters.",
  }),
});

type Props = {
  page: string;
  image?: string | null;
};

export function PageSettingsForm({ page, image }: Props) {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState("color");

  const handleLabelClick = (value: string) => {
    setSelectedValue((prev) => (prev === value ? prev : value));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "color",
      location: "",
      bio: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="py-20 bg-muted-foreground flex items-center justify-center">
              <FormControl>
                <RadioGroup
                  onValueChange={() => {
                    field.onChange;
                    handleLabelClick;
                  }}
                  defaultValue={field.value}
                  className="flex items-center justify-center bg-muted-foreground border-white border-4 rounded-sm">
                  <FormItem
                    className={`flex items-center justify-center p-2  ${
                      selectedValue === "color"
                        ? "bg-theme-200 border-theme-400"
                        : ""
                    }`}
                    onClick={() => handleLabelClick("color")}>
                    <FormControl>
                      <RadioGroupItem value="color" className="sr-only" />
                    </FormControl>
                    <FormLabel className="font-normal flex items-center justify-center">
                      <PaletteIcon className="h-4 w-4 text-black font-semibold" />
                      <span className="ml-2 text-black font-semibold">
                        Color
                      </span>
                    </FormLabel>
                  </FormItem>
                  <FormItem
                    className={`flex items-center justify-center p-2  ${
                      selectedValue === "image"
                        ? "bg-theme-200 border-theme-400 "
                        : ""
                    }`}
                    onClick={() => handleLabelClick("image")}>
                    <FormControl>
                      <RadioGroupItem value="image" className="sr-only" />
                    </FormControl>
                    <FormLabel className="font-normal flex items-center">
                      <ImageIcon className="h-4 w-4  text-black font-semibold" />
                      <span className="ml-2 text-black font-semibold">
                        Image
                      </span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image component */}
        <div className="flex justify-center">
          <Image
            src={image || ""}
            width={256}
            height={256}
            alt="avatar"
            className="rounded-full overflow-hidden mx-auto w-32 aspect-square border-4 border-white relative -top-12"
          />
        </div>

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="your location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio Field */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-theme-300 hover:bg-theme-400 w-52 text-lg font-semibold flex items-center justify-center">
          <span>Save</span>
          <UploadCloudIcon className="h-5 w-5 ml-2 " />
        </Button>
      </form>
    </Form>
  );
}
