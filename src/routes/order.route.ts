import express from "express";
import routeHandler from "../middleware/route.middleware";
import { orderController } from "../controllers/order.controller";
import { jwtMiddleware } from "../middleware/jwt.middleware";

const router = express.Router();

router.use(jwtMiddleware);

router.route("/")
  .get(routeHandler(orderController.get))
  .post(routeHandler(orderController.create));

router.route("/:id")
  .get(routeHandler(orderController.getById))
  .put(routeHandler(orderController.update))

router.route("/status/:id")
  .put(routeHandler(orderController.updateStatus));

router.route("/search/:userId")
  .get(routeHandler(orderController.getOrdersByUserId));

export default router;
