import { Router } from "express";
import "../strategies/localStrategy.mjs";
import "../strategies/googleStrategy.mjs";
import passport from "passport";

const router = Router();

router.post("/local/auth", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ msg: "Authenticated", user: req.user });
});

router.get(
  "/google/auth",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
  (req, res) => {
    res.status(200).json({ msg: "Authenticated" });
  }
);

router.get("/auth/google", passport.authenticate("google"), (req, res) => {
  res.status(200).json({ msg: "Authenticated", user: req.user });
});

export default router;
