"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function savePageSettings(
  displayName: string,
  bio: string,
  location: string,
  src: string
) {
  mongoose.connect(process.env.MONGODB_URI as string);
  const session = await getServerSession(authOptions);
  if (session) {
    await Page.updateOne(
      { owner: session?.user?.email },
      { displayName, bio, location, src }
    );
    return true;
  }
  return false;
}
