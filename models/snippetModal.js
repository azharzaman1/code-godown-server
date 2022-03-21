import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    snippetName: { type: String, required: true },
    desc: { type: String, default: "" },
    noOfFiles: Number,
    files: [
      {
        content: { type: String, default: "// enter code here" },
        createdAt: { type: Date, default: new Date() },
        fileName: { type: String, required: true },
        key: { type: Number, required: true },
        addressString: { type: String },
        id: mongoose.ObjectId,
      },
    ],
    ownerInfo: {
      email: { type: String, required: true },
      userID: { type: String, required: true },
    },
    comments: [{ body: String, date: Date }],
    forks: Array,
    snapshots: [
      { date: { type: Date, default: new Date() }, snapshot: Object },
    ],
    likes: [
      {
        email: String,
        userID: String,
      },
    ],
    owners: [
      {
        email: String,
        userID: String,
      },
    ],
    tags: [{ label: String, value: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Snippet", snippetSchema);
