"use client";
import { Label } from "@radix-ui/react-label";
import {
  DiscIcon,
  FacebookIcon,
  GithubIcon,
  GripIcon,
  InstagramIcon,
  LucideIcon,
  MailIcon,
  Music2Icon,
  PhoneCallIcon,
  PlusIcon,
  SaveAllIcon,
  SendIcon,
  Trash2Icon,
  WheatIcon,
  YoutubeIcon,
} from "lucide-react";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { toast } from "sonner";
import { savePageButtons } from "./actions/pageActions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type TButton = {
  id: number;
  key: string;
  label: string;
  icon: LucideIcon;
};

const allButtons = [
  {
    key: "email",
    label: "Email",
    icon: MailIcon,
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: PhoneCallIcon,
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: FacebookIcon,
  },
  {
    key: "discord",
    label: "Discord",
    icon: DiscIcon,
  },
  {
    key: "tiktok",
    label: "Tiktok",
    icon: Music2Icon,
  },
  {
    key: "youtube",
    label: "Youtube",
    icon: YoutubeIcon,
  },
  {
    key: "whatsapp",
    label: "Whatsapp",
    icon: WheatIcon,
  },
  {
    key: "github",
    label: "Github",
    icon: GithubIcon,
  },
  {
    key: "telegram",
    label: "Telegram",
    icon: SendIcon,
  },
];
export function PageButtonsForm({
  buttons,
}: {
  buttons: { [key: string]: string };
}) {
  console.log(buttons);
  const [inputValues, setInputValues] = useState(buttons);

  const pageSavedButtonKeys = Object.keys(buttons);

  const pageSavedButtonInfo = pageSavedButtonKeys
    .map((key) => allButtons.find((button) => button.key === key))
    .filter((button) => button !== undefined) as TButton[];

  const [activeButtons, setActiveButtons] =
    useState<TButton[]>(pageSavedButtonInfo);

  const availableButtons = allButtons.filter(
    (b1) => !activeButtons.find((b2) => b1.key === b2.key)
  );

  const addButtonToProfile = (button: TButton) => {
    setActiveButtons((prevButtons) => [...prevButtons, button]);
  };

  const removeButtonFromProfile = (key: string) => {
    setActiveButtons((prevButtons) =>
      prevButtons.filter((button) => button.key !== key)
    );

    setInputValues((prevInputValues) => {
      const updatedInputValues = { ...prevInputValues };
      delete updatedInputValues[key];
      return updatedInputValues;
    });
  };

  const handleInputChange = (key: string, value: string) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [key]: value,
    }));
  };

  const saveButtons = async () => {
    try {
      await savePageButtons(inputValues);
      toast.success("Updated the buttons successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortEnd = (newState: TButton[]) => {
    setActiveButtons(newState);

    // Create a new object to store the updated input values
    const newInputValues: { [key: string]: string } = {};

    // Iterate over the activeButtons array to update the input values
    newState.forEach((button) => {
      // Find the corresponding input value in the initialInputValues object
      const inputValue = inputValues[button.key];

      // Assign the input value to the newInputValues object based on the button's key
      newInputValues[button.key] = inputValue || button.label;
    });

    setInputValues(newInputValues);
  };

  return (
    <div className="bg-muted-foreground p-1 mt-4 rounded-lg">
      <form action={saveButtons} className="bg-muted rounded-lg p-4">
        <h3 className="text-lg font-semibold text-theme-300 mb-4">Buttons</h3>

        <ReactSortable list={activeButtons} setList={handleSortEnd}>
          {activeButtons.map((item) => (
            <div className="mb-4 flex items-center gap-4" key={item.key}>
              <GripIcon className="w-8 h-8 cursor-pointer hover:text-theme-400 transition-all duration-300" />
              <div
                className="flex gap-2 items-center  bg-theme-800 py-2
          px-2 rounded min-w-32">
                <item.icon className="w-5 h-5 text-theme-400" />
                <Label htmlFor={item.key}>{item.label}</Label>
              </div>
              <Input
                type={"text"}
                id={item.key}
                placeholder={`Enter your ${item.label}`}
                defaultValue={buttons[item.key]}
                onChange={(e) => handleInputChange(item.key, e.target.value)}
              />

              <Button
                variant={"ghost"}
                className="px-2 py-0 group"
                onClick={() => removeButtonFromProfile(item.key)}>
                <Trash2Icon className="w-5 h-5 text-red-400 group-hover:-translate-y-1 transition-all duration-300 " />
              </Button>
            </div>
          ))}
        </ReactSortable>

        <div className="flex items-center flex-wrap gap-2 border-t py-4 border-white/30 border-b ">
          {availableButtons.map((item, index) => (
            <Button
              key={item.key}
              variant={"outline"}
              onClick={() => addButtonToProfile({ ...item, id: index })}
              className="flex items-center justify-center gap-4 hover:bg-gray-900 shadow-sm shadow-black">
              <item.icon className="w-5 h-5 text-theme-400" />
              <span className="font-semibold">{item.label}</span>
              {<PlusIcon className="w-5 h-5 text-theme-400" />}
            </Button>
          ))}
        </div>
        <div className="max-w-xs mx-auto mt-4">
          <Button
            type="submit"
            className="w-full bg-theme-300 hover:bg-theme-400 ">
            <SaveAllIcon className="w-5 h-5 mr-2" />
            <span className="font-semibold text-base">Submit</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
