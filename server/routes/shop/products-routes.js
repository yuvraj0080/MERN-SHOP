const express = require("express");
const { getFilteredProducts
} = require("../../constrollers/shop/products-controller");


const router = express.Router();


router.get('/get',getFilteredProducts)


module.exports = router;