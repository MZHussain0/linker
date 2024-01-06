"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function savePageSettings(
  displayName: string,
  bio: string,
  location: string,
  image: string
) {
  mongoose.connect(process.env.MONGODB_URI as string);
  const session = await getServerSession(authOptions);
  if (session) {
    await Page.updateOne(
      { owner: session?.user?.email },
      { displayName, bio, location }
    );

    if (image) {
      await User.updateOne(
        {
          email: session?.user?.email,
        },
        { image: image }
      );
    }
    return true;
  }
  return false;
}

export async function savePageButtons(formData: any) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const session = await getServerSession(authOptions);

  if (session) {
    await Page.updateOne(
      { owner: session?.user?.email },
      { buttons: formData }
    );
  }
}
