import express from "express";
import { login, logout, me, register } from "../controllers/user.controller";
import loginRequired from "../middleware/loginRequired";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", loginRequired, me);
router.post("/logout", loginRequired, logout);

export default router;
