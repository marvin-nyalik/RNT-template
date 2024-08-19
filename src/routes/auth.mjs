import { Router } from "express";
import { initializePassport } from "../strategies/localStrategy.mjs";
import { configurePassport } from "../strategies/googleStrategy.mjs";
import passport from "passport";
import logoutMiddleware from "../middlewares/logout.mjs";

const router = Router();
configurePassport();
initializePassport();

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ msg: "Authentication failed", info });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ msg: "Authenticated", user });
    });
  })(req, res, next);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.post("/logout", logoutMiddleware);

export default router;
