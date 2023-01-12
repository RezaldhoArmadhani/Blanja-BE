const express = require('express');
const router  = express.Router();
const productController = require('../controllers/product.controller');
const {validate} = require('../middleware/common')

router.get("/", productController.getAllProduct );
router.get("/:id", productController.getDetailProduct);
router.post("/", validate, productController.createProduct);
router.put("/:id", validate, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;