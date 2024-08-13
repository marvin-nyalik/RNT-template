import express from "express";
import connectDb from "./config/db.mjs";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const createApp = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.json());
  app.use(morgan("combined"));

  await connectDb();

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
  return app;
};

export default createApp;
