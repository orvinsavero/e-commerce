const routes = require("express").Router()
const { Authentication } = require("../middlewares/auth.js")
const User = require("./user.js")
const Product = require("./product.js")

routes.use("/", User)
routes.use(Authentication)
routes.use("/product", Product)

module.exports = routes