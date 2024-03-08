import mongoose, { Mongoose, Schema } from "mongoose";

const URLSchema = new mongoose.Schema({
  shortUrl: { type: String, required: true },
  originalUrl: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

export const UrlModel = mongoose.model("URL", URLSchema);

export const getUrl = (shortUrl: string) => {
  return UrlModel.find({ shortUrl: shortUrl });
};

export const createUrl = (
  shortUrl: string,
  longUrl: string,
  userId: string
) => {
 return UrlModel.create({ shortUrl, originalUrl: longUrl, creator: userId });
};
