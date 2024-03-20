import express, { NextFunction } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import "dotenv/config";
import { StrictAuthProp } from "@clerk/clerk-sdk-node";

const PORT = 5000 || process.env.PORT;
const app = express();

app.use(
  cors({
    origin: ["https://url-short-app.vercel.app/", "http://localhost:5173"],
  })
);

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}
app.use(compression());
app.use(bodyParser.json());
app.use("/api", router());
const MONGO_URL = process.env.MONGODB_URL!;

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    console.error(err.stack);
    res.status(401).send("Unauthenticated!");
  }
);

app.listen(PORT, () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Mongo DB Connected");
      console.log("Server running on port " + PORT);
    })
    .catch((err) => console.log(err));
});
