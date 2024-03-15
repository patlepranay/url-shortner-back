import express from "express";
import url from "./url";
import clerkWebHook from "./clerkWebHook";
const router = express.Router();

export default (): express.Router => {
  url(router);
  clerkWebHook(router);
  return router;
};
