import express from "express";
import {
  changeLinkStatus,
  checkCustomUrlAvailaibility,
  createCustomShortLink,
  createShortLink,
  getLink,
  getLinksCreateByUser,
  incrementLinkVisit,
  
} from "../controllers/url";
import dotenv from "dotenv";
dotenv.config();

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

export default (router: express.Router) => {
  router.get("/getLink/:link", getLink);
  router.post("/incrementLinkVisit", incrementLinkVisit);
  router.post("/createShortLink", ClerkExpressRequireAuth(), createShortLink);
  router.post(
    "/createCustomShortLink",
    ClerkExpressRequireAuth(),
    createCustomShortLink
  );
  router.get(
    "/getLinksCreatedByUser/:email",
    ClerkExpressRequireAuth(),
    getLinksCreateByUser
  ); 
  router.post("/changeLinkStatus", ClerkExpressRequireAuth(), changeLinkStatus);

  router.get("/checkCustomUrlAvailaibility/:url",ClerkExpressRequireAuth(),checkCustomUrlAvailaibility)
};
