const User = require("../models/user.js")
const register = require('../helpers/bcrypt.js')
const jwt  = require('../helpers/jwt.js')
const { login, product } = require('../helpers/error.js');

class UserController{
    static register(req,res,next){
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cart: [],
            money: 0
        }
        User.create(newUser)
        .then((result) => {
            res.status(201).json(result)
        })
        .catch(next)
    }
    static login(req,res,next){
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            email: email
        })
        .then((result) => {
            if (result){
                let check = register.checkPassword(password, result.password)
                if (check == true){
                    let userSign = {
                        id: result._id,
                        name: result.name,
                        email: result.email
                    }
                    let temp = jwt.sign(userSign)
                    let token = {
                        token: temp
                    }
                    res.status(200).json(token)
                } else {
                    throw {
                        code: 404, 
                        message: login
                    }
                }
            } else {
                throw {
                    code: 404, 
                    message: login
                }
            }
        })
        .catch(next)
    }
    static addProduct(req,res,next){
        let id = req.decoded.id
        let productId = req.params.id
        User.findOneAndUpdate(
            {_id: id},
            {$push: 
                {cart: productId}
            },
                {new: true}
            )
        .populate('cart')
        .then((result) => {
            if(result.cart[result.cart.length-1]._id.toString() == productId){
                res.status(200).json(result)
            } else {
                throw {
                    code: 404,
                    message: product
                }
            }
        })
        .catch(next)
    }
    static topup(req,res,next){
        let id = req.decoded.id
        let money = req.body.money
        User.findByIdAndUpdate(id, { $inc: {money: money} }, { new: true })
        .then(result => {
          res.status(200).json(result);
        })
        .catch(next);
    }
    static removeProduct(req,res,next){
        let id = req.decoded.id
        let productId = req.params.id
        User.findOneAndUpdate(
            {_id: id},
            {$pull: 
                {cart: productId}
            },
                {new: true}
            )
        .populate('cart')
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(next)
    }
    static readProduct(req,res,next){
        let id = req.decoded.id
        User.findOne({
            _id: id
        })
        .populate('cart')
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(next)
    }
    static clearProduct(req,res,next){
        let id = req.decoded.id
        User.findByIdAndUpdate(id, { $set: {cart: []} }, { new: true })
        .then(result => {
          res.status(200).json(result);
        })
        .catch(next);
    }
}

module.exports = UserController