const jwt = require('../helpers/jwt.js')
const User = require('../models/user.js')
const Product = require("../models/product.js")
const { invalid, notAuth, forbidden } = require('../helpers/error.js');

module.exports = {
  Authentication: function (req, res, next){
    let token = req.headers.token
    let decoded = null
    try {
        decoded = jwt.verify(token)
    } catch (err) {
        throw {
            code: 401,
            message: notAuth
        }
    } 
    User.findOne({
        email: decoded.email
    })
    .then((user) => {
        if (user){
            req.decoded = decoded
            next()
        } else {
            throw {
                code: 401,
                message: invalid
            }
        }
    })
    .catch(next) 
},
  Authorization: function (req, res, next){
    let id = req.params.id
    Product.findById(id)
    .then((result) => {
        if (result.UserId.toString() == req.decoded.id){
            next()
        } else {
            throw {
                code: 401,
                message: forbidden
            }
        }
    })
    .catch(next)
  }
}