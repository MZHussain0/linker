"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { UploadCloudIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { savePageSettings } from "./actions/pageActions";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  // type: z.enum(["color", "image"]),
  location: z.string(),
  bio: z.string(),
  src: z.string(),
});

type Props = {
  uri: string;
  displayName: string;
  bio: string;
  location: string;
  image?: string | null;
};

export function PageSettingsForm({
  bio,
  image,
  location,
  uri,
  displayName,
}: Props) {
  const router = useRouter();
  // const [selectedValue, setSelectedValue] = useState("color");

  // const handleLabelClick = (value: string) => {
  //   setSelectedValue((prev) => (prev === value ? prev : value));
  // };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: displayName,
      // type: "color",
      location: location,
      bio: bio,
      src: image || "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await savePageSettings(
      values.name,
      values.bio,
      values.location,
      values.src
    );
    if (result) {
      toast.success("Updated the record successfully!");
    } else {
      toast.error("Something went wrong!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* <FormField
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
        /> */}

        {/* Image component */}

        <FormField
          name="src"
          render={({ field }) => (
            <FormItem className="flex  items-center justify-center pt-16 max-w-md mx-auto">
              <FormControl>
                <ImageUpload
                  disabled={isSubmitting}
                  onChange={field.onChange}
                  value={field.value}
                  image={image || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          disabled={isSubmitting}
          className="bg-theme-300 hover:bg-theme-400 w-52 text-lg font-semibold flex items-center justify-center">
          <span>Save</span>
          <UploadCloudIcon className="h-5 w-5 ml-2 " />
        </Button>
      </form>
    </Form>
  );
}
