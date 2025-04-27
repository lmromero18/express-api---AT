import express from "express";
import routeHandler from "../middleware/route.middleware";
import { userController } from "../controllers/user.controller";
import { jwtMiddleware } from "../middleware/jwt.middleware";

const router = express.Router();

router.route("/")
    .post(routeHandler(userController.create))
    .get(jwtMiddleware, routeHandler(userController.get))

router.route("/change-password/:username")
    .post(jwtMiddleware, routeHandler(userController.changePassword))

router.route("/:username")
    .get(jwtMiddleware, routeHandler(userController.getByUsername))
    .put(jwtMiddleware, routeHandler(userController.update))
    .delete(jwtMiddleware, routeHandler(userController.delete));

export default router;
