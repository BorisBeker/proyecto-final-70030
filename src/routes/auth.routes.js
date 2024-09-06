import { Router } from "express";
import authController from "../controller/auth.controller.js";
import passport from "passport";
import { authDto } from "../dto/auth.dto.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/login", passport.authenticate("login", { session: false, failureRedirect: "/api/auth/login-error" }), authController.login);
router.get("/login-error", authController.loginError);

router.post("/register", validate(authDto), authController.register);
router.get("/current", passport.authenticate("jwt", { session: false }), authController.current);
router.get("/logout", authController.logout);

export default router;