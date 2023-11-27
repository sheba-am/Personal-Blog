import express  from "express";
import { register, login, logout, forgotPassword, resetPassword } from "../controllers/auth.js";

const router =express.Router()

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:id/:token", resetPassword);
//router.get("/reset-password/:id", resetPassword);

export default router