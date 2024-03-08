import express from "express";
import url from "./url";
const router = express.Router();

export default (): express.Router => {
  url(router);
  return router;
};
