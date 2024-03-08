import express from "express";

import bodyParser from "body-parser";

import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import "dotenv/config";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());

app.use("/api", router());
const MONGO_URL = process.env.MONGODB_URL!;

app.listen(8080, () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Mongo DB Connected");
      console.log("Server running on port http://localhost:8080");
    })
    .catch((err) => console.log(err));
});
