const express = require("express");
const {
  getAllOrders,getOrderDetailsAdmin,updateOrderStatus
} = require("../../constrollers/admin/order-controller");

const router = express.Router();


router.get("/get", getAllOrders);
router.get("/details/:id", getOrderDetailsAdmin);
router.put("/update/:id", updateOrderStatus);


module.exports = router;
