const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    quantity: {
        type: Number,
        validate: {
        validator: function(input) {
            console.log(input)
            if (input > 0) return true
            else return false
        },
        message: props => `Sold out!`
        }
    },
    price: Number,
    description: String,
    created_at: Date,
    image: String,
    category: String,
    UserId: { type: Schema.Types.ObjectId, ref: 'User'}
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;