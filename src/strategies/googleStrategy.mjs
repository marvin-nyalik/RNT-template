import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/user.mjs";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) return done(new Error("User not found"), null);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const googleAuth = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (request, token, tokenSecret, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default googleAuth;
