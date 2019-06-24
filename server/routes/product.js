const routes = require("express").Router()
const ProductController = require("../controllers/product.js")
const { Authorization } = require("../middlewares/auth.js")
// const image = require('../helpers/imageUpload')

routes.post("/", ProductController.create)
// routes.post("/", image.multer.single('image'), image.sendUploadToGCS, TagDetection, ArticleController.create)
routes.get("/", ProductController.read)
routes.delete("/:id", Authorization, ProductController.delete)
routes.patch("/:id", Authorization, ProductController.edit)
// routes.patch("/:id", Authorization, image.multer.single('image'), image.sendUploadToGCS, TagDetection, ArticleController.edit)


module.exports = routes
