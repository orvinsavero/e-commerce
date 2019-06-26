const routes = require("express").Router()
const ProductController = require("../controllers/product.js")
const { Authorization } = require("../middlewares/auth.js")
const image = require('../helpers/upload.js')

routes.post("/", image.multer.single('image'), image.sendUploadToGCS, ProductController.create)
// routes.post("/", image.multer.single('image'), image.sendUploadToGCS, TagDetection, ArticleController.create)
routes.get("/", ProductController.read)
routes.delete("/:id", Authorization, ProductController.delete)
routes.patch("/:id", image.multer.single('image'), image.sendUploadToGCS, Authorization, ProductController.edit)
// routes.patch("/:id", Authorization, image.multer.single('image'), image.sendUploadToGCS, TagDetection, ArticleController.edit)


module.exports = routes
