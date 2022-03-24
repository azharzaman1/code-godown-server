import mongoose from "mongoose";

const labelsScheme = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Label", labelsScheme);
