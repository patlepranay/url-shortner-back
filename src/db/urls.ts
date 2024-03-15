import mongoose, { Mongoose, Schema } from "mongoose";

const URLSchema = new mongoose.Schema({
  shortUrl: { type: String, required: true },
  originalUrl: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  createdDate: { type: Date, required: true },
});

export const UrlModel = mongoose.model("URL", URLSchema);

export const getLinkFromDB = (link: string) => {
  return UrlModel.find({ shortUrl: link });
};

export const createLink = (
  shortUrl: string,
  longUrl: string,
  userId: string
) => {
  return UrlModel.create({ shortUrl, originalUrl: longUrl, creator: userId,createdDate:Date.now() });
};
