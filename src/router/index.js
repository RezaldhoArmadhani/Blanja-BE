const express = require('express')
const router = express.Router()
const ProductRouter = require('../router/product.route')
const CategoryRouter = require('../router/category.route')
const SellerRouter = require('../router/seller.route')
const CustomerRouter = require('../router/customer.route')
const UserrRouter = require('../router/userr.route')

router.use('/product', ProductRouter)
router.use('/category', CategoryRouter)
router.use('/seller', SellerRouter)
router.use('/customer', CustomerRouter)
router.use('/auth', UserrRouter)

module.exports = router