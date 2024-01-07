import { Page } from "@/models/Page";
import { User } from "@/models/User";
import {
  DiscIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkIcon,
  MailIcon,
  Music2Icon,
  PhoneCallIcon,
  PinIcon,
  SendIcon,
  WheatIcon,
  YoutubeIcon,
} from "lucide-react";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  params: {
    uri: string;
  };
};

const buttonsIcons = {
  email: MailIcon,
  mobile: PhoneCallIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  discord: DiscIcon,
  tiktok: Music2Icon,
  youtube: YoutubeIcon,
  whatsapp: WheatIcon,
  github: GithubIcon,
  telegram: SendIcon,
};

function buttonLinks(key: string, value: string) {
  if (key === "mobile") {
    return `tel:${value}`;
  }
  if (key === "email") {
    return `mailto:${value}`;
  }
  return value;
}

const UriPage = async ({ params }: Props) => {
  mongoose.connect(process.env.MONGODB_URI as string);
  const page = await Page.findOne({ uri: params.uri });
  const user = await User.findOne({ email: page?.owner });
  return (
    <div className="max-w-4xl mx-auto mt-16 px-4 flex flex-col items-center justify-center">
      <div className="relative w-36 h-36">
        <Image
          src={user?.image}
          alt="profile"
          fill
          className="rounded-full w-full h-full"
        />
      </div>
      <h1 className="text-3xl font-bold mt-8 text-theme-400">
        {page?.displayName}
      </h1>

      <h2 className="text-muted-foreground text-lg flex items-center mt-1 gap-2">
        <PinIcon className="h-4 w-4" />
        {page?.location}
      </h2>
      <div className="max-w-sm mx-auto text-center my-2">
        <p>{page?.bio}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 mt-4">
        {Object.entries(page.buttons).map(([key, value]) => {
          const IconComponent = buttonsIcons[key as keyof typeof buttonsIcons];
          return (
            <Link
              key={key}
              className="px-4 py-2 bg-muted rounded-md hover:bg-muted/70"
              href={buttonLinks(key, page.buttons[key])}>
              <div className="flex items-center justify-center gap-2 ">
                {IconComponent && (
                  <IconComponent className="text-theme-400 w-5 h-5 mr-2" />
                )}
                <span>{value as ReactNode}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Links */}
      <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-6 mt-4">
        {page?.links.map((link: any) => (
          <Link
            href={link.linkUrl}
            target="_blank"
            key={link.id}
            className="bg-muted flex p-2 hover:-translate-y-1 transition-all duration-300 hover:bg-muted/70">
            <div className="relative flex items-center justify-center -left-4 w-16 h-16 aspect-square bg-theme-300 p-2">
              <LinkIcon className="text-theme-900 w-12 h-12" />
            </div>
            <div className="flex flex-col gap-2 grow">
              <h3 className="text-lg font-bold text-theme-400">
                {link.linkTitle}
              </h3>
              <p className="text-white/80">{link.linkSubtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UriPage;
