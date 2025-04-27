import express from "express";
import routeHandler from "../middleware/route.middleware";
import { authController } from "../controllers/auth.controller";

const router = express.Router();

router.route("/login")
  .post(routeHandler(authController.login))

export default router;
