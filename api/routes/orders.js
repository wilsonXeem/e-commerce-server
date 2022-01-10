const express = require("express");
const router = express.Router();
const ordersHandler = require("../controllers/orders");

router.get("/", ordersHandler.getAllOrders);

router.post("/order", ordersHandler.createOneOrder);

router.get("/:orderId", ordersHandler.getOneOrder);

router.patch("/:orderId", ordersHandler.updateOneOrder);

router.delete("/:orderId", ordersHandler.deleteOneOrder);

module.exports = router;
