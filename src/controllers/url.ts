import express from "express";
import {
  createLink,
  getLinkFromDB,
  getLinksCreateByUser as db_getLinksCreateByUser,
  getLongLink as db_getLongLink,
  incrementLinkVisit as db_incrementLinkVisit,
  updateLink as db_updateLink,
} from "../db/urls";
import { shortenURL } from "../helpers";
import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { getUsersByClerkId, getUsersByEmail } from "../db/users";
import { isValidObjectId } from "mongoose";

export const getLink = async (
  req: RequireAuthProp<express.Request>,
  res: express.Response
) => {
  const { link } = req.params;
  const urlDetails = await getLinkFromDB(link);

  if (urlDetails.length > 0) {
    return res
      .status(201)
      .send({ message: "Succesfully fetched URL", urlDetails });
  } else {
    return res.status(400).send({ message: `Couldn't find the requested URL` });
  }
};

export const createShortLink = async (
  req: express.Request,
  res: express.Response
) => {
  const { url, customShortUrl } = req.body;
  const { userId } = req.auth;
  const user = await getUsersByClerkId(userId);
  if (!user) {
    return res.status(401).send({ message: "Cannot verify user" });
  }

  let existingUrl;
  let shortUrl: string;
  const existingLink = await db_getLongLink(url, user._id.toString());
  if (existingLink) {
    return res
      .status(409)
      .send({ message: "Already short URL exists for given url" });
  }
  if (!customShortUrl) shortUrl = shortenURL(url);
  else shortUrl = customShortUrl;
  const urlDetails = await createLink(shortUrl, url, user._id.toString());

  if (urlDetails) {
    shortUrl = `${process.env.DOMAIN_NAME}/${urlDetails.shortUrl}`;
    return res
      .status(201)
      .send({ message: "Succesfully fetched URL", urlDetails, shortUrl });
  } else {
    return res.status(400).send({ message: `Couldn't find the requested URL` });
  }
};

export const createCustomShortLink = async (
  req: express.Request,
  res: express.Response
) => {
  const { customUrl, url } = req.body;
  const { userId } = req.auth;
  const user = await getUsersByClerkId(userId);
  if (!user) {
    return res.status(401).send({ message: "Cannot verify user" });
  }
  //check if custom url exists in DB
  const ifExists = await getLinkFromDB(customUrl);

  //return res for failuer
  if (ifExists.length > 0) {
    res
      .status(200)
      .send({ message: "Cannot create custom URL. URL already exists" });
  }
  //return res for success
  else {
    const urlDetails = await createLink(
      customUrl,
      url,
      "65eb399134a2614d1902d4fd"
    );
    if (urlDetails) {
      urlDetails.shortUrl = `${process.env.DOMAIN_NAME}/${urlDetails.shortUrl}`;
      res
        .status(200)
        .send({ message: "Succesfully fetched URL", urlDetails, customUrl });
    }
  }
};

export const getLinksCreateByUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.params;

    const links = await db_getLinksCreateByUser(email);

    res.status(201).json({ message: "Links fetched Successfully", links });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

export const incrementLinkVisit = async (
  req: express.Request,
  res: express.Response
) => {
  const { url } = req.body;
  await db_incrementLinkVisit(url);
};

export const changeLinkStatus = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { link } = req.body;
    const { userId } = req.auth;

    const user = await getUsersByClerkId(userId);
    if (!user || !isValidObjectId(link._id)) {
      return res.status(500).json({ message: "Request Error" });
    }

    if (user._id != link.creator) {
      return res.status(403).json({ message: "Action not allowed" });
    }
    link.updatedDate = new Date();
    const updatedLink = await db_updateLink(link);
    return res.status(201).send({ message: "Link Updated", updatedLink });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to update link." });
  }
};

export const checkCustomUrlAvailaibility = async (
  req: express.Request,
  res: express.Response
) => {
  const { url } = req.params;

  const existingUrl = await getLinkFromDB(url);

  res.status(200).send({
    message:
      existingUrl.length > 0
        ? "Custom Link already exists"
        : "Go ahead. Link available",
  });
};
