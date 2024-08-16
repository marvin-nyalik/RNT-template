import { Router } from "express";
import localAuth from '../strategies/localStrategy.mjs';
import googleAuth from '../strategies/googleStrategy.mjs';
import passport from "passport";

const router = Router();

export default router;
