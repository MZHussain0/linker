import { Event } from "@/models/Event";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    if (req.url) {
      const url = new URL(req.url);
      const page = url.searchParams.get("page");
      const clickedLink = atob(url.searchParams.get("url") || "");
      await Event.create({ type: "click", page: page, uri: clickedLink });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging click:", error);
    return NextResponse.json({ success: false });
  }
}
