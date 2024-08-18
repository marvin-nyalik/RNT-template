import express from "express";
import connectDb from "./config/db.mjs";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import baseRouter from "./routes/index.mjs";
import passport from "passport";
import { configurePassport } from "../src/strategies/googleStrategy.mjs";

dotenv.config();
configurePassport();
const createApp = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(morgan("combined"));
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "ubungen",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions",
        autoRemove: "native",
        autoRemoveInterval: 30,
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/auth/google", passport.authenticate("google"), (req, res) => {
    res.status(200).json({ message: "Authenticated", user: req.user });
  });

  app.use("/api", baseRouter);

  await connectDb();

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
  return app;
};

export default createApp;
