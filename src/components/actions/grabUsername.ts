"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

type Props = {
  desiredUsername: string;
};
export default async function grabUsername({ desiredUsername }: Props) {
  mongoose.connect(process.env.MONGODB_URI as string);
  const existingPageDoc = await Page.findOne({ uri: desiredUsername });

  if (existingPageDoc) {
    return false;
  } else {
    const session = await getServerSession(authOptions);
    return await Page.create({
      uri: desiredUsername,
      owner: session?.user?.email,
    });
  }
}
