const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { validate } = require("../middleware/common");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getDetailProduct);
router.post(
  "/",
  protect,
  upload.single("photo"),
  productController.createProduct
);
router.put(
  "/:id",
  protect,
  upload.single("photo"),
  productController.updateProduct
);
router.delete("/:id", protect, productController.deleteProduct);

module.exports = router;
