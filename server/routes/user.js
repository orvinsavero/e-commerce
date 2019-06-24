const routes = require("express").Router()
const UserController = require("../controllers/user.js")
const { Authentication } = require("../middlewares/auth.js")

routes.post("/register", UserController.register)
routes.post("/login", UserController.login)
routes.use(Authentication)
routes.patch("/topup", UserController.topup)
routes.patch("/cart/:id", UserController.addProduct)
routes.get("/cart", UserController.readProduct)
routes.patch("/cart", UserController.clearProduct)
routes.patch("/cart/remove/:id", UserController.removeProduct)


module.exports = routes