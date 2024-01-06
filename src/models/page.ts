import { Schema, model, models } from "mongoose";

const PageSchema = new Schema(
  {
    uri: {
      type: String,
      required: true,
      min: 5,
      unique: true,
    },
    owner: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);

export const Page = models?.Page || model("Page", PageSchema);
