const express = require("express");
const {
  createOrder,
  capturePayment,getAllOrdersByUser,getOrderDetails
} = require("../../constrollers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:Id", getOrderDetails);

module.exports = router;
