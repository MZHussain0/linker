"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveAllIcon, Trash2Icon } from "lucide-react";
import { nanoid } from "nanoid";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { savePageLinks } from "./actions/pageActions";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
type Props = {
  links: {
    linkId: string;
    linkTitle: string;
    linkSubtitle: string;
    linkUrl: string;
  }[];
};

const linkSchema = z.object({
  linkId: z.string(),
  linkTitle: z.string().min(1, "Title is required"),
  linkSubtitle: z.string(),
  linkUrl: z.string(), // Assuming this will be a string path or URL
});

// Define the schema for the entire form
const formSchema = z.object({
  links: z.array(linkSchema),
});

// Default form values
const getDefaultFormValues = () => ({
  links: [
    {
      linkId: nanoid(),
      linkTitle: "",
      linkSubtitle: "",
      linkUrl: "",
    },
  ],
});

// Create a type from the schema (optional, for TypeScript)
export type FormData = z.infer<typeof formSchema>;
export type LinkData = z.infer<typeof linkSchema>;

const PageLinksForm = ({ links }: Props) => {
  const getDefaultFormValues = () => ({
    links: links.map((link) => ({
      ...link,
      linkId: nanoid(),
    })),
  });
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await savePageLinks(values.links);
      toast.success("Updated the links successfully!");
    } catch (error) {
      console.log(error);
    }
  }

  function addMoreTerms() {
    append({ linkId: nanoid(), linkTitle: "", linkSubtitle: "", linkUrl: "" });
  }
  return (
    <div className="bg-muted-foreground p-1 mt-16 rounded-lg mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-muted rounded-lg p-4">
          <div className="">
            <h2 className="text-lg font-semibold text-theme-300 mb-4">Links</h2>

            {fields.map((item, index) => (
              <div
                key={item.linkId}
                className="w-full flex items-start  gap-x-4 flex-wrap px-4 ">
                <div className="flex flex-col gap-y-8 items-center justify-center mt-4">
                  <div className="bg-theme-400 rounded-full h-10 w-10  flex items-center justify-center text-lg text-black font-semibold ">
                    {index + 1}
                  </div>
                  <Button
                    variant={"ghost"}
                    className="px-2 py-0 group"
                    onClick={() => remove(index)}>
                    <Trash2Icon className="w-8 h-8 text-red-400   group-hover:text-red-500 group-hover:-translate-y-1 transition-all duration-300" />
                  </Button>
                </div>

                <div className="flex-grow flex flex-col mb-16">
                  <FormField
                    control={form.control}
                    name={`links.${index}.linkTitle` as const}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-x-4">
                        <FormLabel className="font-semibold  w-32">
                          TITLE :
                        </FormLabel>
                        <FormControl className="">
                          <Input
                            placeholder="Enter title"
                            {...field}
                            className=""
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`links.${index}.linkSubtitle` as const}
                    render={({ field }) => (
                      <FormItem className=" flex items-center gap-x-4 w-full">
                        <FormLabel className="font-semibold w-32 ">
                          SUBTITLE :
                        </FormLabel>
                        <FormControl className="">
                          <Input
                            placeholder="link subtitle (optional)"
                            {...field}
                            className=""
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`links.${index}.linkUrl` as const}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-x-4">
                        <FormLabel className="font-semibold w-32 ">
                          URL :
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="https://xyz.xyz"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            <div className="flex items-center justify-start pt-4">
              <Button
                onClick={addMoreTerms}
                variant={"outline"}
                className=" text-md text-theme-300 hover:text-theme-400 hover:bg-slate-900 font-semibold">
                {" "}
                + Add More
              </Button>
            </div>
          </div>

          <div className="max-w-xs mx-auto mt-4">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-theme-300 hover:bg-theme-400 ">
              <SaveAllIcon className="w-5 h-5 mr-2" />
              <span className="font-semibold text-base">Submit links</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PageLinksForm;
