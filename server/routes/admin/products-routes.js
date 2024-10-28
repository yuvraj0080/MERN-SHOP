const express = require("express");
const {
  handleImageUpload, 
  addProducts,
  deleteProducts,
  editProducts,
  fetchProducts,
} = require("../../constrollers/admin/products-controller");
const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post('/add',addProducts)
router.put('/edit/:id',editProducts)
router.delete('/delete/:id',deleteProducts)
router.get('/get',fetchProducts)


module.exports = router;