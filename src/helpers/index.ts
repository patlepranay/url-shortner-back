import { createHash } from "crypto";
import { Url, getAllLinkToDeactivate, updateLink, updateLinks } from "../db/urls";

export const shortenURL = (url: string) => {
  // Append a timestamp to the input URL
  const timestamp = new Date().getTime().toString();
  const uniqueInput = url + timestamp;

  // Create a SHA-256 hash of the unique input
  const hash = createHash("sha256").update(uniqueInput).digest("hex");

  // Use the first 8 characters of the hash as the short code
  return hash.substring(0, 8);
};

export const deActivateStaleLinks = async () => {
  const links = await getAllLinkToDeactivate();
  const res = links.map((link) => {
    link.isActive = false;
    return link;
  });
  updateLinks(res);
};
