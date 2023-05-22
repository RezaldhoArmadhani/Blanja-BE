const express = require('express');
const router  = express.Router();
const sellerController = require('../controllers/seller.controller');


router.get("/", sellerController.getAllSeller);
router.get("/:id", sellerController.getDetailSeller);
router.post("/", sellerController.createSeller);
router.put("/:id", sellerController.updateSeller);
router.delete("/:id", sellerController.deleteSeller);
router.post("/auth/login", sellerController.login);

module.exports = router;