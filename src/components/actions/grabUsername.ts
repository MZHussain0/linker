"use server";

import { Page } from "@/models/page";
import mongoose from "mongoose";

type Props = {
  desiredUsername: string;
};
export default async function grabUsername({ desiredUsername }: Props) {
  mongoose.connect(process.env.MONGODB_URI as string);
  const pageDoc = await Page.create({ uri: desiredUsername });
  return JSON.parse(JSON.stringify(pageDoc));
}
