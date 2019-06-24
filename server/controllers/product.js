const Product = require("../models/product.js");
const { image } = require("../helpers/error.js");

class ProductController {
  static create(req, res, next) {
    let id = req.decoded.id;
    let newProduct = {
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      created_at: new Date(),
      UserId: id
    };
    Product.create(newProduct)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(next);
  }
  static read(req, res, next) {
    let myProduct = req.query.myProduct;
    let id = req.decoded.id;
    let userProduct = {
      UserId: id
    };
    if (!myProduct) delete userProduct.UserId;
    Product.find(userProduct)
      .populate("UserId")
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
  static delete(req, res, next) {
    let id = req.params.id;
    Product.deleteOne({
      _id: id
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
  static edit(req, res, next) {
    let id = req.params.id;
    let input = req.body;
    let update = {};
    for (let keys in input) {
      update[keys] = req.body[keys];
    }
    // if (req.file){
    //   update.image = req.file.cloudStoragePublicUrl
    // }
    Product.findByIdAndUpdate(id, { $set: update }, { new: true })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
}

module.exports = ProductController;
