import mongoose, { Mongoose, ObjectId, Schema } from "mongoose";
import { UserModel } from "./users";

const URLSchema = new mongoose.Schema({
  shortUrl: { type: String, required: true },
  originalUrl: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  createdDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true },
  isInstantLink: { type: Boolean, require: true },
  visits: {
    type: Number,
    default: 0,
  },
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
  return UrlModel.create({
    shortUrl,
    originalUrl: longUrl,
    creator: userId,
    createdDate: Date.now(),
    isActive: true,
  });
};

export const getLinksCreateByUser = async (email: string) => {
  let user = await UserModel.findOne({ email });
  return UrlModel.find({ creator: user._id });
};

export const getLongLink = (link: string, userId: string) => {
  return UrlModel.findOne({ originalUrl: link, creator: userId });
};

export const incrementLinkVisit = async (shortLink: string) => {
  return UrlModel.findOneAndUpdate(
    { shortUrl: shortLink },
    { $inc: { visits: 1 } }, // Increment visits by 1
    { new: true } // Return updated document
  );
};
