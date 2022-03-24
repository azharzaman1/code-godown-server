import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    snippetName: { type: String, required: true },
    description: { type: String, default: "" },
    snippetInfo: {
      isPrivate: { type: Boolean, default: true },
    },
    files: [
      {
        id: mongoose.ObjectId,
        key: { type: Number, required: true },
        fileName: { type: String, required: true },
        snippetName: { type: String, required: true },
        code: { type: String, required: true },

        extention: String,
        language: Object,

        createdAt: { type: Date, default: new Date() },
        addressString: { type: String },
        content: { type: String }, // optional incase non-code file
      },
    ],
    owner: {
      fullName: { type: String },
      email: { type: String },
      userID: { type: String, required: true },
    },

    tags: [{ name: String, slug: String, key: Number }],
    labels: [{ name: String, slug: String, _id: String }],

    comments: [{ body: String, date: Date }],
    forks: [Object],
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
  },
  { timestamps: true }
);

export default mongoose.model("Snippet", snippetSchema);
