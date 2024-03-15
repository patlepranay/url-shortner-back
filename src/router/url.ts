import express from "express";
import {
  createCustomShortLink,
  createShortLink,
  getLink,
} from "../controllers/url";
import dotenv from 'dotenv';
dotenv.config();

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

export default (router: express.Router) => {
  router.get("/getLink/:link",  getLink);
  router.post("/createShortLink", ClerkExpressRequireAuth(),createShortLink);
  router.post("/createCustomShortLink", ClerkExpressRequireAuth(),createCustomShortLink);
};
