import express from "express";
import { createUrl, getUrl } from "../db/urls";
import { shortenURL } from "../helpers";

export const getLongUrl = async (
  req: express.Request,
  res: express.Response
) => {
  const { url } = req.params;

  const urlDetails = await getUrl(url);

  if (urlDetails) {
    res.status(200).send({ message: "Succesfully fetched URL", urlDetails });
  } else {
    res.status(400).send({ message: `Couldn't find the requested URL` });
  }
};

export const createShortUrl = async (
  req: express.Request,
  res: express.Response
) => {
  const { url } = req.body;
  let existingUrl;
  let shortUrl: string;
  do {
    shortUrl = shortenURL(url);
    existingUrl = await getUrl(shortUrl);
  } while (existingUrl.length > 0);

  const urlDetails = await createUrl(shortUrl, url, "65eb399134a2614d1902d4fd");

  if (urlDetails) {
    urlDetails.shortUrl = `${process.env.DOMAIN_NAME}/${urlDetails.shortUrl}`;
    res
      .status(200)
      .send({ message: "Succesfully fetched URL", urlDetails, shortUrl });
  } else {
    res.status(400).send({ message: `Couldn't find the requested URL` });
  }
};

export const createCustomShortUrl = async (
  req: express.Request,
  res: express.Response
) => {
  const { customUrl, url } = req.body;

  //check if custom url exists in DB
  const ifExists = await getUrl(customUrl);

  //return res for failuer
  if (ifExists.length > 0) {
    res
      .status(200)
      .send({ message: "Cannot create custom URL. URL already exists" });
  }
  //return res for success
  else {
    const urlDetails = await createUrl(
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
